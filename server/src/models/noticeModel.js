const mongoose = require("mongoose");

let noticeSchema = new mongoose.Schema(
  {
    noticeContent: String,
    isRead: String,
    noticeTime: Date,
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: null },
    deletedAt: { type: Number, default: null },
  },
  {
    versionKey: false,
  },
);

let Notice = mongoose.model("Notice", noticeSchema, "notice");

module.exports = Notice;
