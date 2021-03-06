const mongoose = require("mongoose");

var cateSchema = new mongoose.Schema(
  {
    cateName: String,
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: null },
    deletedAt: { type: Number, default: null },
  },
  {
    versionKey: false,
  },
);

var Category = mongoose.model("Category", cateSchema, "category");

module.exports = Category;
