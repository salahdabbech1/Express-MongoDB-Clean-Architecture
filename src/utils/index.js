const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const {
  APP_SECRET,
  MAILER_EMAIL_ID,
  MAILER_PASSWORD,
  HOST,
  PORT_SSL,
  MAILER_SERVICE_PROVIDER,
} = require("../config");

//Utility functions
(module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
}),
  (module.exports.GeneratePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
  });

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

(module.exports.GenerateSignature = async (payload) => {
  return await jwt.sign(payload, APP_SECRET, { expiresIn: "1d" });
}),
  (module.exports.ValidateSignature = async (req) => {
    const signature = req.get("Authorization");

    if (signature) {
      const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
      req.user = payload;
      return true;
    }
    return false;
  });

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};
module.exports.CreateTransporter = async () => {
  const transporter = await nodemailer.createTransport({
    host: HOST,
    port: PORT_SSL,
    service: MAILER_SERVICE_PROVIDER,
    secure: true,
    auth: {
      user: MAILER_EMAIL_ID,
      pass: MAILER_PASSWORD,
    },
  });

  return transporter;
};
