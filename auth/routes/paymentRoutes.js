const express = require("express");
const {
  createPayment,
  capturePayment,
} = require("../controllers/paypalController");
const {
  getPayments,
  updateStatus,
} = require("../controllers/paymentController");
const verifyAdminToken = require("../middlewares/verifyAdminToken");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/payments/paypal/create-order", createPayment);
router.post("/payments/paypal/capture-order", capturePayment);

router.put("/payment/:id", updateStatus);
router.get("/payments/:userId", verifyToken, getPayments);
router.get("/payments", verifyAdminToken, getPayments);

module.exports = router;
