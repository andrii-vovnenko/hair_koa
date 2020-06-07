const config = require('config');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : config.db.user,
    password : config.db.password,
    database : config.db.dbName,
  }
});

module.exports = { knex };
