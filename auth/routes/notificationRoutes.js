const express = require("express");
const {
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification,
  createNotificationForAdmin,
} = require("../controllers/notificationControllers");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/notifications/admin", createNotificationForAdmin);
router.get("/notifications", verifyToken, getNotifications);
router.post("/notifications", verifyToken, createNotification);
router.put("/notifications/:id", verifyToken, markAsRead);
router.delete("/notifications/:id", verifyToken, deleteNotification);

module.exports = router;
