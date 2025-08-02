const mongoose = require("mongoose");
const { Schema } = mongoose;
const Sach = require("./Sach");
const DocGia = require("./DocGia");

const theoDoiMuonSachSchema = new Schema({
  sachs: [
    {
      sach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sach",
        required: true,
      },
      soLuong: {
        type: Number,
        default: 1,
        min: 1,
      },
    },
  ],
  docGia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DocGia",
    require: true,
  },
  ngayMuon: {
    type: Date,
    require: true,
  },
  ngayTra: {
    type: Date,
  },
  ngayGuiYeuCau: {
    type: Date,
    require: true,
  },
  ngayHetHan: {
    type: Date,
    require: true,
  },

  trangThai: {
    type: String,
    enum: [
      "Chờ duyệt",
      "Đã được duyệt",
      "Không được duyệt",
      "Đang mượn",
      "Đã trả",
    ],
    default: "Chờ duyệt",
  },
  soLuong: {
    type: Number,
    default: 1,
    min: 1,
  },
});

const TheoDoiMuonSach = mongoose.model(
  "TheoDoiMuonSach",
  theoDoiMuonSachSchema
);
module.exports = TheoDoiMuonSach;
