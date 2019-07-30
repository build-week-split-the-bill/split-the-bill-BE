const express = require('express');

const Notification = require('./notification-model.js');

const router = express.Router();

// GET ALL USERS
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

module.exports = router;
