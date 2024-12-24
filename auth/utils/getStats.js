const Company = require("../models/Company");
const Project = require("../models/Project");
const Task = require("../models/Task");
const User = require("../models/User");

const getAdminStats = async (userId) => {
  try {
    const users = await User.find();
    const adminUser = await User.findById(userId);
    const nextHoliday = adminUser.nextHoliday;
    const totalNbrUsers = users.length;
    const activeUsers = users.filter((user) => user.isActive).length;
    const adminUsers = users.filter((user) => user.role === "admin").length;
    const managerUsers = users.filter((user) => user.role === "manager").length;
    const employeeUsers = users.filter(
      (user) => user.role === "employee"
    ).length;
    const freelanceUsers = users.filter(
      (user) => user.role === "freelance"
    ).length;
    const companies = await Company.find();
    const totalNbrCompanies = companies.length;
    const stats = [
      {
        title: "Nombre d'utilisateurs",
        value: totalNbrUsers,
      },
      {
        title: "Utilisateurs actifs",
        value: activeUsers,
      },
      {
        title: "Administrateurs",
        value: adminUsers,
      },
      {
        title: "Managers",
        value: managerUsers,
      },
      {
        title: "Employés",
        value: employeeUsers,
      },
      {
        title: "Freelances",
        value: freelanceUsers,
      },
      {
        title: "Nombre d'entreprises",
        value: totalNbrCompanies,
      },
    ];
    if (nextHoliday) {
      stats.push({
        title: "Prochain jour de congé",
        value: nextHoliday,
      });
    }

    return stats;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getManagerStats = async (userId, companyId) => {
  try {
    const employees = await User.find({ companyId });
    const user = await User.findById(userId);
    const nextHoliday = user.nextHoliday;
    const totalManagers = employees.filter(
      (employee) => employee.role === "manager"
    ).length;
    const totalEmployees = employees.filter(
      (employee) => employee.role === "employee"
    ).length;
    const projects = await Project.find({ companyId });
    const projectsInProgress = projects.filter(
      (project) => project.status === "in progress"
    );
    const projectsCompleted = projects.filter(
      (project) => project.status === "completed"
    );
    const stats = [
      {
        title: "Nombre d'employés",
        value: totalEmployees,
      },
      {
        title: "Managers",
        value: totalManagers,
      },
      {
        title: "Tous les projets",
        value: projects.length,
      },
      {
        title: "Projets en cours",
        value: projectsInProgress.length,
      },
      {
        title: "Projets finis",
        value: projectsCompleted.length,
      },
    ];
    if (nextHoliday) {
      stats.push({
        title: "Prochain jour de congé",
        value: nextHoliday,
      });
    }

    return stats;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getEmployeeStats = async (userId) => {
  try {
    const user = await User.findById(userId);
    const nextHoliday = user.nextHoliday;
    const projects = await Project.find({ users: userId });
    const projectsInProgress = projects.filter(
      (project) => project.status === "in progress"
    );
    const projectsCompleted = projects.filter(
      (project) => project.status === "completed"
    );
    const tasks = await Task.find({ userId });
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const stats = [
      {
        title: "Tous les projets",
        value: projects.length,
      },
      {
        title: "Projets en cours",
        value: projectsInProgress.length,
      },
      {
        title: "Projets finis",
        value: projectsCompleted.length,
      },
      {
        title: "Nombre de tâches",
        value: totalTasks,
      },
      {
        title: "Tâches terminées",
        value: completedTasks,
      },
    ];
    if (nextHoliday) {
      stats.push({
        title: "Prochain jour de congé",
        value: nextHoliday,
      });
    }
    return stats;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { getAdminStats, getManagerStats, getEmployeeStats };
