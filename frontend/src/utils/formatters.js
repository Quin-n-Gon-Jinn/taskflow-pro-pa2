export const statusLabels = {
  pending: 'Pendiente',
  in_progress: 'En progreso',
  done: 'Completada'
};

export const priorityLabels = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta'
};

export const statusIcons = {
  pending: '🕒',
  in_progress: '⚡',
  done: '✅'
};

export const priorityIcons = {
  low: '🟢',
  medium: '🟡',
  high: '🔴'
};

export const formatDate = (date) => {
  if (!date) return 'Sin fecha';

  return new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(`${date}T00:00:00`));
};
