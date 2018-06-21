const Koa = require('koa');
const mongoose = require('mongoose');

const { mongoUrl } = require('./server/config');

const app = new Koa();

module.exports = function (app) {
  mongoose.connect(mongoUrl);

  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  });
  
  // logger
  
  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - Status: ${ctx.status} - ${ms}ms`);
  });
}