const { knex } = require('../knex');

const TABLE_NAME = 'seller';

const setSell = ({ modelId, colorId }) => knex(TABLE_NAME).insert({ modelId, colorId, sellDate: new Date() })

module.exports = {
  setSell,
}
