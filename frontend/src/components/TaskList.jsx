import React from "react";
import EmptyState from './EmptyState.jsx';
import TaskCard from './TaskCard.jsx';

function TaskList({ tasks, onEdit, onDelete, onToggleStatus }) {
  if (!tasks.length) {
    return <EmptyState />;
  }

  return (
    <section className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </section>
  );
}

export default TaskList;
