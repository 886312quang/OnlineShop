const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/Auth.Middleware");
const { User, Admin } = require("../helpers/role");
const { category } = require("../controllers/index");

router.get("/", category.index);
router.post("/", AuthMiddleware.authorize(Admin), category.postCategory);

module.exports = router;
