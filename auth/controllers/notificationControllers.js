const Notification = require("../models/Notification");
const User = require("../models/User");
const {
  createNotificationFunction,
} = require("../utils/utilsControllers/notificationsUtils");

const createNotification = async (req, res) => {
  try {
    const { userId, title, message } = req.body;
    const savedNotification = await createNotificationFunction({
      userId,
      title,
      message,
    });
    // const notification = new Notification({ userId, message, title });
    // const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    const errors = Object.values(error.errors).map(({ path, message }) => ({
      message,
      path,
    }));
    res
      .status(500)
      .json({ errors, message: "Erreur lors de l'ajout de la notification" });
  }
};

const createNotificationForAdmin = async (req, res) => {
  try {
    const { title, message } = req.body;
    const users = await User.find({ role: "admin" });

    await Promise.all(
      users.map((user) =>
        createNotificationFunction({ userId: user._id, title, message })
      )
    );
    // const notification = new Notification({ userId: "admin", message, title });
    // const savedNotification = await notification.save();
    res.status(200).json({
      message:
        "Votre message a bien été envoyé au service technique de BeeZnez.",
    });
  } catch (error) {
    const errors = Object.values(error.errors).map(({ path, message }) => ({
      message,
      path,
    }));
    res
      .status(500)
      .json({ errors, message: "Erreur lors de l'envoi du message" });
  }
};

const getNotifications = async (req, res) => {
  try {
    const { id } = req.auth;
    const notifications = await Notification.find({ userId: id }).sort({
      createdAt: -1,
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const { id: userId } = req.auth;
    await Notification.updateMany({ userId, _id }, { $set: { isRead: true } });
    res.status(200).json({ message: "Notification marquée comme lue" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const { id: userId } = req.auth;
    await Notification.deleteOne({ userId, _id });
    res.status(200).json({ message: "Notification supprimée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNotification,
  createNotificationForAdmin,
  getNotifications,
  markAsRead,
  deleteNotification,
};
