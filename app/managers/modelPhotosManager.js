const head = require('lodash/head');
const { knex } = require('../knex');

const TABLE_NAME = 'modelPhotos';

const insertPhoto = (params) => knex(TABLE_NAME).insert(params);

const getPhotosByParams = async (params) => knex(TABLE_NAME).where(params);

const deletePhoto = (params) => knex(TABLE_NAME).where(params).delete();

module.exports = {
  insertPhoto,
  getPhotosByParams,
  deletePhoto,
}
