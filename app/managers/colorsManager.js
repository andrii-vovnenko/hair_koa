const { knex } = require('../knex');

const TABLE_NAME = 'hairColors';

const insertColor = ({ colorTypeId, colorName }) => {
  return knex.raw(`insert into ${TABLE_NAME} (colorTypeId, colorName)
                  values (?, ?)
                  on duplicate key update colorTypeId=${colorTypeId}`, [colorTypeId, colorName]);
};

const getColors = () => {
  return knex(TABLE_NAME).select();
};

module.exports = {
  insertColor,
  getColors,
};
