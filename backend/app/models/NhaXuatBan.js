const mongoose = require("mongoose");
const { Schema } = mongoose;
const nhaXuatBanSchema = new Schema({
  tenNhaXuatBan: {
    type: String,
    required: true,
  },
  namThanhLap: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email không hợp lệ"],
    unique: true,
  },
  soDienThoai: {
    type: String,
    required: false,
    match: [/^[0-9]{10,11}$/, "Số điện thoại phải gồm 10 hoặc 11 số"],
    unique: true,
  },
  website: {
    type: String,
    match: [/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/, "Website không hợp lệ"],
  },
});
nhaXuatBanSchema.pre('findOneAndDelete', async function(next) {
    const id = this.getQuery()._id;
    const count = await mongoose.model('Sach').countDocuments({ nhaXuatBan: id });
    if (count > 0) {
      return next(new Error('Không thể xóa nhà xuất bản đang có sách tham chiếu.'));
    }
    next();
  });
const NhaXuatBan = mongoose.model("NhaXuatBan", nhaXuatBanSchema);
module.exports = NhaXuatBan;
