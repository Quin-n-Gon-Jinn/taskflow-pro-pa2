import React, { useEffect, useMemo, useState } from "react";
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import StatCard from './components/StatCard.jsx';
import Toast from './components/Toast.jsx';
import { createTask, deleteTask, getTasks, updateTask } from './services/taskApi.js';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 3200);
  };

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const data = await getTasks({ status: statusFilter, search });
      setTasks(data);
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [statusFilter]);

  const handleSearch = (event) => {
    event.preventDefault();
    loadTasks();
  };

  const handleCreate = async (task) => {
    try {
      setIsSaving(true);
      await createTask(task);
      showToast('Tarea creada correctamente.');
      await loadTasks();
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async (id, task) => {
    try {
      setIsSaving(true);
      await updateTask(id, task);
      showToast('Tarea actualizada correctamente.');
      setSelectedTask(null);
      await loadTasks();
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('¿Deseas eliminar esta tarea?');
    if (!confirmed) return;

    try {
      await deleteTask(id);
      showToast('Tarea eliminada correctamente.');
      await loadTasks();
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleToggleStatus = async (task) => {
    const nextStatus = task.status === 'done' ? 'pending' : 'done';
    await handleUpdate(task.id, { ...task, status: nextStatus });
  };

  const stats = useMemo(() => {
    const total = tasks.length;
    const pending = tasks.filter((task) => task.status === 'pending').length;
    const inProgress = tasks.filter((task) => task.status === 'in_progress').length;
    const done = tasks.filter((task) => task.status === 'done').length;

    return { total, pending, inProgress, done };
  }, [tasks]);

  return (
    <main className="app-shell">
      <Toast message={toast.message} type={toast.type} />

      <section className="hero">
        <div className="hero__content">
          <span className="eyebrow">PA2 · Programación Web</span>
          <h1>TaskFlow Pro</h1>
          <p>
            Aplicación web para gestionar tareas con React, JavaScript, consumo de servicios y capa de servicio implementada con Node.js y Express.
          </p>
          <div className="hero__badges">
            <span>React</span>
            <span>Express</span>
            <span>CRUD</span>
            <span>Service Layer</span>
          </div>
        </div>
        <div className="hero__panel">
          <strong>Arquitectura aplicada</strong>
          <p>Cliente → API Service → Controller → Service → Repository → JSON Data</p>
        </div>
      </section>

      <section className="stats-grid" aria-label="Resumen de tareas">
        <StatCard label="Total" value={stats.total} icon="📌" tone="blue" />
        <StatCard label="Pendientes" value={stats.pending} icon="🕒" tone="orange" />
        <StatCard label="En progreso" value={stats.inProgress} icon="⚡" tone="purple" />
        <StatCard label="Completadas" value={stats.done} icon="✅" tone="green" />
      </section>

      <section className="workspace">
        <TaskForm
          selectedTask={selectedTask}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onCancelEdit={() => setSelectedTask(null)}
          isSaving={isSaving}
        />

        <section className="board">
          <div className="board__header">
            <div className="section-title">
              <span>📋</span>
              <div>
                <p>Tablero</p>
                <h2>Tareas del proyecto</h2>
              </div>
            </div>

            <form className="filters" onSubmit={handleSearch}>
              <input
                type="search"
                placeholder="Buscar por título, descripción o categoría"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="all">Todos</option>
                <option value="pending">Pendientes</option>
                <option value="in_progress">En progreso</option>
                <option value="done">Completadas</option>
              </select>
              <button className="btn btn--primary" type="submit">Buscar</button>
            </form>
          </div>

          {isLoading ? (
            <div className="loader">Cargando tareas...</div>
          ) : (
            <TaskList
              tasks={tasks}
              onEdit={setSelectedTask}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          )}
        </section>
      </section>
    </main>
  );
}

export default App;
