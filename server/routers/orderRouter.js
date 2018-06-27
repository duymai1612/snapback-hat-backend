const Router = require('koa-router');
const orderRouter = new Router;
const koaBody = require('koa-body');
const moment = require('moment');

var Order = require('../schemas/order');

orderRouter.get(
  '/:orderId',
  (ctx, next) => {
    const { orderId } = ctx.params;
    return Order.findOne({ _id: orderId }).then((order) => {
      if (order) {
        ctx.status = 200;
        ctx.body = order;
      } else {
        ctx.status = 404;
        ctx.body = 'Order not found';
      }
    });
  }
);

orderRouter.get(
  '/',
  (ctx, next) => {
    return Order.find().then((orders) => {
      if (orders) {
        ctx.status = 200;
        ctx.body = orders;
      } else {
        ctx.status = 404;
        ctx.body = 'Order not found';
      }
    });
  }
);

// orderRouter.get(
//   '/neworder',
//   (ctx, next) => {
//     return Order.find({ _id: { $regex: '/^[0-9a-fA-F]{24}$/' }}).then((orders) => {
//       if (orders) {
//         ctx.status = 200;
//         ctx.body = orders[orders.length - 1];
//       } else {
//         ctx.status = 404;
//         ctx.body = 'Order not found';
//       }
//     });
//   }
// );

orderRouter.post(
  '/',
  koaBody(),
  (ctx, next) => {
    const orderData = ctx.request.body;
    const newOrder = new Order(orderData);
    const err = newOrder.validateSync();
    if (err) {
      ctx.status = 403;
      ctx.body = 'Invalid order';
    } else {
      newOrder.save((err, data) => {
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
        ctx.body = newOrder;
      }
    }
  }
);

module.exports = orderRouter;