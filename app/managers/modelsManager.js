const { knex } = require('../knex');

const TABLE_NAME = 'models';

const addModel = async (modelData) => {
  return knex.raw(`insert into ${TABLE_NAME} (${Object.keys(modelData).join(', ')})
    values (${Object.values(modelData).map(v => '?').join(', ')})
    on duplicate key update ${Object.keys(modelData)
    .filter(key => key !== 'modelName')
    .map(key => `${key} = ${modelData[key]}`)
    .join(', ')};`,
    Object.values(modelData));
};

module.exports = {
  addModel,
}
