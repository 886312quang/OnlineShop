const mongoose = require("mongoose");

let orderSchema = new mongoose.Schema(
  {
    orderAvatar: String,
    orderName: String,
    orderEmail: String,
    orderPhone: String,
    orderAddress: String,
    orderTinh: String,
    orderHuyen: String,
    orderList: Array,
    orderTotal: Number,
    orderPaymentMethod: String,
    orderDate: String,
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: null },
    deletedAt: { type: Number, default: null },
  },
  {
    versionKey: false,
  },
);

let Order = mongoose.model("Order", orderSchema, "order");

module.exports = Order;
