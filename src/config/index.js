const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
  console.log("starting in developpement enivornement");
} else {
  dotEnv.config();
  console.log("starting in production enivornement");
}
module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  MAILER_EMAIL_ID: process.env.MAILER_EMAIL_ID,
  MAILER_PASSWORD: process.env.MAILER_PASSWORD,
  MAILER_SERVICE_PROVIDER: process.env.MAILER_SERVICE_PROVIDER,
  HOST: process.env.HOST,
  PORT_SSL: process.env.PORT,
};
