require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const config = require("../app/config");
const DocGia = require("../app/models/DocGia");
const NhanVien = require("../app/models/NhanVien");

async function createAdmin() {
  await mongoose.connect(config.db.uri);
  console.log("Đã kết nối MongoDB");

  const hashedPassword = await bcrypt.hash("matkhau123", 10);

  const docGia = new DocGia({
    hoTen: "Nguyễn Hoàng Tiến Danh",
    ngaySinh: new Date("2004-06-26"),
    gioiTinh: "Nam",
    diaChi: "Cần Thơ",
    email: "tiendanh123@gmail.com",
    soDienThoai: "0912345678",
    tenDangNhap: "admin123",
    matKhau: hashedPassword,
    vaiTro: "Nhân viên",
    trangThai: "Hoạt động",
  });

  const savedDocGia = await docGia.save();

  const nhanVien = new NhanVien({
    docGia: savedDocGia._id,
    chucVu: "Quản lý thư viện",
    heSoLuong: 4.0,
  });

  await nhanVien.save();

  console.log("Admin nhân viên đã được tạo!");
  process.exit(0);
}

createAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
