const mongoose = require("mongoose");

var productSchema = new mongoose.Schema(
  {
    productTitle: String,
    productPrice: String,
    productImg: Array,
    productDate: Date,
    productName: String,
    productSale: Number,
    productPrice: Number,
    productFinalPrice: Number,
    productCate: String,
    productGroupCate: String,
    productColor: String,
    productSize: Array,
    productType: String,
    productSold: Number,
    productDes: String,
    productVote: Array,
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: null },
    deletedAt: { type: Number, default: null },
  },
  {
    versionKey: false,
  },
);

var Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
