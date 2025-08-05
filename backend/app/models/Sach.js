const mongoose = require("mongoose");
const { Schema } = mongoose;
const NhaXuatBan = require("./NhaXuatBan");
const TheLoai = require("./TheLoai");

const sachSchema = new Schema({
  tenSach: {
    type: String,
    required: true,
  },
  tacGia:{
    type: String,
    required: true,
  },
  nhaXuatBan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NhaXuatBan",
    required: false,
  },
  theLoais: [
    {
      theLoai: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TheLoai",
        required: true,
      },
    },
  ],
  ngayXuatBan: {
    type: Date,
    required: false,
    validate: {
      validator: function (value) {
        return value && value <= new Date();
      },
      message: "Ngày xuất bản không được trong tương lai",
    },
  },
  donGia: {
    type: Number,
    required: true,
  },
  anhBia: { 
    type: [String], 
    default: ['/public/uploads/covers/default.png'],
},
  soLuongTon: {
    type: Number,
    default: 0,
    min: 0,
  },
  moTa: {
    type: String,
    default: "",
  },
  quocGia: {
    type: String,
  },
  ngonNgu: {
    type: String,
  },
  ngayTao:{
    type: Date,
    default: Date.now,
  },
  ngayCapNhat:{
    type: Date,
    default: Date.now,
  },
});
sachSchema.pre('findOneAndUpdate', function(next) {
    this.set({ ngayCapNhat: Date.now() });
    next();
  });
sachSchema.pre('findOneAndDelete', async function(next) {
  const id = this.getQuery()._id;
  const count = await require('./TheoDoiMuonSach').countDocuments({ 'sachs.sach': id });
  if (count > 0) {
    return next(new Error('Không thể xóa sách đang tồn tại trong phiếu mượn.'));
  }
  next();
});
const Sach = mongoose.model("Sach", sachSchema);
module.exports = Sach;
