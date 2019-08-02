const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  return cleaner.clean(knex, {
    // Keeps the migration tables while cleaning the database for seed population
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  });
};
