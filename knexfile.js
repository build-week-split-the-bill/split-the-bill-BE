module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true, // needed for sqlite
    connection: {
      filename: './data/splitthebill.db3',
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    // needed to use foreign keys
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};
