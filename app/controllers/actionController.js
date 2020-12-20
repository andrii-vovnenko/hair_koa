const sellerManager = require('../managers/sellerManager');
const modelColorsManager = require('../managers/modelColorsManager');
const makeModelColorId = require('../helpers/modelColorHelper');

// todo rename this controller

const getAllSellerStatistics = async (ctx) => {
  const [sells] = await sellerManager.getSells();
  return ctx.body = {
    sellStatistic: sells,
  };
};

const setSell = async (ctx) => {
  const { modelId, colorId } = ctx.request.body;
  if (!modelId || !colorId) {
    ctx.body = {
      status: 'not allowed',
    };
    return;
  }
  const modelColorId = makeModelColorId({ modelId, colorId });
  await sellerManager.setSell({ modelId, colorId })
    .then(() => modelColorsManager.decrementModelCount({ modelColorId }))
    .then(() => console.log('sold'));
  ctx.body = {
    status: 'оформленно',
  };
};

const cancelPurchase = async (ctx) => {
  const { sellId } = ctx.request.body;
  await sellerManager.cancelPurchase(sellId);
  const [sells] = await sellerManager.getSells();
  return ctx.body = {
    newStatistics: sells,
  };
};

module.exports = {
  setSell,
  getAllSellerStatistics,
  cancelPurchase,
};
