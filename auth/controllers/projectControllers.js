const Project = require("../models/Project");
const getErrorMessages = require("../utils/getErrorMessages");
const createTaskFunction = require("../utils/createTaskFunction");

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
    res.status(201).json(savedProject);
  } catch (error) {
    const errors = getErrorMessages(error);
    res.status(400).json({ errors });
  }
};

const getProjects = async (req, res) => {
  try {
    const { companyId, userId, role } = req.query;
    if (role === "admin") {
      const projects = await Project.find()
        .sort({
          completed: 1,
          createdAt: -1,
        })
        .populate("tasks users companyId");
      return res.status(200).json(projects);
    }
    if (role === "manager") {
      const projects = await Project.find({ companyId })
        .sort({
          completed: 1,
          createdAt: -1,
        })
        .populate("tasks users");
      return res.status(200).json(projects);
    }
    if (role === "employee" || role === "freelance") {
      const projects = await Project.find({ users: userId })
        .sort({
          completed: 1,
          createdAt: -1,
        })
        .populate("tasks users");
      return res.status(200).json(projects);
    }
    return res.status(404).json({ message: "Not Found !" });
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
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.status(200).json({ message: "Projet supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, dueDate, priority, userId } = req.body;
    const newTask = await createTaskFunction({
      name,
      description,
      dueDate,
      priority,
      userId,
    });

    const project = await Project.findByIdAndUpdate(
      id,
      { $push: { tasks: newTask._id } },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ error: "Aucun projet trouvé avec cet id" });
    }
    res.status(200).json({ project, task: newTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  addTask,
};
