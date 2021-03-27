var News = require("../models/newsModel");

let index = async (req, res) => {
  try {
    const news = await News.find();
    return res.status(200).json(news);
  } catch (error) {
    return res.status(500).json(error);
  }
};

let countNewsView = async (req, res) => {
  try {
    const id = req.params.id;

    await News.findByIdAndUpdate(id, { $inc: { newView: 1 } });
    return res.status(200).send({ message: "success" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

let getNewsById = async (req, res) => {
  try {
    const id = req.params.id;
    const news = await News.findById(id);
    return res.status(200).json(news);
  } catch (error) {
    return res.status(500).json(error);
  }
};
let getCate = async (req, res) => {
  try {
    const cate = req.params.cate;
    const news = await News.find({ newCate: cate });
    return res.status(200).json(news);
  } catch (error) {
    return res.status(500).json(error);
  }
};

let postNews = async (req, res) => {
  const imgArr = [];
  req.files.map((item) => {
    imgArr.push(`${process.env.URI_IMAGES}/${item.filename}`);
  });

  const data = {
    newImg: imgArr[0],
    newTime: req.body.newTime,
    newCate: req.body.newCate,
    newTitle: req.body.newTitle,
    newContent: req.body.newContent,
    newView: 0,
  };
  await News.create(data);
  return res.status(200).send({ message: "success" });
};

let deleteNews = async (req, res) => {
  try {
    await News.findByIdAndRemove({ _id: req.params.id });
    return res.status(200).send({ message: "success" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

let deleteImg = async (req, res) => {
  try {
    const id = req.params.id;

    if (req.body.deleteImgId) {
      const deletedData = {
        newImg: "",
      };
      await News.findByIdAndUpdate(id, deletedData);
    }
    return res.status(200).send({ message: "success" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

let updateNews = async (req, res) => {
  try {
    const id = req.params.id;
    if (req.files.length > 0) {
      const imgArr = [];
      req.files.map((item) => {
        imgArr.push(`${process.env.URI_IMAGES}/${item.filename}`);
      });
      await News.findByIdAndUpdate(id, { $set: { newImg: imgArr[0] } });
    }

    const data = {
      newTime: req.body.newTime,
      newCate: req.body.newCate,
      newTitle: req.body.newTitle,
      newContent: req.body.newContent,
      newTime: req.body.newTime,
    };
    await News.findByIdAndUpdate(id, data);
    res.status(200).send({ message: "success" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  index,
  getNewsById,
  getCate,
  deleteNews,
  updateNews,
  postNews,
  deleteImg,
  countNewsView,
};
