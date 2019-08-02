const express = require('express');
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
    .catch(error =>
      res.status(500).json({
        error:
          'An error occurred during fetching all bills. That one is on us!',
      }),
    );
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
      const {
        bill: { id },
      } = req;

      res.status(500).json({
        error: `An error occurred during fetching a bill with the id ${id}.`,
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
          res.status(500).json({
            error: 'An error occurred during the creation of a new bill.',
          });
        });
    } else {
      res.status(400).json({
        warning: 'Not all information were provided to create a new bill.',
      });
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

      res.status(500).json({
        message: `An error occurred during deletion of a bill with the id ${id}.`,
      });
    }
  },
);

// UPDATE A BILL
router.put(
  '/:id',
  AuthMiddleware.restricted,
  ValidateMiddleware.validateBill,
  ValidateMiddleware.validateBillId,
  async (req, res) => {
    try {
      const {
        body: { user_id, split_sum, split_people_count },
        bill: { id },
      } = req;

      const successFlag = await Bills.update(id, {
        user_id,
        split_sum,
        split_people_count,
      });

      return successFlag > 0
        ? res.status(200).json({
            message: `The bill with the id ${id} has been successfully updated!`,
          })
        : res.status(500).json({
            error: `An error occurred within the database thus the bill with the id ${id} could not be updated.`,
          });
    } catch (error) {
      res.status(500).json({
        error: `An error occurred during updating the bill with the id ${id}.`,
      });
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
      const userBills = await Bills.findBillNotifications(id);
      if (userBills && userBills.length) {
        res.status(200).json(userBills);
      } else {
        res.status(404).json({
          info: `No bills available for the user with the id ${id}.`,
        });
      }
    } catch (error) {
      const {
        bill: { id },
      } = req;

      res.status(500).json({
        error: `An error occurred during retrieving the bills for the user with the id ${id}.`,
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

      const billNotifications = await Bills.findBillNotifications(id);

      if (billNotifications && billNotifications.length) {
        billNotifications.forEach(notification => {
          Notification.remove(notification.id)
            .then(newNotification =>
              console.log(
                'deleted a notification successfully ' + newNotification,
              ),
            )
            .catch(error => {
              res
                .status(500)
                .json(
                  'An error occurred during deleting some of the notifications for the bill.',
                );
            });
        });
        res.status(200).json({
          message: `The notification(s) for the bill with the id of ${id} were successfully deleted.`,
        });
      } else {
        res.status(404).json({
          info: `The bill of the id ${id} does not contain any notifications.`,
        });
      }
    } catch (error) {
      const {
        bill: { id },
      } = req;
      console.log(error);
      res.status(500).json({
        message: `An error occurred during the deletion for notifications for the bill with the id ${id}.`,
      });
    }
  },
);

module.exports = router;
