const makeModelColorId = ({ modelId, colorId }) => Number(`${modelId}${colorId}`);

module.exports = makeModelColorId;
