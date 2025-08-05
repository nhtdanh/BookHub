const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const adminCtrl = require('../controllers/admin.controller');

router.use(authenticate, authorize('Nhân viên'));

router.patch('/duyet/:id', adminCtrl.duyet);
router.patch('/capNhat/:id', adminCtrl.capNhat);

module.exports = router;