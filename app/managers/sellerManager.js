const { knex } = require('../knex');

const TABLE_NAME = 'seller';

const setSell = ({ modelId, colorId }) => knex(TABLE_NAME).insert({ modelId, colorId, sellDate: new Date() })

const getSells = (params) => {
  let query = `
    SELECT *
    FROM ${TABLE_NAME} AS s
    JOIN models AS m ON s.modelId = m.modelId
    JOIN hairColors AS hc ON s.colorId = hc.colorId
  `;
  if (params)
    query = `
    ${query}
     WHERE ${Object.keys(params).map((key) => `s.${key}=${params[key]}`).join(' AND ')}
    `
  return knex.raw(`${query};`);
}

const cancelPurchase = (sellId) => knex(TABLE_NAME).where({ sellId }).delete();

module.exports = {
  setSell,
  getSells,
  cancelPurchase,
}
