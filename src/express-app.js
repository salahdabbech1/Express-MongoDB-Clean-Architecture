const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { customer } = require("./api");


module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(__dirname + "/public"));
  app.use(helmet());

  customer(app);
};
