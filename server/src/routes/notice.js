const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/Auth.Middleware");
const { User, Admin } = require("../helpers/role");
const { notice } = require("../controllers/index");

router.get("/", notice.index);
router.post("/update", AuthMiddleware.authorize(Admin), notice.updateNotice);

module.exports = router;
