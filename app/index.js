const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routes/router');

const app = new Koa();

app
  .use(bodyParser())
  .use(router.middleware());

const server = app.listen(3000, () => {
  console.log('server listening op port %d', 3000);
});
