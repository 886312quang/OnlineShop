const express = require("express");

const { auth } = require("../controllers/index");

const { authValid } = require("../validations/index");
const admin = require("../middlewares/adminRoute");
const { User, Admin } = require("../helpers/role");

const router = express.Router();

router.route("/login").post(authValid.login, auth.login);
router.route("/register").post(authValid.register, auth.register);
router.route("/refresh-token").post(auth.refreshToken);
router.route("/admin").get(admin.authorize(Admin));

module.exports = router;
