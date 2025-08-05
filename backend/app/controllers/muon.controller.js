const muonService = require('../services/muon.service');
const ApiError = require('../api-error');

// POST /muon
async function create(req, res, next) {
  try {
    const result = await muonService.createRequest(req.user.id);
    res.status(201).json({ code: 0, msg: 'Yêu cầu mượn đã được tạo', data: result });
  } catch (err) {
    next(new ApiError(400, err.message));
  }
}


// GET /muon
async function list(req, res, next) {
  try {
    const result = await muonService.getRequests(
      req.user.id,
      req.query.trangThai
    );
    res.json({ code: 0, msg: "OK", data: result });
  } catch (err) {
    next(new ApiError(500, err.message));
  }
}
// GET /muon/:id
async function detail(req, res, next) {
  try {
    const result = await muonService.getById(req.params.id);
    if (!result) return next(new ApiError(404, 'Không tìm thấy yêu cầu'));
    res.json({ code: 0, msg: 'OK', data: result });
  } catch (err) {
    next(new ApiError(500, err.message));
  }
}

// Admin: lấy tất cả yêu cầu mượn
async function getAllBorrowRequests(req, res, next) {
    try {
      const records = await muonService.getAllRequests();
      res.json({ code: 0, msg: 'OK', data: records });
    } catch (err) {
      next(new ApiError(500, err.message));
    }
  }
  
  // Admin: lấy yêu cầu mượn theo trạng thái
  async function getBorrowRequestsByStatus(req, res, next) {
    try {
      const { trangThai } = req.params;
      const records = await muonService.getRequestsByStatus(trangThai);
      res.json({ code: 0, msg: 'OK', data: records });
    } catch (err) {
      next(new ApiError(500, err.message));
    }
  }
  

module.exports = { create, list, detail, getAllBorrowRequests, getBorrowRequestsByStatus };
