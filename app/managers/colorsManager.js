const { knex } = require('../knex');

const TABLE_NAME = 'hairColors';

const insertColor = async ({ colorTypeId, colorName }) => knex(TABLE_NAME).insert({ colorTypeId, colorName });

module.exports = {
  insertColor,
};
