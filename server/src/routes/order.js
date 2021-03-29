const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/Auth.Middleware");
const { User, Admin } = require("../helpers/role");
const { order } = require("../controllers/index");

router.get("/", order.index);
router.get("/:id", order.getOrderById);
router.get("/order-list/:email", order.getOrderByUser);
router.post("/", order.createOrder);
router.delete("/delete/:id", order.deleteOrder);
router.post("/update/:id", order.updateOrder);

module.exports = router;
