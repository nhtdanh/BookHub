const DocGia = require('../models/DocGia');


async function getProfile(id) {
  return DocGia.findById(id).select('-matKhau');
}
async function updateProfile(id, data) {
  return DocGia.findByIdAndUpdate(id, { ...data, ngayCapNhat: Date.now() }, { new: true, runValidators: true }).select('-matKhau');
}

async function updateAvatar(userId, filename) {
    const pathAvatar = filename ? `/public/uploads/avatars/${filename}` : '/public/uploads/avatars/default-avatar.png';
    return DocGia.findByIdAndUpdate(userId, { anhDaiDien: pathAvatar, ngayCapNhat: Date.now() }, { new: true });
  }
module.exports = { getProfile, updateProfile, updateAvatar};