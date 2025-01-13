const Task = require("../models/Task");
const getErrorMessages = require("../utils/getErrorMessages");
const { createTaskFunction } = require("../utils/utilsControllers/tasksUtils");

const createTask = async (req, res) => {
  try {
    const { name, description, dueDate, priority, userId, projectId } =
      req.body;
    const newTask = await createTaskFunction({
      name,
      description,
      dueDate,
      priority,
      userId,
      projectId,
    });
    res.status(201).json({ task: newTask });
  } catch (error) {
    const errors = getErrorMessages(error);
    res.status(400).json({ errors });
  }
};

const getTasks = async (req, res) => {
  try {
    const { userId, projectId } = req.query;
    let findObject = null;
    if (projectId && userId) {
      findObject = {
        $and: [{ userId }, { projectId }],
      };
    } else if (userId) {
      findObject = { userId };
    } else if (projectId) {
      findObject = { projectId };
    }
    if (!findObject) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir un filtre de recherche" });
    }
    const tasks = await Task.find(findObject).sort({
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
    res.status(200).json({ task: updatedTask });
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
