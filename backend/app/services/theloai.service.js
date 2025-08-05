const TheLoai = require('../models/TheLoai');

async function create(data) {
  const theloai = new TheLoai(data);
  return theloai.save();
}

async function getAll() {
  return TheLoai.find();
}

async function getById(id) {
  return TheLoai.findById(id);
}

async function update(id, data) {
  return TheLoai.findByIdAndUpdate(id, data, { new: true });
}

async function remove(id) {
  return TheLoai.findByIdAndDelete(id);
}

module.exports = { create, getAll, getById, update, remove };