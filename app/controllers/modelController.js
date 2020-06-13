const modelManager = require('../managers/modelsManager');
const modelColorsManager = require('../managers/modelColorsManager');
const colorManager = require('../managers/colorsManager');

const delay = (ms) => {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, ms);
  });
};

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

module.exports = {
  addModel,
  getModels,
  getModel,
  addColorToModel,
}
