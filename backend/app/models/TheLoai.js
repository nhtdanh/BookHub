const mongoose = require("mongoose");
const { Schema } = mongoose;
const Sach = require("./Sach");
const theLoaiSchema = new Schema({
  tenTheLoai: {
    type: String,
    required: true,
    unique: true
  },
  moTa: {
    type: String,
    default: "",
  },
});

theLoaiSchema.pre('findOneAndDelete', async function(next) {
    const id = this.getQuery()._id;
    const count = await require('./Sach').countDocuments({ 'theLoais.theLoai': id });
    if (count > 0) {
      return next(new Error('Không thể xóa thể loại đang tồn tại trong sách.'));
    }
    next();
  });
const TheLoai = mongoose.model("TheLoai", theLoaiSchema);
module.exports = TheLoai;
