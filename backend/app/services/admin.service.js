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

  // Khi trả sách, trước hết phải cộng lại tồn kho
  if (trangThaiMoi === "Đã trả") {
    // Với mỗi sách trong yêu cầu, lấy model Sach và cộng lại
    for (const item of yeuCau.sachs) {
      const sach = await Sach.findById(item.sach);
      if (sach) {
        sach.soLuongTon = (sach.soLuongTon || 0) + item.soLuong;
        await sach.save();
      }
    }
  }

  yeuCau.trangThai = trangThaiMoi;

  if (trangThaiMoi === "Đang mượn") {
    yeuCau.ngayMuon = new Date();
    const ngayHetHan = new Date(yeuCau.ngayMuon);
    ngayHetHan.setMonth(ngayHetHan.getMonth() + 2);
    yeuCau.ngayHetHan = ngayHetHan;
  }

  if (trangThaiMoi === "Đã trả") {
    yeuCau.ngayTra = new Date();
    if (yeuCau.ngayHetHan) {
      const ngayTra = new Date(yeuCau.ngayTra);
      const hetHan = new Date(yeuCau.ngayHetHan);
      ngayTra.setHours(0, 0, 0, 0);
      hetHan.setHours(0, 0, 0, 0);
      const msTre = ngayTra - hetHan;
      const soNgayTre = Math.floor(msTre / (1000 * 60 * 60 * 24));
      yeuCau.tienPhat = Math.max(0, soNgayTre) * 2000;
    } else {
      yeuCau.tienPhat = 0;
    }
  }

  return yeuCau.save();
}

module.exports = { duyetYeuCau, capNhatTrangThai };
