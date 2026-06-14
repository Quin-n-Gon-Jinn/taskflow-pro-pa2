import React from "react";

function EmptyState() {
  return (
    <section className="empty-state">
      <span>🗂️</span>
      <h3>No hay tareas para mostrar</h3>
      <p>Crea una nueva tarea o cambia los filtros para revisar otros resultados.</p>
    </section>
  );
}

export default EmptyState;
