import React from "react";

import { formatDate, priorityIcons, priorityLabels, statusIcons, statusLabels } from '../utils/formatters.js';

function TaskCard({ task, onEdit, onDelete, onToggleStatus }) {
  return (
    <article className={`task-card task-card--${task.status} ${task.isOverdue ? 'task-card--overdue' : ''}`}>
      <div className="task-card__top">
        <span className={`pill pill--${task.priority}`}>
          {priorityIcons[task.priority]} {priorityLabels[task.priority]}
        </span>
        <span className={`pill pill--status-${task.status}`}>
          {statusIcons[task.status]} {statusLabels[task.status]}
        </span>
      </div>

      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <div className="task-card__meta">
        <span>🏷️ {task.category}</span>
        <span>📅 {formatDate(task.dueDate)}</span>
        {task.isOverdue && <span className="overdue">Vencida</span>}
      </div>

      <div className="task-card__actions">
        <button className="btn btn--soft" onClick={() => onToggleStatus(task)}>
          {task.status === 'done' ? 'Reabrir' : 'Completar'}
        </button>
        <button className="btn btn--outline" onClick={() => onEdit(task)}>
          Editar
        </button>
        <button className="btn btn--danger" onClick={() => onDelete(task.id)}>
          Eliminar
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
