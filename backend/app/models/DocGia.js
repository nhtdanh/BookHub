const mongoose = require("mongoose");
const { Schema } = mongoose;

const docGiaSchema = new Schema({
  hoTen: {
    type: String,
    required: true,
  },
  ngaySinh: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        const currentDate = new Date();
        const minDate = new Date("1900-01-01");
        return value <= currentDate && value >= minDate;
      },
      message: "Ngày sinh phải hợp lệ và không được trong tương lai",
    },
  },
  gioiTinh: {
    type: String,
    enum: ["Nam", "Nữ", "Khác"],
    required: true,
  },
  diaChi: {
    type: String,
    required: true,
  },
  soDienThoai: {
    type: String,
    required: false,
    match: [/^[0-9]{10,11}$/, "Số điện thoại phải gồm 10 hoặc 11 số"],
    unique: true,
  },
  email: {
    type: String,
    required: true, // Trường SoDienThoai không bắt buộc
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email không hợp lệ",
    ],
    unique: true,
  },
  tenDangNhap: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    match: [
      /^[a-zA-Z0-9_]+$/,
      "Tên đăng nhập chỉ chứa chữ cái, số và dấu gạch dưới",
    ],
    unique: true,
  },
  matKhau: {
    type: String,
    required: true,
    minlength: 6, // Độ dài tối thiểu
  },
  ngayTao: {
    type: Date,
    default: Date.now,
  },
  anhDaiDien: {
    type: String,
    default: "/public/uploads/avatars/default.jpg",
    match: [
      /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))?$/,
      "Đường dẫn ảnh không hợp lệ",
    ],
  },
  vaiTro: {
    type: String,
    enum: ["Độc giả", "Nhân viên"],
    default: "Độc giả",
  },
  trangThai: {
    type: String,
    enum: ["Hoạt động", "Vô hiệu hóa"],
    default: "Hoạt động",
  },
  ngayTao: {
    type: Date,
    default: Date.now,
  },
  ngayCapNhat: {
    type: Date,
    default: Date.now,
  },
});
docGiaSchema.pre("findOneAndUpdate", function (next) {
  this.set({ ngayCapNhat: Date.now() });
  next();
});
const DocGia = mongoose.model("DocGia", docGiaSchema);
module.exports = DocGia;
