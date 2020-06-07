const colorsManages = require('../managers/colorsManager');

const addColor = async (ctx) => {
  const { colorName, colorTypeId } = ctx.request.body;
  await colorsManages.insertColor({ colorName, colorTypeId });
  const colors = await colorsManages.getColors();
  ctx.body = colors;
};

const getColors = async (ctx) => {
  const colors = await colorsManages.getColors();
  ctx.body = colors;
};

module.exports = {
  addColor,
  getColors,
}
