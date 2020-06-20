const { knex } = require('../knex');
const makeModelColorId = require('../helpers/modelColorHelper');

const TABLE_NAME = 'modelColorCount';

const getModelColors = (params) => knex(TABLE_NAME).where(params);

const getColorsByModelIds = ({ modelsIds }) => knex(TABLE_NAME).whereIn('modelId', modelsIds);

const addModelColor = (params) => {
  const { colorId, modelId, count } = params;
  const modelColorId = makeModelColorId({ colorId, modelId });
  return knex.raw(
    `insert into ${TABLE_NAME}
    (modelColorId, colorId, modelId, count)
    values (?, ?, ?, ?)
    on duplicate key update count=${count}`, [modelColorId, colorId, modelId, count]);
};

const decrementModelCount = ({ modelColorId }) => knex.raw(`
  update ${TABLE_NAME} set count = count - 1 where modelColorId = ${modelColorId};
`);

module.exports = {
  getModelColors,
  addModelColor,
  getColorsByModelIds,
  decrementModelCount,
}
