const mongoose = require("mongoose");
const { Schema } = mongoose;
const DocGia = require("./DocGia");

const nhanVienSchema = new Schema({
  docGia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DocGia",
    required: true,
  },
  chucVu: {
    type: String,
    enum: [
      "Thủ thư",
      "Trợ lý thư viện",
      "Quản lý thư viện",
      "Nhan viên kiểm kê",
    ],
    required: true,
  },
  heSoLuong: {
    type: Number,
    default: 2.0,
    min: 1.0,    
    max: 10.0,
  },
  ngayBatDauLam: {
    type: Date,
    default: Date.now,
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

const NhanVien = mongoose.model("NhanVien", nhanVienSchema);

module.exports = NhanVien;
