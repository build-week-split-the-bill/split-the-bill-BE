exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(users) {
      users.increments();
      users.string('password', 128).notNullable();
      users.string('firstname', 128).notNullable();
      users.string('lastname', 128).notNullable();
      users
        .string('email', 128)
        .notNullable()
        .unique();
    })
    .createTable('bills', function(bills) {
      bills.increments();
      bills.float('split_sum').notNullable();
      bills.integer('split_people_count').notNullable();
      bills.string('created_at').defaultTo(knex.fn.now());
      bills
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    })
    .createTable('notifications', function(bills) {
      bills.increments();
      bills.string('email', 128).notNullable();
      bills
        .integer('bill_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('bills')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    });
};
a;
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('notifications')
    .dropTableIfExists('bills')
    .dropTableIfExists('users');
};
