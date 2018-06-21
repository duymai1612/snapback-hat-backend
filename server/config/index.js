const { ENV } = process.env;

const config = {
  dev: {
    DB_URL: "mongodb://snapbackhat1:snapbackhat1@ds263660.mlab.com:63660/snapbackhat"
  },
  prod: {
    DB_URL: "mongodb://snapbackhat1:snapbackhat1@ds263660.mlab.com:63660/snapbackhat"
  }
}

const appEnv = ENV || 'dev';
const { DB_URL } = config[appEnv];

const appPort = 5000;

const mongoUrl = DB_URL;

module.exports = {
  appEnv,
  appPort,
  mongoUrl
}