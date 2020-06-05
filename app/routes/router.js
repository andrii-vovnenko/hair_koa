const Router = require('koa-router');

const router = new Router();

require('./adminRoutes')(router);

module.exports = router;
