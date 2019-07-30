const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../../data/secrets/secret.js');

const Users = require('./user-model.js');

const router = express.Router();

const AuthMiddleware = require('../middleware/auth-middleware.js');

// GET ALL USERS
router.get('/', AuthMiddleware.restricted, async (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json({
        users: usersWithoutPassword(users),
        decodedToken: req.decodedToken,
      });
    })
    .catch(error => res.status(500).json({ error: error }));
});

function usersWithoutPassword(users) {
  return users.map(user => ({
    id: user.id,
    username: user.username,
    department: user.department,
  }));
}

// ADD A NEW USER
router.post('/register', (req, res) => {
  let { email, password, firstname, lastname } = req.body;

  if (email && password && firstname && lastname) {
    const hash = bcrypt.hashSync(password, 12);
    password = hash;

    Users.add({ email, password, firstname, lastname })
      .then(newUser => {
        res.status(201).json({
          id: newUser.id,
          email: newUser.email,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
        });
      })
      .catch(error => {
        res
          .status(500)
          .json(
            'There was an error during the creation of a new user. ' + error,
          );
      });
  } else {
    res
      .status(400)
      .json('Not all information were provided to create a new user.');
  }
});

// LOGIN
router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateJWT(user);
        res.status(200).json({
          message: `Welcome ${user.username}`,
          token: token,
        });
      } else {
        res.status(401).json({ message: 'Invalid credentials submitted.' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateJWT(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

// LOGOUT
router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      error
        ? res.json({
            message: 'There was an error during the logout.',
          })
        : res.status(200).json({ message: 'Logout was successful!' });
    });
  } else {
    res
      .status(200)
      .json({ message: 'Login did not happen. So logout is not necessary.' });
  }
});

module.exports = router;
