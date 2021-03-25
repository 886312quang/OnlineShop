const express = require("express");
const { user } = require("../controllers/index");
const AuthMiddleware = require("../middlewares/Auth.Middleware");

const router = express.Router();

router.route("/:id").get(AuthMiddleware.isAuth, user.info);

module.exports = router;
