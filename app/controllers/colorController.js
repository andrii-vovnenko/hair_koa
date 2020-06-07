
const colors = [
  {
    colorTypeId: 1,
    colorName: 'HH613',
  },
]

const addColor = async (ctx) => {
  const { colorName, colorTypeId } = ctx.request.body;
  colors.push({ colorName, colorTypeId });
  ctx.body = {
    colors,
  };
};

module.exports = {
  addColor,
}
