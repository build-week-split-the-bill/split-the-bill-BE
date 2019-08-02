const moment = require('moment');

exports.seed = function(knex) {
  return knex('bills')
    .del()
    .then(function() {
      return knex('bills').insert([
        {
          user_id: 1,
          split_sum: 15.73,
          split_people_count: 3,
          created_at: moment().format('MMMM Do YYYY, h:mm:ss a'),
        },
        {
          user_id: 2,
          split_sum: 33.35,
          split_people_count: 2,
          created_at: moment().format('MMMM Do YYYY, h:mm:ss a'),
        },
        {
          user_id: 3,
          split_sum: 13.37,
          split_people_count: 3,
          created_at: moment().format('MMMM Do YYYY, h:mm:ss a'),
        },
      ]);
    });
};
