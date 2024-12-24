const Task = require("../models/Task");

const createTaskFunction = async (taskData) => {
  try {
    const { name, description, dueDate, priority, userId } = taskData;
    const task = new Task({
      name,
      description,
      dueDate,
      priority,
      userId,
    });
    const savedTask = await task.save();
    return savedTask;
  } catch (error) {
    console.error("Error while creating a task:", error);
    throw error;
  }
};

module.exports = createTaskFunction;
