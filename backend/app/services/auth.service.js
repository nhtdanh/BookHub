const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DocGia = require('../models/DocGia');
const config = require('../config');

async function register(data) {
  const { tenDangNhap, email, matKhau } = data;
  if (await DocGia.findOne({ $or: [{ tenDangNhap }, { email }] })) {
    throw new Error('Username or email already taken');
  }
  const hash = await bcrypt.hash(matKhau, 10);
  const user = new DocGia({ ...data, matKhau: hash });
  await user.save();
  return user;
}


async function login(tenDangNhap, matKhau) {
  const user = await DocGia.findOne({ tenDangNhap }).lean();
  if (!user) throw new Error("User not found");

  const ok = await bcrypt.compare(matKhau, user.matKhau);
  if (!ok) throw new Error("Invalid password");

  const payload = { id: user._id, role: user.vaiTro };
  const token = jwt.sign(payload, config.app.jwtSecret, {
    expiresIn: config.app.jwtExpiresIn,
  });

  // Xóa mật khẩu khỏi user trước khi trả về
  delete user.matKhau;

  return { user, token };
}

module.exports = { register, login };