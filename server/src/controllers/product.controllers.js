let Products = require("../models/productModel");

let index = async (req, res) => {
  try {
    const products = await Products.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};

let getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.findById(id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};

let createProduct = async (req, res) => {
  try {
    const imgArr = [];
    req.files.map((item) => {
      imgArr.push(`${process.env.URI_IMAGES}/${item.filename}`);
    });

    const data = {
      productName: req.body.productName,
      productSale: req.body.productSale,
      productPrice: req.body.productPrice,
      productFinalPrice:
        req.body.productPrice -
        req.body.productPrice * (req.body.productSale / 100),
      productGroupCate: req.body.productGroupCate,
      productCate: req.body.productCate,
      productSize: req.body.productSize.split(","),
      productSex: req.body.productSex,
      productDate: req.body.productDate,
      productImg: imgArr,
      productDes: req.body.productDes,
      productSold: 0,
      productType: req.body.productType,
    };

    await Products.create(data);

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

let deleteProduct = async (req, res) => {
  try {
    await Products.findByIdAndRemove({ _id: req.params.id });
    return res.status(200).send({ message: "success" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

let deleteProductImg = async (req, res) => {
  try {
    const id = req.params.id;
    let deletedData;

    const img = req.body;

    if (img) {
      await Products.findByIdAndUpdate(
        { _id: id },
        { $pull: { productImg: { $nin: img } } },
      );
    }
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

let updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const imgArr = [];
    req.files.map((item) => {
      imgArr.push(`${process.env.URI_IMAGES}/${item.filename}`);
    });
    const img = {
      productImg: imgArr,
    };
    // Data
    const data = {
      productName: req.body.productName,
      productSale: req.body.productSale,
      productPrice: req.body.productPrice,
      productFinalPrice:
        req.body.productPrice -
        req.body.productPrice * (req.body.productSale / 100),
      productCate: req.body.productCate,
      productGroupCate: req.body.productGroupCate,
      productSize: req.body.productSize.split(","),
      productType: req.body.productType,
      productDes: req.body.productDes,
    };

    await Products.findByIdAndUpdate({ _id: id }, { $push: img });

    await Products.findByIdAndUpdate(id, data);

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

let reviewProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    await Products.findByIdAndUpdate(
      { _id: id },
      { $push: { productVote: req.body } },
    );
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  index,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  reviewProduct,
  deleteProductImg,
};
