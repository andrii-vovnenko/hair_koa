const modelManager = require('../managers/modelsManager');
const modelColorsManager = require('../managers/modelColorsManager');
const colorManager = require('../managers/colorsManager');
const modelPhotosManager = require('../managers/modelPhotosManager');
const uniqId = require('nanoid');
const fs = require('fs');
const sharp = require('sharp');
const asyncBusboy = require('async-busboy');

const delay = (ms) => {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, ms);
  });
};

const formats = ['.jpeg', '.jpg', '.JPG', '.png', '.PNG'];
const makePathToImages = ({ fileName }) => `${__dirname}/../public/images/${fileName}`;
const transformer = (width, height) => new sharp().resize({width, height, fit: 'contain' }).webp();

const writeFileToFs = ({ width, height, modelColorId, file }) => {
  return new Promise(res => {
    const fileName = `${modelColorId}${uniqId(5)}`;
    file.pipe(transformer(width, height)).pipe(fs.createWriteStream(makePathToImages({ fileName })));
    res(fileName);
  })
}

const addModel = async (ctx) => {
  const {
    modelName, price, materialId, typeId, length, producer,
  } = ctx.request.body;
  await delay(500);
  if (!modelName || !price || !materialId || !typeId || !producer) {
    ctx.status = 400;
    return ctx.body = { error: 'not enough of data' }
  }
  try {
    await modelManager.addModel({
      producer,
      typeId,
      materialId,
      price,
      modelName,
      length
    })
  } catch (e) {
    ctx.status = 400;
    ctx.body = { error: 'something went wrong' };
  }
  ctx.status = 200;
  ctx.body = { status: 'додано' };
};

const getModels = async (ctx) => {
  const models = await modelManager.getModels();
  await delay(500);
  return ctx.body = models;
};

const getModel = async (ctx) => {
  const { query } = ctx.request;
  const { modelId } = query;
  const [model] = await modelManager.getModelByParams({ modelId });
  const modelColors = await modelColorsManager.getModelColors({ modelId });
  const colors = await colorManager.getColors();
  return ctx.body = {
    status: 'ok',
    model: Object.assign(model, { colors: modelColors }),
    entities: {
      colors,
    }
  };
};

const addColorToModel = async (ctx) => {
  const { body } = ctx.request;
  if ( !body.colorId || !body.modelId ) return ctx.status = 300;
  await modelColorsManager.addModelColor(body);
  return ctx.body = {
    status: 'ok',
  }
};

const uploadImages = async (ctx) => {
  const {files, fields} = await asyncBusboy(ctx.req);
  const [file] = files;
  const { modelId, colorId, modelColorId } = JSON.parse(fields.additionalData);
  const [fileName320, fileName640, fileName1024 ] = await Promise.all([
    writeFileToFs({ modelColorId, file, height: 240, width: 320 }),
    writeFileToFs({ modelColorId, file, height: 480, width: 640 }),
    writeFileToFs({ modelColorId, file, height: 768, width: 1024 }),
  ]);
  await modelPhotosManager.insertPhoto({
    photo1024x768:  fileName1024,
    photo640x480:  fileName640,
    photo320x240:  fileName320,
    modelId,
    colorId,
    modelColorId,
  });
};

module.exports = {
  addModel,
  getModels,
  getModel,
  addColorToModel,
  uploadImages,
}
