const { knex } = require('../knex');

const TABLE_NAME = 'purchase';

const addPurchase = (params) => knex(TABLE_NAME).insert({ ...params, purchaseDate: new Date() });

module.exports = {
  addPurchase,
};
