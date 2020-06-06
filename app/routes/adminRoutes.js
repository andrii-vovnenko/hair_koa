const { RED } = require('../../constants/hairType/hairTypeNames');

module.exports = (router) => {
  router
    .get('/admin/index', async (ctx) => {
      ctx.body = RED;
    })
};
