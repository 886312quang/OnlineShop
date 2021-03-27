const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/Auth.Middleware");
const { User, Admin } = require("../helpers/role");
const controller = require("../controllers/category.controller");

router.get("/", controller.index);
router.post("/", AuthMiddleware.authorize(Admin), controller.postCategory);

module.exports = router;
