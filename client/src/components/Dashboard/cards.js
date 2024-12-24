const commonCards = [];

export const cards = {
  admin: [{ title: "Nombre d'utilisateurs", value: 5 }],
};

export const getCards = (
  card = {
    nbrUsers: 100,
    nbrCompanies: 14,
    nbrNewUsers: 19,
    nbrNewCompanies: 9,
    //   --------------
    nbrEmployees: 7,
    nbrCurrentProjects: 3,
    nbrProjetcs: 12,
    nbrPendingLeave: 6,
    nextHoliday: new Date("January 3, 2024").toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
    }),
    paymentsMade: "308000€",
    lasPaymentsMade: "1500€",
    //   --------------
    nbrTasksToFinish: 1,
    lastPaymentsReceived: "1500€",
  }
) => {
  const {
    nbrUsers,
    nbrCompanies,
    nbrNewUsers,
    nbrNewCompanies,
    nbrEmployees,
    nbrCurrentProjects,
    nbrProjetcs,
    nbrPendingLeave,
    nextHoliday,
    paymentsMade,
    lasPaymentsMade: lastPaymentsMade,
    nbrTasksToFinish,
    lastPaymentsReceived,
  } = card;
  return {
    admin: [
      { title: "Nombre d'utilisateurs", value: nbrUsers },
      { title: "Nombre d'entreprises", value: nbrCompanies },
      { title: "Nouveaux utilisateurs", value: nbrNewUsers },
      { title: "Nouvelles entreprises", value: nbrNewCompanies },
      { title: "Prochain jour de congé", value: nextHoliday, isDate: true },
    ],
    manager: [
      { title: "Nombre d'employés", value: nbrEmployees },
      { title: "Projets en cours", value: nbrCurrentProjects },
      { title: "Projets finis", value: nbrProjetcs - nbrCurrentProjects },
      { title: "Somme de paiements effectué", value: paymentsMade },
      { title: "Dernier paiement effectué", value: lastPaymentsMade },
      { title: "Congés en attente", value: nbrPendingLeave },
      { title: "Prochain jour de congé", value: nextHoliday, isDate: true },
    ],
    employee: [
      { title: "Nombre de tâches assignées", value: nbrCurrentProjects },
      { title: "Nombre de projets assignés", value: nbrTasksToFinish },
      { title: "Dernier paiement reçu", value: lastPaymentsReceived },
      { title: "Prochain jour de congé", value: nextHoliday, isDate: true },
    ],
    freelance: [
      { title: "Nombre de tâches assignées", value: nbrCurrentProjects },
      { title: "Nombre de projets assignés", value: nbrTasksToFinish },
      { title: "Dernier paiement reçu", value: lastPaymentsReceived },
      { title: "Prochain jour de congé", value: nextHoliday, isDate: true },
    ],
  };
};
