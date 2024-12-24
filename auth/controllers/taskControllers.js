const Task = require("../models/Task");
const getErrorMessages = require("../utils/getErrorMessages");
const createTaskFunction = require("../utils/createTaskFunction");

const createTask = async (req, res) => {
  try {
    const { name, description, dueDate, priority, userId } = req.body;
    const newTask = await createTaskFunction({
      name,
      description,
      dueDate,
      priority,
      userId,
    });
    res.status(201).json(newTask);
  } catch (error) {
    const errors = getErrorMessages(error);
    res.status(400).json({ errors });
  }
};

const getTasks = async (req, res) => {
  try {
    const { userId } = req.query;
    const tasks = await Task.find({ userId }).sort({
      completed: 1,
      createdAt: -1,
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, dueDate, priority, completed, userId } =
      req.body;
    // console.log({ name, description, dueDate, priority, completed, userId });
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { name, description, dueDate, priority, completed, userId },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Tâche supprimée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
