const mongoose = require("mongoose");
const { Schema } = mongoose;
const Sach = require("./Sach");
const theLoaiSchema = new Schema({
  tenTheLoai: {
    type: String,
    require: true,
  },
  moTa: {
    type: String,
    default: "",
  },
});

const TheLoai = mongoose.model("TheLoai", theLoaiSchema);
module.exports = TheLoai;
