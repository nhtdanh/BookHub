const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const docgiaCtrl = require('../controllers/docgia.controller');
const { avatarUpload } = require('../middlewares/upload');

router.use(authenticate);
router.get('/me', docgiaCtrl.getMe);
router.patch('/me', docgiaCtrl.updateMe);
router.post('/me/avatar', avatarUpload.single('avatar'), docgiaCtrl.uploadAvatar);  
module.exports = router;
