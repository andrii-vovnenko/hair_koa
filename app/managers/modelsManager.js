const { knex } = require('../knex');

const TABLE_NAME = 'models';

const addModel = (modelData) => {
  return knex.raw(`insert into ${TABLE_NAME} (${Object.keys(modelData).join(', ')})
    values (${Object.values(modelData).map(v => '?').join(', ')})
    on duplicate key update ${Object.keys(modelData)
    .filter(key => key !== 'modelName')
    .map(key => `${key} = ${modelData[key]}`)
    .join(', ')};`,
    Object.values(modelData));
};

const getModels = () => {
  return knex.raw(`select m.*, sum(mc.count) as count
                          from models as m
                          left join modelColorCount mc on m.modelId = mc.modelId
                          group by m.modelId;
                          `);
};

const getModelByParams = (params) => {
  return knex(TABLE_NAME).where(params);
};

const getModelsByName = ({modelName, fields}) => knex.raw(`
  SELECT ${!fields ? '*' : fields.join(', ')}
  FROM models
  WHERE modelName like '%${modelName}%';
`);

module.exports = {
  addModel,
  getModels,
  getModelByParams,
  getModelsByName,
}
