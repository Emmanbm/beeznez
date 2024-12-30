const Notification = require("../../models/Notification");

const createNotificationFunction = async (notificationData) => {
  try {
    const { userId, title, message } = notificationData;
    const notification = new Notification({
      userId,
      title: title || "Nouvelle tâche assignée",
      message:
        message ||
        "Une nouvelle tâche vous a été assignée, vous pouvez la voir dans l'onglet Tâches.",
    });
    const savedNotification = await notification.save();
    return savedNotification;
  } catch (error) {
    console.error("Error while creating a notification:", error);
    throw error;
  }
};

const getNotificationsFunction = async ({ id }) => {
  try {
    const notifications = await Notification.find({ userId: id }).sort({
      createdAt: -1,
    });
    return notifications;
  } catch (error) {
    throw error;
  }
};

module.exports = { createNotificationFunction, getNotificationsFunction };
