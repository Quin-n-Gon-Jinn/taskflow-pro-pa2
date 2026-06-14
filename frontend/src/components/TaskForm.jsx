import React, { useEffect, useState } from "react";

const initialState = {
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
  category: '',
  dueDate: ''
};

function TaskForm({ selectedTask, onCreate, onUpdate, onCancelEdit, isSaving }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (selectedTask) {
      setForm({
        title: selectedTask.title,
        description: selectedTask.description,
        status: selectedTask.status,
        priority: selectedTask.priority,
        category: selectedTask.category,
        dueDate: selectedTask.dueDate || ''
      });
    } else {
      setForm(initialState);
    }
  }, [selectedTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedTask) {
      await onUpdate(selectedTask.id, form);
    } else {
      await onCreate(form);
    }

    setForm(initialState);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="section-title">
        <span>{selectedTask ? '✏️' : '➕'}</span>
        <div>
          <p>{selectedTask ? 'Editar tarea' : 'Nueva tarea'}</p>
          <h2>{selectedTask ? 'Actualizar actividad' : 'Registrar actividad'}</h2>
        </div>
      </div>

      <label>
        Título
        <input
          name="title"
          type="text"
          placeholder="Ej.: Preparar avance del proyecto"
          value={form.title}
          onChange={handleChange}
        />
      </label>

      <label>
        Descripción
        <textarea
          name="description"
          placeholder="Describe brevemente la tarea"
          value={form.description}
          onChange={handleChange}
        />
      </label>

      <div className="form-grid">
        <label>
          Prioridad
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </label>

        <label>
          Estado
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="pending">Pendiente</option>
            <option value="in_progress">En progreso</option>
            <option value="done">Completada</option>
          </select>
        </label>
      </div>

      <div className="form-grid">
        <label>
          Categoría
          <input
            name="category"
            type="text"
            placeholder="Ej.: Universidad"
            value={form.category}
            onChange={handleChange}
          />
        </label>

        <label>
          Fecha límite
          <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
        </label>
      </div>

      <div className="form-actions">
        <button className="btn btn--primary" type="submit" disabled={isSaving}>
          {isSaving ? 'Guardando...' : selectedTask ? 'Guardar cambios' : 'Crear tarea'}
        </button>
        {selectedTask && (
          <button className="btn btn--ghost" type="button" onClick={onCancelEdit}>
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
