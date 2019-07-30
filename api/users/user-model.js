const db = require('../../data/db-config.js');

module.exports = {
  find,
  findById,
  findBy,
  findUserBills,
  findByUserEmail,
  add,
  update,
  remove,
};

function find() {
  return db('users');
}

function findById(id) {
  return db('users')
    .where('id', id)
    .first()
    .then(user => (user ? user : null));
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .first()
    .then(user => (user ? user : null));
}

function findUserBills(userId) {
  return db('bills as b')
    .join('users as u', 'u.id', 'b.user_id')
    .select(
      'b.id',
      'b.split_sum',
      'b.split_people_count',
      'b.created_at',
      'b.user_id',
      'u.email as user_email',
    )
    .where('b.user_id', userId);
}

function findByUserEmail(user_email) {
  return db('users')
    .where('email', user_email)
    .first()
    .then(user => (user ? user : null));
}

function add(user) {
  return db('users')
    .insert(user, 'id')
    .then(([id]) => this.findById(id));
}

function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('users')
    .where('id', id)
    .del();
}
