const express = require("express");

// Routes
const auth = require("./auth");
const user = require("./user");
const news = require("./news");

const router = express.Router();

router.get("/status", (req, res) => res.send("OK"));

router.use("/auth", auth);
router.use("/user", user);
router.use("/news", news);

module.exports = router;
