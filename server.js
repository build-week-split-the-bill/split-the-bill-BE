const express = require('express');
const helmet = require('helmet');
const moment = require('moment');
const cors = require('cors');

const UsersRouter = require('./api/users/user-router.js');
const BillsRouter = require('./api/bills/bill-router.js');
const NotificationsRouter = require('./api/notifications/notification-router.js');

const server = express();

server.use(Requestlogger);
server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
  res.send(
    `Welcome to the ${process.env.DB_ENV} environment API of Split The Bill!`,
  );
});

server.use('/api/users', UsersRouter);
server.use('/api/bills', BillsRouter);
server.use('/api/notifications', NotificationsRouter);

// Custom logging middleware for incoming requests
function Requestlogger(req, res, next) {
  console.log(
    `${req.method} to http://localhost/5000${req.path} at `,
    moment().format(),
  );
  next();
}

// This line might come in handy as a start script for the heroku postgres deployment
/* "heroku-postbuild": "npm install --production && knex migrate:latest" */

module.exports = server;
