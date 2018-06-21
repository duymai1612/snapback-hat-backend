const Koa = require('koa');
const app = new Koa();

const { appPort } = require('./server/config');

require('./server')(app);
require('./router')(app);

app.listen(appPort, () => {
  console.log(`Server running on port ${appPort}`);
});