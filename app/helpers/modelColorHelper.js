const makeModelColorId = ({ modelId, colorId }) =>
  `1${String(modelId).padStart(4, '0')}${String(colorId).padStart(4, '0')}`;

module.exports = makeModelColorId;
