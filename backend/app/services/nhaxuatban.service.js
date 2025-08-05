// app/services/nxb.service.js
const NhaXuatBan = require('../models/NhaXuatBan');

async function create(data) {
  const nxb = new NhaXuatBan(data);
  return nxb.save();
}

async function getAll() {
  return NhaXuatBan.find();
}

async function getById(id) {
  return NhaXuatBan.findById(id);
}

async function update(id, data) {
  return NhaXuatBan.findByIdAndUpdate(id, data, { new: true });
}

async function remove(id) {
  return NhaXuatBan.findByIdAndDelete(id);
}

module.exports = { create, getAll, getById, update, remove };
