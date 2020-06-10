const modelManager = require('../managers/modelsManager');

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

module.exports = {
  addModel,
  getModels,
}
