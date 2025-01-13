const Project = require("../../models/Project");
const Task = require("../../models/Task");
const { createNotificationFunction } = require("./notificationsUtils");

const createTaskFunction = async (taskData) => {
  try {
    const { name, description, dueDate, priority, userId, projectId } =
      taskData;
    const task = new Task({
      name,
      description,
      dueDate,
      priority,
      userId,
      projectId,
    });
    const savedTask = await task.save();
    await createNotificationFunction({ userId });
    if (projectId) {
      await Project.findByIdAndUpdate(
        projectId,
        { $push: { tasks: savedTask._id } },
        { new: true }
      );
    }
    return savedTask;
  } catch (error) {
    console.error("Error while creating a task:", error);
    throw error;
  }
};

const getTasksFunction = async ({ id }) => {
  try {
    const tasks = await Task.find({ userId: id }).sort({
      dueDate: 1,
      completed: 1,
      createdAt: -1,
    });
    return tasks;
  } catch (error) {
    throw error;
  }
};

module.exports = { createTaskFunction, getTasksFunction };
