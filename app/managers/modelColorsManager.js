const { knex } = require('../knex');

const TABLE_NAME = 'modelColorCount';

const getModelColors = (params) => knex(TABLE_NAME).where(params);

const addModelColor = (params) => {
  const { colorId, modelId, count } = params;
  const modelColorId = Number(`${modelId}${colorId}`);
  return knex.raw(
    `insert into ${TABLE_NAME}
    (modelColorId, colorId, modelId, count)
    values (?, ?, ?, ?)
    on duplicate key update count=${count}`, [modelColorId, colorId, modelId, count]);
};

module.exports = {
  getModelColors,
  addModelColor,
}
