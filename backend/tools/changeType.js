const mongoose = require("mongoose");
const Sach = require("../app/models/Sach"); // đường dẫn tới model của bạn

(async () => {
  await mongoose.connect("mongodb://localhost:27017/BookHub");

  const sachs = await Sach.find({ anhBia: { $type: "array" } });

  for (const sach of sachs) {
    if (Array.isArray(sach.anhBia) && sach.anhBia.length > 0) {
      sach.anhBia = sach.anhBia[0]; // lấy phần tử đầu tiên
      await sach.save();
    }
  }

  console.log("✅ Đã cập nhật xong anhBia về kiểu String");
  mongoose.disconnect();
})();
