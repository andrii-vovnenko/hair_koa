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
    host: '8.211.2.107',
    port: '3306',
  },
};
