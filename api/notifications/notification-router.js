const express = require('express');

const Notification = require('./notification-model.js');

const router = express.Router();

const AuthMiddleware = require('../middleware/auth-middleware.js');

// GET ALL NOTIFICATIONS
router.get('/', AuthMiddleware.restricted, async (req, res) => {
  Notification.find()
    .then(notifications => {
      res.status(200).json({
        notifications: notifications,
        decodedToken: req.decodedToken,
      });
    })
    .catch(error => res.status(500).json({ error: error }));
});

// ADD A NEW NOTIFICATION
router.post('/', AuthMiddleware.restricted, (req, res) => {
  let { bill_id, email } = req.body;

  if (
    bill_id &&
    email &&
    Object.keys(req.body).length == 2 &&
    Array.isArray(email)
  ) {
    console.log('SUCCESS');
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
          res
            .status(500)
            .json(
              'There was an error during the creation of a new notification. ' +
                error,
            );
        });
    });
    res
      .status(201)
      .json({ message: 'The notifications have been successfully persisted.' });
  } else {
    res
      .status(400)
      .json('Not all information were provided to create a new notification.');
  }
});

module.exports = router;
