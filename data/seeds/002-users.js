const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "sascha",
          password: bcrypt.hashSync("toosimple", 10),
          email: "sascha.majewsky@pm.me",
          firstname: "sascha",
          lastname: "majewsky"
        },
        {
          username: "hanne",
          password: bcrypt.hashSync("tooshort", 10),
          email: "hanne.xxx@pm.me",
          firstname: "hanne",
          lastname: "xxx"
        },
        {
          username: "thiara",
          password: bcrypt.hashSync("meow", 10),
          email: "thiara.cat@pm.me",
          firstname: "thiara",
          lastname: "cat"
        }
      ]);
    });
};
