const Order = require("../models/orderModel");
const Notice = require("../models/noticeModel");
const Product = require("../models/productModel");

let index = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: 1 });
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json(error);
  }
};

let getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json(error);
  }
};

let deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    await Order.findByIdAndRemove(id);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

let updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    let oldOrder = await Order.findById(id);
    let orderList = req.body.orderList;
    await Order.findByIdAndUpdate(id, req.body);
    let deleteOrder = [];

    for (let i in oldOrder.orderList) {
      let check = false;
      for (let j in orderList) {
        if (orderList[j].id === oldOrder.orderList[i].id) {
          orderList[j].amount =
            orderList[j].amount - oldOrder.orderList[i].amount;
          check = true;
        }
      }
      if (check === false) {
        deleteOrder.push(oldOrder.orderList[i]);
      }
    }
    console.log(orderList);
    console.log(deleteOrder);

    for (let i in orderList) {
      await Product.findByIdAndUpdate(orderList[i].id, {
        $inc: { productSold: orderList[i].amount },
      });
    }

    for (let i in deleteOrder) {
      await Product.findByIdAndUpdate(deleteOrder[i].id, {
        $inc: { productSold: -deleteOrder[i].amount },
      });
    }
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

let createOrder = async (req, res) => {
  try {
    const data = {
      orderAvatar:
        req.body.orderAvatar ||
        "http://pe.heromc.net:4000/images/16f9bbf512b66a228f7978e34d8fb163",
      orderName: req.body.orderName,
      orderEmail: req.body.orderEmail,
      orderPhone: req.body.orderPhone,
      orderAddress: req.body.orderAddress,
      orderTinh: req.body.orderTinh,
      orderHuyen: req.body.orderHuyen,
      orderList: req.body.orderList,
      orderTotal: req.body.orderTotal,
      orderPaymentMethod: req.body.orderPaymentMethod,
      orderDate: req.body.orderDate,
    };

    const orderList = req.body.orderList;
    for (let i in orderList) {
      await Product.findByIdAndUpdate(orderList[i].id, {
        $inc: { productSold: orderList[i].amount },
      });
    }
    await Order.create(data);

    const notice = {
      noticeContent: `You have new order from ${req.body.orderName}`,
      isRead: false,
      noticeTime: new Date(),
    };
    await Notice.create(notice);

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

let getOrderByUser = async (req, res) => {
  try {
    console.log(req.params);

    const email = req.params.email;

    const order = await Order.find({ orderEmail: email });
    console.log(order);
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  index,
  getOrderById,
  updateOrder,
  deleteOrder,
  createOrder,
  getOrderByUser,
};
