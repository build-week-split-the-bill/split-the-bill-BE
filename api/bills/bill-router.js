const express = require('express');

const Bills = require('./bill-model.js');

const router = express.Router();

// GET ALL USERS
router.get('/', async (req, res) => {
  Bills.find()
    .then(bills => {
      res.status(200).json({
        bills: bills,
        decodedToken: req.decodedToken,
      });
    })
    .catch(error => res.status(500).json({ error: error }));
});

module.exports = router;
