const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../../data/secrets/secret.js');
const moment = require('moment');

const Bills = require('./bill-model.js');
const Notification = require('../notifications/notification-model.js');

const router = express.Router();

const AuthMiddleware = require('../middleware/auth-middleware.js');
const ValidateMiddleware = require('../middleware/validate-middleware.js');

// GET ALL BILLS
router.get('/', AuthMiddleware.restricted, async (req, res) => {
  Bills.find()
    .then(bills => {
      res.status(200).json({
        bills: bills,
        /* decodedToken: req.decodedToken, */
      });
    })
    .catch(error => res.status(500).json({ error: error }));
});

// GET A BILL BY ID
router.get(
  '/:id',
  AuthMiddleware.restricted,
  ValidateMiddleware.validateBillId,
  async (req, res) => {
    try {
      const {
        bill: { id },
      } = req;

      const bill = await Bills.findById(id);

      res.status(200).json(bill);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the bill.',
      });
    }
  },
);

// ADD A NEW BILL
router.post(
  '/',
  AuthMiddleware.restricted,
  ValidateMiddleware.validateBill,
  (req, res) => {
    let { split_sum, split_people_count, user_id } = req.body;

    if (split_sum && split_people_count && user_id) {
      Bills.add({
        split_sum,
        split_people_count,
        user_id,
        created_at: moment().format('MMMM Do YYYY, h:mm:ss a'),
      })
        .then(newBill => {
          res.status(201).json({
            id: newBill.id,
            user_id: newBill.user_id,
            split_sum: newBill.split_sum,
            split_people_count: newBill.split_people_count,
            created_at: newBill.created_at,
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
  },
);

// DELETE A BILL
router.delete(
  '/:id',
  AuthMiddleware.restricted,
  ValidateMiddleware.validateBillId,
  async (req, res) => {
    try {
      const {
        bill: { id },
      } = req;

      const deletedBill = await Bills.remove(id);

      res.status(200).json({
        message: `The bill with the id of ${id} was successfully deleted.`,
      });
    } catch (error) {
      const {
        bill: { id },
      } = req;
      console.log(error);
      res.status(500).json({
        message: `The bill with the id of ${id} could not be deleted.` + error,
      });
    }
  },
);

// UPDATE A BILL
router.put(
  '/:id',
  ValidateMiddleware.validateBill,
  ValidateMiddleware.validateBillId,
  async (req, res) => {
    console.log('middleware: ', req.bill);
    try {
      const {
        body: { user_id, split_sum, split_people_count },
        bill: { id },
      } = req;
      console.log('STARTED');
      const successFlag = await Bills.update(id, {
        user_id,
        split_sum,
        split_people_count,
      });
      console.log('STOPPED');
      return successFlag > 0
        ? res.status(200).json({
            message: `The bill with the id ${id} has been successfully updated!`,
          })
        : null;
    } catch (error) {
      res.status(500).json('weird');
    }
  },
);

// GET ALL NOTIFICATIONS BY A BILL ID
router.get(
  '/:id/notifications',
  AuthMiddleware.restricted,
  ValidateMiddleware.validateBillId,
  async (req, res) => {
    const {
      bill: { id },
    } = req;
    try {
      const userBills = await Bills.findBillNotificaitons(id);
      if (userBills && userBills.length) {
        res.status(200).json(userBills);
      } else {
        res.status(404).json({
          message: `No bills available for the user with the id ${id}.`,
        });
      }
    } catch (error) {
      const {
        bill: { id },
      } = req;
      console.log(error);
      res.status(500).json({
        error:
          `There was an error retrieving this bills for the user with the id ${id}.` +
          error,
      });
    }
  },
);

// DELETE ALL NOTIFICATIONS BY BILL IS
router.delete(
  '/:id/notifications',
  AuthMiddleware.restricted,
  ValidateMiddleware.validateBillId,
  async (req, res) => {
    try {
      const {
        bill: { id },
      } = req;
      const billNotifications = await Bills.findBillNotificaitons(id);

      if (billNotifications && billNotifications.length) {
        billNotifications.forEach(notification => {
          Notification.remove(notification.id)
            .then(newNotification =>
              console.log('deleted a notification success' + newNotification),
            )
            .catch(error => {
              res
                .status(500)
                .json(
                  'There was an error during the deletion of new notifications. ' +
                    error,
                );
            });
        });
        res.status(200).json({
          message: `The notifications for the bill with the id of ${id} were successfully deleted.`,
        });
      } else {
        res.status(202).json({
          message: `The bill of the id ${id} does not contain any notifications.`,
        });
      }
    } catch (error) {
      const {
        bill: { id },
      } = req;
      console.log(error);
      res.status(500).json({
        message: `The notifications of the bill with the id of ${id} could not be deleted.`,
      });
    }
  },
);

module.exports = router;
