const User = require("../models/userModel");
const { validationResult } = require("express-validator/check");
const { transSuccess, transErrors } = require("../../../lang/vi");
const { user } = require("../services/index");

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

let deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndRemove(id);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

let updateUserAd = async (req, res) => {
  try {
    const id = req.params.id;
    const data = { userName: req.body.userName, role: req.body.role };
    await user.updateUser(id, data);

    return res.status(200).json({ message: transSuccess.updateUserInfo });
  } catch (error) {
    return res.status(500).json(error);
  }
};

let updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);

    if (req.files.length > 0) {
      const imgArr = [];
      req.files.map((item) => {
        imgArr.push(`${process.env.URI_IMAGES}/${item.filename}`);
      });
      const img = {
        avatar: imgArr[0],
      };
      await User.findByIdAndUpdate({ _id: id }, img);
    }

    const data = {
      userName: req.body.userName,
      email: req.body.email,
      tinh: req.body.tinh,
      huyen: req.body.huyen,
      phone: req.body.phone,
      address: req.body.address,
    };
    await User.findByIdAndUpdate({ _id: id }, data);

    res.status(200).send({ message: transSuccess.updateUserInfo });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  info,
  index,
  deleteUser,
  updateUserAd,
  updateUser,
};
