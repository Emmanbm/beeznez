const Project = require("../../models/Project");

const createProjectFunction = async (projectData) => {
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
    } = projectData;
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
    return savedProject;
  } catch (error) {
    throw error;
  }
};

const getProjectsFunction = async ({
  companyId,
  userId,
  role,
  withPopulate,
}) => {
  try {
    let findObject = null;
    let withPopulate = true;

    if (role === "admin") {
      findObject = {};
    }
    if (role === "manager" && companyId) {
      findObject = { companyId };
    }
    if ((role === "employee" || role === "freelance") && userId) {
      findObject = { users: userId };
    }

    if (findObject !== null) {
      const projects = Project.find(findObject).sort({
        startDate: -1,
        dueDate: -1,
        createdAt: -1,
      });

      if (withPopulate) {
        return await projects.populate("tasks users companyId");
      } else {
        return await projects;
      }
    }

    return [];
  } catch (error) {
    throw error;
  }
};

module.exports = { createProjectFunction, getProjectsFunction };
