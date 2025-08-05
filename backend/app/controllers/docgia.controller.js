const docgiaService = require('../services/docgia.service');
const ApiError = require('../api-error');
const upload = require('../middlewares/upload');


async function getMe(req, res, next) {
  try {
    const user = await docgiaService.getProfile(req.user.id);
    if (!user) throw new ApiError(404, 'Not found');
    res.json({ code: 0, msg: 'OK', data: user });
  } catch (err) {
    next(err);
  }
}

async function updateMe(req, res, next) {
  try {
    const updated = await docgiaService.updateProfile(req.user.id, req.body);
    res.json({ code: 0, msg: 'Updated', data: updated });
  } catch (err) {
    next(new ApiError(400, err.message));
  }
}

async function uploadAvatar(req, res, next) {
    try {
      if (!req.file) {
        return next(new ApiError(400, 'Chưa có file được gửi'));  }
      const updated = await docgiaService.updateAvatar(req.user.id, req.file.filename);
      res.json({ code: 0, msg: 'Đã cập nhật avatar', data: updated });
    } catch (err) {
      next(new ApiError(500, err.message));
    }
  }

module.exports = { getMe, updateMe, uploadAvatar };