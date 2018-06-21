const Router = require('koa-router');
const router = new Router;
const koaBody = require('koa-body');

const userRouter = require('./server/routers/userRouter');

module.exports = function (app) {
  router.get('/', (ctx, next) => {
    ctx.body = 'Hello World';
  });

  router.use('/api/users', userRouter.routes(), userRouter.allowedMethods());

  app
  .use(router.routes())
  .use(router.allowedMethods());
}