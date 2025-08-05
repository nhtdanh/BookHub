const danhdauService = require('../services/danhdau.service');
const ApiError = require('../api-error');

// POST /danhdau
async function add(req, res, next) {
  try {
    const result = await danhdauService.addFavorite(req.user.id, req.body.sachId);
    res.json({ code: 0, msg: 'Đã thêm vào danh sách đánh dấu', data: result });
  } catch (err) {
    next(new ApiError(400, err.message));
  }
}

// GET /danhdau
async function list(req, res, next) {
  try {
    const result = await danhdauService.getFavorites(req.user.id);
    res.json({ code: 0, msg: 'OK', data: result });
  } catch (err) {
    next(new ApiError(500, err.message));
  }
}

// DELETE /danhdau/:sachId
async function remove(req, res, next) {
  try {
    const result = await danhdauService.removeFavorite(req.user.id, req.params.sachId);
    res.json({ code: 0, msg: 'Đã xóa khỏi danh sách đánh dấu', data: result });
  } catch (err) {
    next(new ApiError(500, err.message));
  }
}

// PATCH /danhdau/:sachId
async function updateQty(req, res, next) {
  try {
    const result = await danhdauService.updateQuantity(
      req.user.id,
      req.params.sachId,
      req.body.soLuong
    );
    res.json({ code: 0, msg: 'Đã cập nhật số lượng', data: result });
  } catch (err) {
    next(new ApiError(400, err.message));
  }
}

module.exports = { add, list, remove, updateQty };
