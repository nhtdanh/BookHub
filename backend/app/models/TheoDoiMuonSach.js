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
    required: true,
  },
  ngayMuon: {
    type: Date,
  },
  ngayTra: {
    type: Date,
  },
  ngayGuiYeuCau: {
    type: Date,
    required: true,
  },
  ngayHetHan: {
    type: Date,
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
  tienPhat:{
    type: Number,
    default: 0
  }
});

const TheoDoiMuonSach = mongoose.model(
  "TheoDoiMuonSach",
  theoDoiMuonSachSchema
);
module.exports = TheoDoiMuonSach;
