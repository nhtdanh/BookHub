const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const nhaxuatbanCtrl = require('../controllers/nhaxuatban.controller');

router.get('/', nhaxuatbanCtrl.getAll);
router.get('/:id', nhaxuatbanCtrl.getById);

router.use(authenticate, authorize('Nhân viên'));
router.post('/', nhaxuatbanCtrl.create);
router.patch('/:id', nhaxuatbanCtrl.update);
router.delete('/:id', nhaxuatbanCtrl.remove);

module.exports = router;