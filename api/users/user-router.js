const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../../data/secrets/secret.js');

const Users = require('./user-model.js');

const router = express.Router();

const AuthMiddleware = require('../middleware/auth-middleware.js');
const ValidateMiddleware = require('../middleware/validate-middleware.js');

// GET ALL USERS
router.get('/', AuthMiddleware.restricted, async (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json({
        users: usersWithoutPassword(users),
        /* decodedToken: req.decodedToken, */
      });
    })
    .catch(error =>
      res.status(500).json({
        error:
          'An error occurred during fetching all users. That one is on us!',
      }),
    );
});

// GET A USER BY ID
router.get(
  '/:id',
  AuthMiddleware.restricted,
  ValidateMiddleware.validateUserId,
  async (req, res) => {
    try {
      const {
        user: { id },
      } = req;

      const user = await Users.findById(id);

      res.status(200).json({
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      });
    } catch (error) {
      const {
        user: { id },
      } = req;

      res.status(500).json({
        error: `An error occurred during fetching an user with the id ${id}.`,
      });
    }
  },
);

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
        res.status(500).json({
          error: 'An error occurred during the creation of a new user.',
        });
      });
  } else {
    res.status(400).json({
      warning: 'Not all information were provided to create a new user.',
    });
  }
});

// LOGIN A USER
router.post('/login', (req, res) => {
  let { email, password } = req.body;

  Users.findByUserEmail(email)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateJWT(user);
        res.status(200).json({
          message: `The user ${user.email} successfully logged in!`,
          user: {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
          },
          token: token,
        });
      } else {
        res.status(401).json({
          warning: 'Invalid credentials submitted for the login of an user.',
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'An error occurred during logging in an user.' });
    });
});

/* // DELETE A USER
router.delete(
  '/:id',
  AuthMiddleware.restricted,
  ValidateMiddleware.validateUserId,
  async (req, res) => {
    try {
      const {
        user: { id },
      } = req;

      const deleteUser = await Users.remove(id);

      res.status(200).json({
        message: `The user with the id of ${id} was successfully deleted.`,
      });
    } catch (error) {
      const {
        user: { id },
      } = req;
      console.log(error);
      res.status(500).json({
        message: `The user with the id of ${id} could not be deleted.`,
      });
    }
  },
); */

// UPDATE A USER
router.put(
  '/:id',
  AuthMiddleware.restricted,
  ValidateMiddleware.validateUser,
  ValidateMiddleware.validateUserId,
  async (req, res) => {
    console.log('middleware: ', req.user);
    try {
      const {
        body: { email, password, firstname, lastname },
        user: { id },
      } = req;

      const successFlag = await Users.update(id, {
        email,
        firstname,
        lastname,
      });
      return successFlag > 0
        ? res.status(200).json({
            message: `The user with the id ${id} has been successfully updated!`,
          })
        : res.status(500).json({
            error: `An error occurred within the database thus the user with the id ${id} could not be updated.`,
          });
    } catch (error) {
      const {
        user: { id },
      } = req;

      res.status(500).json({
        error:
          `An error occurred during updating the user with the id ${id}.` +
          error,
      });
    }
  },
);

// GET ALL BILLS BY A USER ID
router.get(
  '/:id/bills',
  AuthMiddleware.restricted,
  ValidateMiddleware.validateUserId,
  async (req, res) => {
    const {
      user: { id },
    } = req;

    try {
      const userBills = await Users.findUserBills(id);
      if (userBills && userBills.length) {
        res.status(200).json(userBills);
      } else {
        res.status(404).json({
          info: `No bills are available for the user with the id ${id}.`,
        });
      }
    } catch (error) {
      const {
        user: { id },
      } = req;

      res.status(500).json({
        error: `An error occurred retrieving the bills for the user with the id ${id}.`,
      });
    }
  },
);

// UTILITY FUNCTIONS
function usersWithoutPassword(users) {
  return users.map(user => ({
    id: user.id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
  }));
}

function generateJWT(user) {
  const payload = {
    subject: user.id,
    email: user.email,
  };

  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
