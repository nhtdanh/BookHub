const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const theloaiCtrl = require('../controllers/theloai.controller');

router.get('/', theloaiCtrl.getAll);
router.get('/:id', theloaiCtrl.getById);

router.use(authenticate, authorize('Nhân viên'));
router.post('/', theloaiCtrl.create);
router.patch('/:id', theloaiCtrl.update);
router.delete('/:id', theloaiCtrl.remove);

module.exports = router;