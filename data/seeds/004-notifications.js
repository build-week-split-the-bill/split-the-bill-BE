exports.seed = function(knex) {
  return knex('notifications')
    .del()
    .then(function() {
      return knex('notifications').insert([
        {
          bill_id: 1,
          email: 'sascha@test.com',
        },
        {
          bill_id: 2,
          email: 'hanne@test.com',
        },
        {
          bill_id: 1,
          email: 'anotherfriend@test.com',
        },
      ]);
    });
};
