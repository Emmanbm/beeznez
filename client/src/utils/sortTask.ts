type Task = {
  name: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
};

/**
 * Permet de trier les tasks selon un ordre
 * @param tasks - Le tableau de tasks à trier
 */
export const sortTasks = (tasks: Task[]): Task[] => {
  const priorityOrder: { [key in Task["priority"]]: number } = {
    low: 1,
    medium: 2,
    high: 3,
  };
  const completedOrder = {
    true: 1,
    false: 2,
  };

  return [...tasks].sort((a, b) => {
    const completedComparison =
      completedOrder[b.completed.toString()] -
      completedOrder[a.completed.toString()];
    if (completedComparison !== 0) return completedComparison;

    const priorityComparison =
      priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityComparison !== 0) return priorityComparison;

    const dateComparison =
      new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    return dateComparison;
  });
};
