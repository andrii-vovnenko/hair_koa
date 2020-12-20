const asyncBusboy = require('async-busboy');
const groupBy = require('lodash/groupBy');
const get = require('lodash/get');
const modelManager = require('../managers/modelsManager');
const modelColorsManager = require('../managers/modelColorsManager');
const colorManager = require('../managers/colorsManager');
const modelPhotosManager = require('../managers/modelPhotosManager');
const purchaseManager = require('../managers/purchaseManager');
const { saveImage, deleteImageFS } = require('../managers/uploadImagesManager');

const getModels = async (ctx) => {
  const { query } = ctx.request;

  if (!Object.keys(query).length) {
    const [models] = await modelManager.getModels();
    ctx.body = models;
    return;
  }
  const [models] = await modelManager.getModelsByName({
    modelName: query.modelName, fields: ['modelId', 'modelName'],
  });
  const modelsIds = models.map(({ modelId }) => modelId);
  const modelsColors = await modelColorsManager
    .getColorsByModelIds({ modelsIds });
  const groupedModelColors = groupBy(modelsColors, 'modelId');
  const modelsData = models
    .map((model) => ({
      ...model,
      colors: get(groupedModelColors, [model.modelId], [])
        .map(({ colorId }) => colorId),
    }));
  ctx.body = {
    modelsData,
  };
};

const getModel = async (ctx) => {
  const { query } = ctx.request;
  const { modelId } = query;
  const [model] = await modelManager.getModelByParams({ modelId });
  const modelColors = await modelColorsManager.getModelColors({ modelId });
  const colors = await colorManager.getColors();
  const photos = await modelPhotosManager.getPhotosByParams({ modelId });
  ctx.body = {
    status: 'ok',
    model: Object.assign(model, { colors: modelColors }),
    entities: {
      colors,
      photos: groupBy(photos, 'modelColorId'),
    },
  };
};

const addColorToModel = async (ctx) => {
  const { body } = ctx.request;

  const { count, colorId, modelId } = body;

  if (!colorId || !modelId) {
    ctx.body = { status: 'немає данних' };
    return;
  }

  const [prevColorCount] = await modelColorsManager.getModelColors({ colorId, modelId });
  try {
    await modelColorsManager.addModelColor(body);
  } catch (e) {
    ctx.body = { status: 'невдача' };
    return;
  }
  const prevCount = get(prevColorCount, ['count'], 0);
  // запис в табличку приходу (якщо такий товар вже існує і нова к-сть більша за попередню)
  if (prevCount < count || !prevColorCount) {
    await purchaseManager.addPurchase({ modelId, colorId, count: count - prevCount });
  }
  ctx.body = { status: 'ok' };
};

const uploadImages = async (ctx) => {
  const { files, fields } = await asyncBusboy(ctx.req);
  if (!files || !files.length) {
    ctx.body = { status: 'fail' };
    return;
  }
  const { modelId, colorId, modelColorId } = JSON.parse(fields.additionalData);
  const fileNames = await Promise.all(files
    .map((file) => saveImage({ file, modelId, colorId })));
  await Promise.all(fileNames
    .map(({ fileName1024, fileName640, fileName320 }) => modelPhotosManager.insertPhoto({
      photo1024x768: fileName1024,
      photo640x480: fileName640,
      photo320x240: fileName320,
      modelId,
      colorId,
      modelColorId,
    })));
  const photos = await modelPhotosManager.getPhotosByParams({ modelId });
  ctx.body = {
    status: 'ok',
    entities: {
      photos: groupBy(photos, 'modelColorId'),
    },
  };
};

const deleteImage = async (ctx) => {
  const { photoId } = ctx.request.body;
  const [photo] = await modelPhotosManager.getPhotosByParams({ photoId });
  if (!photo) {
    ctx.body = {
      status: 'no photo',
    };
    return;
  }
  const {
    photo1024x768, photo640x480, photo320x240, modelId,
  } = photo;
  await modelPhotosManager.deletePhoto({ photoId });
  Object.values({
    photo1024x768, photo640x480, photo320x240,
  }).forEach(deleteImageFS);
  const photos = await modelPhotosManager.getPhotosByParams({ modelId });
  ctx.body = {
    status: 'ok',
    entities: {
      photos: groupBy(photos, 'modelColorId'),
    },
  };
};

const addModel = async (ctx) => {
  const {
    modelName, price, materialId, typeId, length, producer,
  } = ctx.request.body;
  if (!modelName || !price || !materialId || !typeId || !producer) {
    ctx.body = { status: 'заповніть всі поля' };
    return;
  }
  try {
    await modelManager.addModel({
      producer,
      typeId,
      materialId,
      price,
      modelName,
      length,
    });
  } catch (e) {
    ctx.status = 400;
    ctx.body = { error: 'something went wrong' };
  }
  ctx.status = 200;
  ctx.body = { status: 'додано' };
};

module.exports = {
  addModel,
  getModels,
  getModel,
  addColorToModel,
  uploadImages,
  deleteImage,
};
