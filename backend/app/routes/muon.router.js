const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const muonCtrl = require("../controllers/muon.controller");
const authorize = require("../middlewares/authorize");
// Tất cả route mượn đều cần authenticate
router.use(authenticate);

router.post("/", muonCtrl.create);
router.get("/", muonCtrl.list);
router.get("/:id", muonCtrl.detail);

router.get("/list/all", authorize("Nhân viên"), muonCtrl.getAllBorrowRequests);

router.get(
  "/status/:trangThai",
  authorize("Nhân viên"),
  muonCtrl.getBorrowRequestsByStatus
);
module.exports = router;
