const Koa = require('koa');
const cors = require('@koa/cors');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const router = require('./routes/router');

const app = new Koa();

app
  .use(cors())
  .use(bodyParser())
  .use(router.middleware());

const server = app.listen(config.server.port, () => {
  console.log('%s. server listening on port %d', config.app.name, config.server.port);
});
