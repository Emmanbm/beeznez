const { default: mongoose } = require("mongoose");
const Company = require("../models/Company");
const Payment = require("../models/Payment");
const Project = require("../models/Project");
const Task = require("../models/Task");
const User = require("../models/User");

const getPaymentsAggregate = (userId) => {
  const agg = [
    {
      $facet: {
        // Somme des paiements effectués
        paymentsMade: [
          {
            $match: {
              payerId: new mongoose.Types.ObjectId(userId),
              status: "success",
            },
          },
          {
            $group: {
              _id: null,
              totalMade: { $sum: "$amount" },
            },
          },
        ],
        // Somme des paiements reçus
        paymentsReceived: [
          {
            $match: {
              recipientId: new mongoose.Types.ObjectId(userId),
              status: "success",
            },
          },
          {
            $group: {
              _id: null,
              totalReceived: { $sum: "$amount" },
            },
          },
        ],
      },
    },
    {
      $project: {
        totalMade: { $arrayElemAt: ["$paymentsMade.totalMade", 0] },
        totalReceived: { $arrayElemAt: ["$paymentsReceived.totalReceived", 0] },
      },
    },
  ];
  // console.log(JSON.stringify(agg, null, 2));
  return agg;
};

const getPendingPaymentsAggregate = (userId) => {
  return {
    payerId: new mongoose.Types.ObjectId(userId),
    status: "pending",
  };
};

const getAdminStats = async (userId) => {
  try {
    const [users, adminUser, companies, tasks, payments, pendingPaymentsCount] =
      await Promise.all([
        User.find(),
        User.findById(userId),
        Company.find(),
        Task.find({ userId }),
        Payment.aggregate(getPaymentsAggregate(userId)),
        Payment.countDocuments(getPendingPaymentsAggregate(userId)),
      ]);

    const nextHoliday = adminUser.nextHoliday;
    const activeUsers = users.filter((user) => user.isActive).length;
    const adminUsers = users.filter((user) => user.role === "admin").length;
    const totalNbrCompanies = companies.length;
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;

    const { totalMade = 0, totalReceived = 0 } = payments[0];

    const stats = [
      {
        title: "Utilisateurs actifs",
        value: activeUsers,
      },
      {
        title: "Administrateurs",
        value: adminUsers,
      },
      {
        title: "Entreprises",
        value: totalNbrCompanies,
      },
      {
        title: "Tâches à finir",
        value: totalTasks - completedTasks,
      },
      {
        title: "Tâches terminées",
        value: completedTasks,
      },
      {
        title: "Somme des paiements effectué",
        value: `${totalMade.toFixed(2)} €`,
      },
      {
        title: "Somme des paiements reçus",
        value: `${totalReceived.toFixed(2)} €`,
      },
      {
        title: "Paiements en attente",
        value: pendingPaymentsCount,
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
    const [employees, user, projects, tasks, payments, pendingPaymentsCount] =
      await Promise.all([
        User.find({ companyId }),
        User.findById(userId),
        Project.find({ companyId }),
        Task.find({ userId }),
        Payment.aggregate(getPaymentsAggregate(userId)),
        Payment.countDocuments(getPendingPaymentsAggregate(userId)),
      ]);

    const nextHoliday = user.nextHoliday;
    const totalManagers = employees.filter(
      (employee) => employee.role === "manager"
    ).length;
    const totalEmployees = employees.filter(
      (employee) => employee.role === "employee"
    ).length;
    const projectsInProgress = projects.filter(
      (project) => project.status === "in progress"
    );
    const projectsCompleted = projects.filter(
      (project) => project.status === "completed"
    );
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const { totalMade = 0, totalReceived = 0 } = payments[0];

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
        title: "Projets en cours",
        value: projectsInProgress.length,
      },
      {
        title: "Projets finis",
        value: projectsCompleted.length,
      },
      {
        title: "Tâches à finir",
        value: totalTasks - completedTasks,
      },
      {
        title: "Tâches terminées",
        value: completedTasks,
      },
      {
        title: "Somme des paiements effectué",
        value: `${totalMade.toFixed(2)} €`,
      },
      {
        title: "Somme des paiements reçus",
        value: `${totalReceived.toFixed(2)} €`,
      },
      {
        title: "Paiements en attente",
        value: pendingPaymentsCount,
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
    const [user, projects, tasks, payments, pendingPaymentsCount] =
      await Promise.all([
        User.findById(userId),
        Project.find({ users: userId }),
        Task.find({ userId }),
        Payment.aggregate(getPaymentsAggregate(userId)),
        Payment.countDocuments(getPendingPaymentsAggregate(userId)),
      ]);

    const nextHoliday = user.nextHoliday;
    const projectsInProgress = projects.filter(
      (project) => project.status === "in progress"
    );
    const projectsCompleted = projects.filter(
      (project) => project.status === "completed"
    );
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const { totalMade = 0, totalReceived = 0 } = payments[0];

    const stats = [
      {
        title: "Projets en cours",
        value: projectsInProgress.length,
      },
      {
        title: "Projets finis",
        value: projectsCompleted.length,
      },
      {
        title: "Tâches à finir",
        value: totalTasks - completedTasks,
      },
      {
        title: "Tâches terminées",
        value: completedTasks,
      },
      {
        title: "Somme des paiements effectué",
        value: `${totalMade.toFixed(2)} €`,
      },
      {
        title: "Somme des paiements reçus",
        value: `${totalReceived.toFixed(2)} €`,
      },
      {
        title: "Paiements en attente",
        value: pendingPaymentsCount,
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
