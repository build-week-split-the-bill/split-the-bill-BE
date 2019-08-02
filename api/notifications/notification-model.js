const db = require('../../data/db-config.js');

module.exports = {
  find,
  findById,
  findBy,
  add,
  update,
  remove,
};

function find() {
  return db('notifications');
}

function findById(id) {
  return db('notifications')
    .where('id', id)
    .first()
    .then(notification => (notification ? notification : null));
}

function findBy(filter) {
  return db('notifications')
    .where(filter)
    .first()
    .then(notification => (notification ? notification : null));
}

function add(notification) {
  return db('notifications')
    .insert(notification, 'id')
    .then(([id]) => this.findById(id));
}

function update(id, changes) {
  return db('notifications')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('notifications')
    .where('id', id)
    .del();
}
