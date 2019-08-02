const db = require('../../data/db-config.js');

module.exports = {
  find,
  findById,
  findBy,
  findBillNotifications,
  add,
  update,
  remove,
};

function find() {
  return db('bills');
}

function findById(id) {
  return db('bills')
    .where('id', id)
    .first()
    .then(bill => (bill ? bill : null));
}

function findBy(filter) {
  return db('bills')
    .where(filter)
    .first()
    .then(bill => (bill ? bill : null));
}

function findBillNotifications(bill_id) {
  return db('notifications as n')
    .join('bills as b', 'b.id', 'n.bill_id')
    .select('n.id', 'n.email', 'n.bill_id')
    .where('n.bill_id', bill_id);
}

function add(bill) {
  return db('bills')
    .insert(bill, 'id')
    .then(([id]) => this.findById(id));
}

function update(id, changes) {
  return db('bills')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('bills')
    .where('id', id)
    .del();
}
