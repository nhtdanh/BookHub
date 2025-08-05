const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const danhdauCtrl = require('../controllers/danhdau.controller');

router.use(authenticate);

router.post('/', danhdauCtrl.add);
router.get('/', danhdauCtrl.list);
router.patch('/:sachId', danhdauCtrl.updateQty);
router.delete('/:sachId', danhdauCtrl.remove);

module.exports = router;
