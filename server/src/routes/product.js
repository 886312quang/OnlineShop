const express = require("express");
const multer = require("multer");
const AuthMiddleware = require("../middlewares/Auth.Middleware");
const { User, Admin } = require("../helpers/role");
var upload = multer({ dest: "./public/images" });
const { products } = require("../controllers/index");

const router = express.Router();

router.get("/", products.index);
router.get("/:id", products.getProductById);
router.post(
  "/",
  AuthMiddleware.authorize(Admin),
  upload.array("productImg", 12),
  products.createProduct,
);

router.post(
  "/update/:id",
  AuthMiddleware.authorize(Admin),
  upload.array("productImg", 12),
  products.updateProduct,
);
router.post("/review/:id", products.reviewProduct);

router.delete(
  "/delete/:id",
  AuthMiddleware.authorize(Admin),
  products.deleteProduct,
);

router.post(
  "/deleteImg/:id",
  AuthMiddleware.authorize(Admin),
  products.deleteProductImg,
);

router.post(
  "/review/:id",
  products.reviewProduct,
);

module.exports = router;
