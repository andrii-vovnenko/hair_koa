const sellerManager = require('../managers/sellerManager');
const modelColorsManager = require('../managers/modelColorsManager');
const makeModelColorId = require('../helpers/modelColorHelper');

const setSell = async (ctx) => {
  const { modelId, colorId } = ctx.request.body;
  const modelColorId = makeModelColorId({ modelId, colorId });
  await sellerManager.setSell({ modelId, colorId })
    .then(() => modelColorsManager.decrementModelCount({ modelColorId }))
    .then(() => console.log('sold'));
  return ctx.body = {
    status: 'оформленно',
  };
};

module.exports = {
  setSell,
};
