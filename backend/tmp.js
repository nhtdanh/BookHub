// tmp.js
require('dotenv').config();
const mongoose = require('mongoose');
const DocGia = require('./app/models/DocGia');
mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const u = await DocGia.find();
  console.log('DocGia count:', u.length);
  process.exit();
});