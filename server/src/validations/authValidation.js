const { check } = require("express-validator/check");
const { transValidation } = require("../../../lang/vi");

let register = [
  check("email", transValidation.email_incorrect).isEmail().trim(),
  check("password", transValidation.password_incorrect).isLength({ min: 8 }),
];

let login = [
  check("email", transValidation.email_incorrect).isEmail().trim(),
  check("password", transValidation.password_incorrect).isLength({ min: 8 }),
];

let sendResetPassword = [
  check("email", transValidation.email_incorrect).isEmail().trim(),
];
let resetPassword = [
  check("email", transValidation.email_incorrect).isEmail().trim(),
  check("password", transValidation.password_incorrect).isLength({ min: 8 }),
];

module.exports = {
  register,
  login,
  sendResetPassword,
  resetPassword,
};
