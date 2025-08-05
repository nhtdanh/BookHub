const DanhSachDanhDau = require('../models/DanhSachDanhDau');

async function addFavorite(userId, sachId) {
    let list = await DanhSachDanhDau.findOne({ docGia: userId });
    if (!list) list = new DanhSachDanhDau({ docGia: userId, sachs: [] });
  
    // 1. Check số lượng đầu sách <=5
    if (list.sachs.length >= 5) {
      throw new Error('Chỉ được đánh dấu tối đa 5 cuốn sách.');
    }
    // 2. Nếu đã có rồi, không thêm nữa
    if (list.sachs.some(item => item.sach.toString() === sachId)) {
      throw new Error('Sách đã có trong danh sách đánh dấu.');
    }
    // Thêm với soLuong = 1
    list.sachs.push({ sach: sachId, soLuong: 1 });
    await list.save();
    return list;
  }

async function getFavorites(userId) {
  return DanhSachDanhDau.findOne({ docGia: userId }).populate('sachs.sach');
}

async function removeFavorite(userId, sachId) {
  const list = await DanhSachDanhDau.findOne({ docGia: userId });
  if (list) {
    list.sachs = list.sachs.filter(item => item.sach.toString() !== sachId);
    await list.save();
  }
  return list;
}

async function updateQuantity(userId, sachId, soLuong) {
    if (soLuong < 1 || soLuong > 3) {
      throw new Error('Mỗi sách chỉ được đánh dấu với số lượng từ 1 đến 3.');
    }
    const list = await DanhSachDanhDau.findOne({ docGia: userId });
    if (!list) throw new Error('Chưa có danh sách đánh dấu.');
    const item = list.sachs.find(i => i.sach.toString() === sachId);
    if (!item) throw new Error('Không tìm thấy sách trong danh sách.');
    item.soLuong = soLuong;
    await list.save();
    return list;
  }

module.exports = { addFavorite, getFavorites, removeFavorite, updateQuantity };
