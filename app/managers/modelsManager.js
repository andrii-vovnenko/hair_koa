const { knex } = require('../knex');

const TABLE_NAME = 'models';

const addModel = async (modelData) => {
  await knex(TABLE_NAME).insert(modelData);
};

module.exports = {
  addModel,
}
