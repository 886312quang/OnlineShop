const express = require("express");

const { auth } = require("../controllers/index");
const { authValid } = require("../validations/index");

const router = express.Router();

router.route("/login").post(authValid.login, auth.login);
router.route("/register").post(authValid.register, auth.register);
router.route("/refresh-token").post(auth.refreshToken);

module.exports = router;
