const express = require("express");

// Routes
const auth = require("./auth");
const user = require("./user");
const news = require("./news");
const products = require("./product");
const category = require("./category");

const router = express.Router();

router.get("/status", (req, res) => res.send("OK"));

router.use("/auth", auth);
router.use("/user", user);
router.use("/news", news);
router.use("/products", products);
router.use("/category", category);

module.exports = router;
