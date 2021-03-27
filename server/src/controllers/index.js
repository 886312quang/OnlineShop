const authControllers = require("./auth.controllers");
const userControllers = require("./user.controllers");
const newsControllers = require("./news.controllers");
const productControllers = require("./product.controllers");

const auth = authControllers;
const user = userControllers;
const news = newsControllers;
const products = productControllers;

module.exports = {
  auth,
  user,
  news,
  products,
};
