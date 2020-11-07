const config = require('config');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.dbName,
  }
});

module.exports = { knex };
