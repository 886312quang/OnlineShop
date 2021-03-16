const express = require("express");

// Routes
const auth = require("./auth");
const user = require("./user");

const router = express.Router();

router.get("/status", (req, res) => res.send("OK"));

router.use("/auth", auth);
router.use("/user", user);

module.exports = router;
