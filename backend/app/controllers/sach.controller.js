const sachService = require("../services/sach.service");
const ApiError = require("../api-error");
const upload = require("../middlewares/upload");
// GET /sach?search=&page=&limit=
async function getBooks(req, res, next) {
  try {
    const result = await sachService.getAll(req.query);
    res.json({ code: 0, msg: "OK", data: result });
  } catch (err) {
    next(new ApiError(500, err.message));
  }
}

// GET /sach/:id
async function getBookById(req, res, next) {
  try {
    const book = await sachService.getById(req.params.id);
    if (!book) return next(new ApiError(404, "Book not found"));
    res.json({ code: 0, msg: "OK", data: book });
  } catch (err) {
    next(new ApiError(500, err.message));
  }
}

// POST /sach (nhân viên)
async function createBook(req, res, next) {
  try {
    const book = await sachService.createBook(req.body);
    res.status(201).json({ code: 0, msg: "Book created", data: book });
  } catch (err) {
    next(new ApiError(400, err.message));
  }
}

// PATCH /sach/:id (nhân viên)
async function updateBook(req, res, next) {
  try {
    const book = await sachService.updateBook(req.params.id, req.body);
    if (!book) return next(new ApiError(404, "Book not found"));
    res.json({ code: 0, msg: "Book updated", data: book });
  } catch (err) {
    next(new ApiError(400, err.message));
  }
}

// DELETE /sach/:id (nhân viên)
async function deleteBook(req, res, next) {
  try {
    await sachService.deleteBook(req.params.id);
    res.json({ code: 0, msg: "Book deleted" });
  } catch (err) {
    next(new ApiError(500, err.message));
  }
}

async function uploadCover(req, res, next) {
  try {
    if (!req.file) return next(new ApiError(400, "Chưa có file ảnh bìa"));
    const updated = await sachService.updateCover(
      req.params.id,
      req.file.filename
    );
    res.json({ code: 0, msg: "Đã cập nhật ảnh bìa", data: updated });
  } catch (err) {
    next(new ApiError(500, err.message));
  }
}
module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook, uploadCover };
