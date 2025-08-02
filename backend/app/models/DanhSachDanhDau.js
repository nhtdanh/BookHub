const mongoose = require("mongoose");
const { Schema } = mongoose;
const DocGia = require("./DocGia");
const Sach = require("./Sach");

const danhSachDanhDauSchema = new Schema({
  docGia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DocGia",
    required: true,
  },
  sachs: [{
    sach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sach",
      required: true,
    },
    soLuong: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  }],
});

const DanhSachDanhDau= mongoose.model("DanhSachDanhDau", danhSachDanhDauSchema);
module.exports = DanhSachDanhDau;
