const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { transErrors, transSuccess, transMail } = require("../../../lang/vi");

let saltRounds = 7;

let register = (email, password, userName) => {
  return new Promise(async (resolve, reject) => {
    let userByEmail = await UserModel.findByEmail(email);
    if (userByEmail) {
      if (userByEmail.deletedAt != null) {
        return reject({ message: transErrors.account_removed });
      }
      return reject({ message: transErrors.account_in_use });
    }
    let salt = bcrypt.genSaltSync(saltRounds);
    let userItem = {
      userName: userName,
      email: email,
      password: bcrypt.hashSync(password, salt),
    };
    let user = await UserModel.createNew(userItem);

    if (!user) {
      reject(transMail.send_failed);
    }

    resolve(transSuccess.userCreated(user.email), user);
  });
};

let verifyAccount = (token) => {
  return new Promise(async (resolve, reject) => {
    let userByToken = await UserModel.findByToken(token);

    if (!userByToken) {
      return reject(transErrors.undefine_token);
    }
    await UserModel.verify(token);
    resolve(transSuccess.accountActive);
  });
};

module.exports = {
  register,
  verifyAccount,
};
