const adminService = require('../services/admin.service');
const ApiError = require('../api-error');

async function duyet(req, res, next) {
  try {
    const result = await adminService.duyetYeuCau(req.params.id, req.body.duyet);
    res.json({ code: 0, msg: 'Yêu cầu được xử lý', data: result });
  } catch (err) {
    next(new ApiError(400, err.message));
  }
}

async function capNhat(req, res, next) {
  try {
    const result = await adminService.capNhatTrangThai(req.params.id, req.body.trangThai);
    res.json({ code: 0, msg: 'Cập nhật thành công', data: result });
  } catch (err) {
    next(new ApiError(400, err.message));
  }
}

module.exports = { duyet, capNhat };