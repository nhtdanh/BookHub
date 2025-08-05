// app/app/routers/index.js
const express      = require('express');
const authRouter   = require('./auth.router');
const docgiaRouter = require('./docgia.router');
const sachRouter   = require('./sach.router');
const danhdauRouter= require('./danhdau.router');
const muonRouter   = require('./muon.router');
const adminRouter  = require('./admin.router');
const nhaxuatbanRouter = require('./nhaxuatban.router');
const theloaiRouter = require('./theloai.router');
const router = express.Router();

router.use('/auth', authRouter);
router.use('/docgia', docgiaRouter);
router.use('/sach', sachRouter);
router.use('/danhdau', danhdauRouter);
router.use('/muon', muonRouter);
router.use('/admin', adminRouter);
router.use('/nhaxuatban', nhaxuatbanRouter);
router.use('/theloai', theloaiRouter);
module.exports = router;
