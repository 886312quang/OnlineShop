const Category = require("../models/categoryModel");

module.exports.index = async function (req, res) {
  try {
    var cate = await Category.find();
    return res.status(200).json(cate);
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports.postCategory = async function (req, res) {
  try {
    await Category.create(req.body);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
