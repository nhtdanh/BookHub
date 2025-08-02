const mongoose = require("mongoose");
const { Schema } = mongoose;
const NhaXuatBan = require("./NhaXuatBan");
const TheLoai = require("./TheLoai");

const sachSchema = new Schema({
  tenSach: {
    type: String,
    required: true,
  },
  nhaXuatBan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NhaXuatBan",
    required: false,
  },
  theLoais: [
    {
      theLoai: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TheLoai",
        required: true,
      },
    },
  ],
  ngayXuatBan: {
    type: Date,
    required: false,
    validate: {
      validator: function (value) {
        return value && value <= new Date();
      },
      message: "Ngày xuất bản không được trong tương lai",
    },
  },
  donGia: {
    type: Number,
    require: true,
  },
  anhBia: {
    type: String,
    require: true,
  },
  soLuongTon: {
    type: Number,
    default: 0,
    min: 0,
  },
  moTa: {
    type: String,
    default: "",
  },
  quocGia: {
    type: String,
  },
  ngonNgu: {
    type: String,
  },
  ngayTao:{
    type: Date,
    default: Date.now,
  },
  ngayCapNhat:{
    type: Date,
    default: Date.now,
  },
});

const Sach = mongoose.model("Sach", sachSchema);
module.exports = Sach;
