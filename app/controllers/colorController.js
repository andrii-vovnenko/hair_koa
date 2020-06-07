const { insertColor } = require('../managers/colorsManager');
const colors = [
  {
    colorTypeId: 1,
    colorName: 'HH613',
  },
]

const addColor = async (ctx) => {
  const { colorName, colorTypeId } = ctx.request.body;
  await insertColor({ colorName, colorTypeId });
};

module.exports = {
  addColor,
}
