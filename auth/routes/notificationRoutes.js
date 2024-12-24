const express = require("express");
const {
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification,
} = require("../controllers/notificationControllers");
const router = express.Router();

router.get("/notifications", getNotifications);
router.post("/notifications", createNotification);
router.put("/notifications/:id", markAsRead);
router.delete("/notifications/:id", deleteNotification);

module.exports = router;
