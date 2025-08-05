const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const sachCtrl = require('../controllers/sach.controller');
const { coverUpload } = require('../middlewares/upload');

// Độc giả và nhân viên đều có thể xem
router.get('/', sachCtrl.getBooks);
router.get('/:id', sachCtrl.getBookById);

// Chỉ nhân viên (role 'Nhân viên') mới CRUD
router.use(authenticate, authorize('Nhân viên'));
router.post('/', sachCtrl.createBook);
router.patch('/:id', sachCtrl.updateBook);
router.delete('/:id', sachCtrl.deleteBook);
router.post('/:id/cover', coverUpload.single('cover'), sachCtrl.uploadCover);

module.exports = router;