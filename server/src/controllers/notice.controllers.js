let Notice = require("../models/noticeModel");

let index = async (req, res) => {
  try {
    let notice = await Notice.find();
    return res.status(200).json(notice);
  } catch (error) {
    return res.status(500).json(error);
  }
};

let updateNotice = async (req, res) => {
  try {
    if (req.body.readAll) {
      await Notice.updateMany({ isRead: true });
    }
    if (req.body.idNotice) {
      await Notice.findByIdAndUpdate(id, { $set: { isRead: true } });
    }
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  index,
  updateNotice,
};
