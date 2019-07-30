const express = require('express');

const Notification = require('./notification-model.js');

const router = express.Router();

// GET ALL NOTIFICATIONS
router.get('/', async (req, res) => {
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
router.post('/', (req, res) => {
  let { bill_id, email } = req.body;

  if (bill_id && email && Object.keys(req.body).length == 2) {
    Notification.add({ bill_id, email })
      .then(newNotification => {
        res.status(201).json({
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
  } else {
    res
      .status(400)
      .json('Not all information were provided to create a new notification.');
  }
});

module.exports = router;
