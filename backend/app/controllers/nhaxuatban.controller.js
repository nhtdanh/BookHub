const nxbService = require('../services/nhaxuatban.service');
const ApiError = require('../api-error');

async function create(req, res, next) {
  try {
    const result = await nxbService.create(req.body);
    res.status(201).json({ code: 0, msg: 'Đã thêm NXB', data: result });
  } catch (err) {
    next(new ApiError(400, err.message));
  }
}

async function getAll(req, res, next) {
  try {
    const result = await nxbService.getAll();
    res.json({ code: 0, msg: 'OK', data: result });
  } catch (err) {
    next(new ApiError(500, err.message));
  }
}

async function getById(req, res, next) {
  try {
    const result = await nxbService.getById(req.params.id);
    if (!result) return next(new ApiError(404, 'Không tìm thấy NXB'));
    res.json({ code: 0, msg: 'OK', data: result });
  } catch (err) {
    next(new ApiError(500, err.message));
  }
}

async function update(req, res, next) {
  try {
    const result = await nxbService.update(req.params.id, req.body);
    if (!result) return next(new ApiError(404, 'Không tìm thấy NXB'));
    res.json({ code: 0, msg: 'Đã cập nhật NXB', data: result });
  } catch (err) {
    next(new ApiError(400, err.message));
  }
}

async function remove(req, res, next) {
  try {
    const result = await nxbService.remove(req.params.id);
    if (!result) return next(new ApiError(404, 'Không tìm thấy NXB'));
    res.json({ code: 0, msg: 'Đã xóa NXB', data: result });
  } catch (err) {
    next(new ApiError(400, err.message));
  }
}

module.exports = { create, getAll, getById, update, remove };