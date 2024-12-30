export interface User {
  id: string;
  role: "admin" | "manager" | "employee" | "freelance";
  [key: string]: any;
}

/**
 * Fonction qui renvoie un tableau d'utilisateurs à affecter une tâche selon le rôle de l'utilisateur courant
 *
 * @param users - Tableau d'utilisateurs
 * @param role - Rôle de l'utilisateur courant
 * @param currentUser - Identifiant de l'utilisateur courant
 *
 * @returns - Tableau d'utilisateurs à affecter la tâche
 */

export const getUsersToAssingTask = (
  users: User[],
  role: "admin" | "manager" | "employee" | "freelance",
  currentUser: User | null = null
): User[] => {
  try {
    let finalResult: User[] = [];
    switch (role) {
      case "admin":
        finalResult = [...users].filter((user) => user.role === "admin");
        break;
      case "manager":
        finalResult = [...users];
        break;
      case "employee":
      case "freelance":
        finalResult = currentUser ? [currentUser] : [];
        break;
      default:
        finalResult = [];
        break;
    }
    return finalResult.map((user) => ({
      id: user.id,
      role: user.role,
      fullName: `${user.firstName} ${user.lastName}`,
    }));
  } catch (error) {
    console.error("Error in getUsersToAssingTask: ", error);
    return [];
  }
};
