const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: 'sascha.majewsky@pm.me',
          password: bcrypt.hashSync('toosimple', 10),
          firstname: 'sascha',
          lastname: 'majewsky',
        },
        {
          email: 'hanne.xxx@pm.me',
          password: bcrypt.hashSync('tooshort', 10),
          firstname: 'hanne',
          lastname: 'xxx',
        },
        {
          email: 'thiara.cat@pm.me',
          password: bcrypt.hashSync('meow', 10),
          firstname: 'thiara',
          lastname: 'cat',
        },
      ]);
    });
};
