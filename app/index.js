const Koa = require('koa');
const cors = require('@koa/cors');
const config = require('config');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const mount = require('koa-mount');
const serve = require('koa-static');
const router = require('./routes/router');

const app = new Koa();

app
  .use(cors())
  .use(mount("/images", serve(`${__dirname}/public/images`)))
  .use(bodyParser({
    formidable:{uploadDir: './uploads'},    //This is where the files would come
    multipart: true,
    urlencoded: true,
    limit: '50mb',
  }))
  .use(router.middleware());

const server = app.listen(config.server.port, () => {
  console.log('%s. server listening on port %d', config.app.name, config.server.port);
});
