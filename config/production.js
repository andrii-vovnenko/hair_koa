const defaultConfig = require('./default');

module.exports = {
  ...defaultConfig,
  app: {
    name: 'hair-prod',
  },
  db: {
    user: 'master',
    password: 'Djdytyrj1992',
    dbName: 'hair',
    host: '127.0.0.0',
    port: '3306',
  },
};
