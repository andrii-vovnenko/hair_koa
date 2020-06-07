
const addModel = async (ctx) => {
  const { body } = ctx.request;
  console.log(body);
  ctx.body = { status: 'ok' };
};

module.exports = {
  addModel,
}
