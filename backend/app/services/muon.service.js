// app/services/muon.service.js

const TheoDoiMuonSach   = require('../models/TheoDoiMuonSach');
const Sach              = require('../models/Sach');
const DanhSachDanhDau   = require('../models/DanhSachDanhDau');

/**
 * Tạo mới yêu cầu mượn
 */
async function createRequest(userId) {
  // 1) Lấy danh sách đánh dấu của user
  const fav = await DanhSachDanhDau.findOne({ docGia: userId });
  if (!fav || fav.sachs.length === 0) {
    throw new Error("Không có sách nào trong danh sách đánh dấu.");
  }

  const items = fav.sachs.map((i) => ({
    sach: i.sach,
    soLuong: i.soLuong || 1, // fallback nếu thiếu
  }));

  // 2) Lấy các phiếu mượn đang hoạt động
  const active = await TheoDoiMuonSach.find({
    docGia: userId,
    trangThai: { $in: ["Chờ duyệt", "Đã được duyệt", "Đang mượn"] },
  });

  let totalActive = 0;
  const perBookCount = {};

  for (const loan of active) {
    for (const it of loan.sachs) {
      totalActive += it.soLuong;
      perBookCount[it.sach.toString()] =
        (perBookCount[it.sach.toString()] || 0) + it.soLuong;
    }
  }

  // 3) Validate từng sách
  let totalRequested = 0;
  for (const { sach: bookId, soLuong } of items) {
    totalRequested += soLuong;

    const already = perBookCount[bookId.toString()] || 0;
    if (already + soLuong > 3) {
      throw new Error("Không được mượn quá 3 quyển cùng một đầu sách.");
    }

    const book = await Sach.findById(bookId);
    if (!book) {
      throw new Error(`Sách ID=${bookId} không tồn tại.`);
    }
    if (soLuong > book.soLuongTon) {
      throw new Error(`Tồn kho không đủ cho "${book.tenSach}".`);
    }
  }

  if (totalActive + totalRequested > 5) {
    throw new Error("Không được mượn quá 5 quyển cùng lúc.");
  }

  // 4) Tạo phiếu
  const now = new Date();
  const phieu = new TheoDoiMuonSach({
    docGia: userId,
    sachs: items,
    ngayGuiYeuCau: now,
    trangThai: "Chờ duyệt",
  });
  const saved = await phieu.save();

  // 5) Xóa khỏi danh sách đánh dấu sau khi tạo yêu cầu mượn
  const ids = items.map((i) => i.sach.toString());
  fav.sachs = fav.sachs.filter((i) => !ids.includes(i.sach.toString()));
  await fav.save();

  return saved;
}


/**
 * Lấy toàn bộ yêu cầu mượn của user (độc giả)
 */
async function getRequests(userId, trangThai) {
  const filter = { docGia: userId };
  if (trangThai) {
    filter.trangThai = trangThai;
  }

  return TheoDoiMuonSach.find(filter)
    .populate("sachs.sach")
    .populate("docGia")
    .sort({ ngayGuiYeuCau: -1 });
}

/**
 * Lấy chi tiết 1 phiếu, kèm tiền phạt nếu quá hạn
 */
async function getById(id) {
  const loan = await TheoDoiMuonSach
    .findById(id)
    .populate('docGia')
    .populate('sachs.sach');
  if (!loan) return null;

  // Tính tiền phạt
  const fine = calculateFine(loan);
  const result = loan.toObject();
  result.fine = fine;
  return result;
}

/**
 * Tính tiền phạt 2.000đ/ngày nếu quá hạn 2 tháng từ ngàyMuon
 */
function calculateFine(loan) {
  if (loan.trangThai !== 'Đang mượn') return 0;
  const start = loan.ngayMuon || loan.ngayMuon;
  if (!start) return 0;

  const due = new Date(start);
  due.setMonth(due.getMonth() + 2);

  const today = new Date();
  if (today <= due) return 0;

  const daysLate = Math.ceil((today - due) / (1000*60*60*24));
  return daysLate * 2000;
}

//đối với nhân viên
async function getAllRequests() {
    return TheoDoiMuonSach
      .find()
      .populate('docGia')
      .populate('sachs.sach');
  }
  

  async function getRequestsByStatus(trangThai) {
    return TheoDoiMuonSach
      .find({ trangThai })
      .populate('docGia')
      .populate('sachs.sach');
  }
module.exports = { createRequest, getRequests, getById, getAllRequests, getRequestsByStatus};
