const TheoDoiMuonSach = require("../models/TheoDoiMuonSach");
const Sach = require("../models/Sach");

async function duyetYeuCau(id, chapNhan) {
  console.log("ID nhận vào:", id);
  console.log("chapNhan:", chapNhan);
  const yeuCau = await TheoDoiMuonSach.findById(id);
  if (!yeuCau) throw new Error("Yêu cầu không tồn tại");
  if (yeuCau.trangThai !== "Chờ duyệt")
    throw new Error("Chỉ được duyệt yêu cầu đang chờ");

  if (!chapNhan) {
    yeuCau.trangThai = "Không được duyệt";
    return yeuCau.save();
  }

  for (const item of yeuCau.sachs) {
    const sach = await Sach.findById(item.sach);
    if (!sach || sach.soLuongTon < item.soLuong) {
      throw new Error(`Sách không đủ tồn kho: ${item.sach}`);
    }
    sach.soLuongTon -= item.soLuong;
    await sach.save();
  }

  yeuCau.trangThai = "Đã được duyệt";
  return yeuCau.save();
}

async function capNhatTrangThai(id, trangThaiMoi) {
  const mucChoPhep = ["Đang mượn", "Đã trả"];
  const yeuCau = await TheoDoiMuonSach.findById(id);
  if (!yeuCau) throw new Error("Không tìm thấy yêu cầu");

  if (!mucChoPhep.includes(trangThaiMoi))
    throw new Error("Trạng thái không hợp lệ");
  yeuCau.trangThai = trangThaiMoi;
  if (trangThaiMoi === "Đang mượn") yeuCau.ngayMuon = new Date();
  if (trangThaiMoi === "Đã trả") yeuCau.ngayTra = new Date();

  return yeuCau.save();
}

module.exports = { duyetYeuCau, capNhatTrangThai };
