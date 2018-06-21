const Router = require('koa-router');
const orderRouter = new Router;
const koaBody = require('koa-body');

// var User = require('../schemas/user');
var Order = require('../schemas/order');

orderRouter.get(
  '/:orderId',
  (ctx, next) => {
    const { orderId } = ctx.params;
    return Order.findOne({ orderId }).then(function(order) {
      if (order) {
        ctx.status = 200;
        ctx.body = order;
      } else {
        ctx.status = 404;
        ctx.body = 'User not found';
      }
    });
  }
);

// orderRouter.post(
//   '/',
//   koaBody(),
//   (ctx, next) => {
//     const userData = ctx.request.body;
//     const { username } = userData;
//     return User.findOne({ username }).then((user) => {
//       if (user) {
//         ctx.status = 409;
//         ctx.body = 'User already exists';
//       } else {
//         const newUser = new User(userData);
//         newUser.save((err, data) => {
//           if (err) {
//             ctx.err = err;
//           }
//         });
//         const { err } = ctx;
//         if (err) {
//           ctx.status = 500;
//           ctx.body = err;
//         } else {
//           ctx.status = 200;
//           ctx.body = 'User created successfully';
//         }
//       }
//     })
//   }
// );

module.exports = orderRouter;