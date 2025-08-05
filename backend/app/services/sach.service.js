const Sach = require("../models/Sach");

// Lấy danh sách sách, hỗ trợ search theo tên và phân trang
async function getAll({ search, page = 1, limit = 10 }) {
  const query = {};
  if (search) query.tenSach = { $regex: search, $options: "i" };
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Sach.find(query).skip(skip).limit(limit),
    Sach.countDocuments(query),
  ]);
  return { items, total };
}

// Lấy chi tiết 1 sách bởi id, populate publisher và genres
async function getById(id) {
  return Sach.findById(id).populate("nhaXuatBan").populate("theLoais.theLoai");
}

// Tạo mới sách
async function createBook(data) {
  const book = new Sach(data);
  return book.save();
}

// Cập nhật sách
async function updateBook(id, data) {
  return Sach.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

// Xóa sách
async function deleteBook(id) {
  return Sach.findByIdAndDelete(id);
}

async function updateCover(id, filename) {
  const coverPath = filename
    ? `/public/uploads/covers/${filename}`
    : "/public/uploads/covers/default-cover.png";
  return Sach.findByIdAndUpdate(
    id,
    { anhBia: coverPath, ngayCapNhat: Date.now() },
    { new: true }
  );
}

module.exports = { getAll, getById, createBook, updateBook, deleteBook, updateCover };
