const Router = require('koa-router');
const router = new Router;
const koaBody = require('koa-body');

const orderRouter = require('./server/routers/orderRouter');

module.exports = function (app) {
  router.get('/', (ctx, next) => {
    ctx.body = 'Hello World';
  });

  router.get('/api/neworder', (ctx, next) => {
    ctx.body = 'A1B2';
  });

  router.use('/api/orders', orderRouter.routes(), orderRouter.allowedMethods());

  app
  .use(router.routes())
  .use(router.allowedMethods());
}