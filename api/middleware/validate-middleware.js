const Users = require('../users/user-model.js');

module.exports = {
  validateUserId,
  validateUser,
};

function validateUser(req, res, next) {
  const {
    body,
    body: { email, firstname, lastname },
  } = req;
  if (!body) {
    res.status(400).json({ message: 'Missing user data' });
  } else if (!email || !firstname || !lastname) {
    res.status(400).json({
      message: 'Missing required email or firstname or lastname information!',
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
          message: `The user with the id ${id} was not found during validation.`,
        });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'There was an error validating the user.' });
  }
}
