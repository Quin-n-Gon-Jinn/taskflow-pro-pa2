export const toTaskDTO = (task) => {
  const today = new Date();
  const dueDate = task.dueDate ? new Date(`${task.dueDate}T23:59:59`) : null;

  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    category: task.category,
    dueDate: task.dueDate,
    isOverdue: Boolean(dueDate && dueDate < today && task.status !== 'done'),
    createdAt: task.createdAt,
    updatedAt: task.updatedAt
  };
};
