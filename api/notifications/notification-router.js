const express = require('express');

const Notification = require('./notification-model.js');

const router = express.Router();

const AuthMiddleware = require('../middleware/auth-middleware.js');
const ValidateMiddleware = require('../middleware/validate-middleware.js');

// GET ALL NOTIFICATIONS
router.get('/', AuthMiddleware.restricted, async (req, res) => {
  Notification.find()
    .then(notifications => {
      res.status(200).json({
        notifications: notifications,
        /* decodedToken: req.decodedToken, */
      });
    })
    .catch(error =>
      res.status(500).json({
        error:
          'An error occurred during fetching all notifications. That one is on us!',
      }),
    );
});

// ADD A NEW NOTIFICATION ARRAY OF EMAILS
router.post(
  '/',
  AuthMiddleware.restricted,
  ValidateMiddleware.validateNotification,
  (req, res) => {
    let { bill_id, email } = req.body;

    if (
      bill_id &&
      email &&
      Object.keys(req.body).length == 2 &&
      Array.isArray(email)
    ) {
      let createdNotification = [];

      email.forEach(email => {
        Notification.add({ bill_id, email })
          .then(newNotification => {
            createdNotification.push({
              id: newNotification.id,
              bill_id: newNotification.bill_id,
              email: newNotification.email,
            });
          })
          .catch(error => {
            res.status(500).json({
              error: 'An error occurred during creating a new notification.',
            });
          });
      });
      res.status(201).json({
        message: 'The notification(s) have been successfully persisted.',
      });
    } else {
      res.status(400).json({
        warning:
          'Not all information were provided to create a new notification.',
      });
    }
  },
);

module.exports = router;
