const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../../data/secrets/secret.js');

const Bills = require('./bill-model.js');

const router = express.Router();

const AuthMiddleware = require('../middleware/auth-middleware.js');

// GET ALL BILLS
router.get('/', AuthMiddleware.restricted, async (req, res) => {
  Bills.find()
    .then(bills => {
      res.status(200).json({
        bills: bills,
        decodedToken: req.decodedToken,
      });
    })
    .catch(error => res.status(500).json({ error: error }));
});

// ADD A NEW BILL
router.post('/', (req, res) => {
  let { user_id, email } = req.body;

  if (user_id && email) {
    Bills.add({ user_id, email })
      .then(newBill => {
        res.status(201).json({
          id: newBill.id,
          user_id: newBill.user_id,
          email: newBill.email,
        });
      })
      .catch(error => {
        res
          .status(500)
          .json(
            'There was an error during the creation of a new bill. ' + error,
          );
      });
  } else {
    res
      .status(400)
      .json('Not all information were provided to create a new bill.');
  }
});

module.exports = router;
