const express = require("express");
const { user } = require("../controllers/index");
const multer = require("multer");
const AuthMiddleware = require("../middlewares/Auth.Middleware");
const { User, Admin } = require("../helpers/role");
var upload = multer({ dest: "./public/images" });

const router = express.Router();

router.route("/:id").get(AuthMiddleware.isAuth, user.info);
router.route("/").get(user.index); 
router
  .route("/delete/:id")
  .delete(AuthMiddleware.authorize(Admin), user.deleteUser);
router
  .route("/updateAd/:id")
  .post(AuthMiddleware.authorize(Admin), user.updateUserAd);
router
  .route("/update/:id")
  .post(AuthMiddleware.isAuth, upload.array("avatar", 12), user.updateUser);

module.exports = router;
