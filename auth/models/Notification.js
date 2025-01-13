const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "L'id de l'utilisateur est requis"],
  },
  title: {
    type: String,
    required: [true, "Le titre de la notification est requis"],
  },
  message: { type: String, required: [true, "Le message est requis"] },
  type: {
    type: String,
    enum: ["info", "success", "error", "warning"],
    default: "info",
  },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
