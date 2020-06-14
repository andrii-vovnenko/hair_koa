const { knex } = require('../knex');

const TABLE_NAME = 'modelPhotos';

const insertPhoto = (params) => knex(TABLE_NAME).insert(params);

module.exports = {
  insertPhoto,
}
