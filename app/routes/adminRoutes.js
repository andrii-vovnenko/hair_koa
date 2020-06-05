module.exports = (router) => {
  router
    .get('/admin/index', async (ctx) => {
      ctx.body = 'Hello';
    })
};
