const authControllers = require("./auth.controllers");
const userControllers = require("./user.controllers");
const newsControllers = require("./news.controller");

const auth = authControllers;
const user = userControllers;
const news = newsControllers;

module.exports = {
  auth,
  user,
  news,
};
