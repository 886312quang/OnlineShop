const authControllers = require("./auth.controllers");
const userControllers = require("./user.controllers");
const newsControllers = require("./news.controllers");
const productControllers = require("./product.controllers");
const noticeControllers = require("./notice.controllers");
const categoryControllers = require("./category.controllers");
const orderControllers = require("./order.controllers");

const auth = authControllers;
const user = userControllers;
const news = newsControllers;
const products = productControllers;
const notice = noticeControllers;
const category = categoryControllers;
const order = orderControllers;

module.exports = {
  auth,
  user,
  news,
  products,
  notice,
  category,
  order,
};
