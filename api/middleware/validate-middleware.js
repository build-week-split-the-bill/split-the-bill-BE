const Users = require('../users/user-model.js');
const Bills = require('../bills/bill-model.js');
const Notifications = require('../notifications/notification-model.js');

module.exports = {
  validateUserId,
  validateUser,
  validateBill,
  validateBillId,
  validateNotification,
  validateNotificationId,
};

function validateUser(req, res, next) {
  const {
    body,
    body: { email, firstname, lastname },
  } = req;

  if (!body) {
    res.status(400).json({ warning: 'Missing user data entirely.' });
  } else if (!email || !firstname || !lastname) {
    res.status(400).json({
      warning:
        'Missing required email or firstname or lastname information for an user.',
    });
  } else {
    next();
  }
}

async function validateUserId(req, res, next) {
  try {
    const {
      params: { id },
    } = req;

    const user = await Users.findById(id);
    user
      ? ((req.user = user), next())
      : res.status(404).json({
          info: `The user with the id ${id} was not found during validation.`,
        });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred during validation of the user.' });
  }
}

function validateBill(req, res, next) {
  const {
    body,
    body: { split_sum, split_people_count, user_id },
  } = req;

  if (!body) {
    res.status(400).json({ warning: 'Missing bill data entirely.' });
  } else if (!split_sum || !split_people_count || !user_id) {
    res.status(400).json({
      warning:
        'Missing required split_sum or split_people_count or user_id information for a bill.',
    });
  } else {
    next();
  }
}

async function validateBillId(req, res, next) {
  try {
    const {
      params: { id },
    } = req;

    const bill = await Bills.findById(id);
    bill
      ? ((req.bill = bill), next())
      : res.status(404).json({
          info: `The bill with the id ${id} was not found during validation.`,
        });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred during validating of a bill.' });
  }
}

function validateNotification(req, res, next) {
  const {
    body,
    body: { email, bill_id },
  } = req;

  if (!body) {
    res.status(400).json({ warning: 'Missing notification data entirely.' });
  } else if (!split_sum || !email || !bill_id) {
    res.status(400).json({
      warning:
        'Missing required email or bill_id information for a notification.',
    });
  } else {
    next();
  }
}

async function validateNotificationId(req, res, next) {
  try {
    const {
      params: { id },
    } = req;

    const notification = await Notifications.findById(id);

    bill
      ? ((req.notification = notification), next())
      : res.status(404).json({
          info: `The notification with the id ${id} was not found during validation.`,
        });
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred during validation of a notification.',
    });
  }
}
