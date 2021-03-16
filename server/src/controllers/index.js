const authControllers = require("./auth.controllers");
const userControllers = require("./user.controllers");

const auth = authControllers;
const user = userControllers;

module.exports = {
  auth,
  user,
};
