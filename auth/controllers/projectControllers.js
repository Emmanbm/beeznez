const Project = require("../models/Project");
const Task = require("../models/Task");
const getErrorMessages = require("../utils/getErrorMessages");
const {
  createNotificationFunction,
} = require("../utils/utilsControllers/notificationsUtils");
const {
  getProjectsFunction,
} = require("../utils/utilsControllers/projectsUtils");
// const { createTaskFunction } = require("../utils/utilsControllers/tasksUtils");

const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      dueDate,
      startDate,
      users,
      companyId,
      priority,
      createdBy,
    } = req.body;
    // console.log({
    //   name,
    //   description,
    //   dueDate,
    //   startDate,
    //   users,
    //   companyId,
    //   priority,
    //   createdBy,
    // });

    const project = new Project({
      name,
      description,
      dueDate,
      startDate,
      users,
      companyId,
      priority,
      createdBy,
    });
    const savedProject = await project.save();
    await Promise.all(
      users.map((userId) => createNotificationFunction({ userId }))
    );
    res.status(201).json(savedProject);
  } catch (error) {
    const errors = getErrorMessages(error);
    res.status(400).json({ errors });
  }
};

const getProjects = async (req, res) => {
  try {
    const { companyId, userId, role, withPopulate } = req.query;
    const projects = await getProjectsFunction({
      companyId,
      userId,
      role,
      withPopulate,
    });
    return res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      dueDate,
      startDate,
      users,
      companyId,
      priority,
      createdBy,
    } = req.body;

    // console.log({name,description,dueDate,startDate,users,companyId,priority,createdBy});
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        name,
        description,
        dueDate,
        startDate,
        users,
        companyId,
        priority,
        createdBy,
      },
      { new: true }
    ).populate("tasks users companyId");
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    await Task.deleteMany({ projectId: id });
    res.status(200).json({ message: "Projet supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const addTask = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description, dueDate, priority, userId } = req.body;
//     const newTask = await createTaskFunction({
//       name,
//       description,
//       dueDate,
//       priority,
//       userId,
//     });

//     const project = await Project.findByIdAndUpdate(
//       id,
//       { $push: { tasks: newTask._id } },
//       { new: true }
//     ).populate("tasks users companyId");
//     if (!project) {
//       return res.status(404).json({ error: "Aucun projet trouvé avec cet id" });
//     }
//     res.status(200).json({ project, task: newTask });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  // addTask,
};
