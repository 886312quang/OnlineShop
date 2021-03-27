const express = require("express");
const multer = require("multer");
const AuthMiddleware = require("../middlewares/Auth.Middleware");
const { User, Admin } = require("../helpers/role");
var upload = multer({ dest: "./public/images" });
const { news } = require("../controllers/index");

const router = express.Router();

router.get("/", news.index);
router.get("/category/:cate", news.getCate);
router.get("/:id", news.getNewsById);
router.post("/count/:id", news.countNewsView);
router.delete("/delete/:id", AuthMiddleware.authorize(Admin), news.deleteNews);
router.post(
  "/update/:id",
  AuthMiddleware.authorize(Admin),
  upload.array("newImg", 12),
  news.updateNews,
);
router.post(
  "/delete/images/:id",
  AuthMiddleware.authorize(Admin),
  news.deleteImg,
);
router.post(
  "/",
  AuthMiddleware.authorize(Admin),
  upload.array("newImg", 12),
  news.postNews,
);

module.exports = router;
