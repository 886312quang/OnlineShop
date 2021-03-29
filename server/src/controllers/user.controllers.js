const User = require("../models/userModel");
const { validationResult } = require("express-validator/check");
const { transSuccess, transErrors } = require("../../../lang/vi");

let info = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findById(id).then(function (users) {
      res.status(200).json(users.transform());
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

let index = async (req, res) => {
  try {
    const users = await User.find();
    const data = users.map((user) => user.transform());
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  info,
  index,
};
