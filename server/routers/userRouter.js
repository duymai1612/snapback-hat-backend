const Router = require('koa-router');
const userRouter = new Router;
const koaBody = require('koa-body');

var User = require('../schemas/user');

userRouter.get(
  '/:username',
  (ctx, next) => {
    const { username } = ctx.params;
    return User.findOne({ username }).then(function(user) {
      if (user) {
        ctx.status = 200;
        ctx.body = user;
      } else {
        ctx.status = 404;
        ctx.body = 'User not found';
      }
    });
  }
);

userRouter.post(
  '/',
  koaBody(),
  (ctx, next) => {
    const userData = ctx.request.body;
    const { username } = userData;
    return User.findOne({ username }).then((user) => {
      if (user) {
        ctx.status = 409;
        ctx.body = 'User already exists';
      } else {
        const newUser = new User(userData);
        newUser.save((err, data) => {
          if (err) {
            ctx.err = err;
          }
        });
        const { err } = ctx;
        if (err) {
          ctx.status = 500;
          ctx.body = err;
        } else {
          ctx.status = 200;
          ctx.body = 'User created successfully';
        }
      }
    })
  }
);

module.exports = userRouter;