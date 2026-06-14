import taskRepository from '../repositories/taskRepository.js';
import { toTaskDTO } from '../dto/taskDTO.js';

const allowedStatus = ['pending', 'in_progress', 'done'];
const allowedPriority = ['low', 'medium', 'high'];

const validateTaskPayload = (payload, partial = false) => {
  const title = payload.title?.trim();
  const description = payload.description?.trim();

  if (!partial || payload.title !== undefined) {
    if (!title || title.length < 3) {
      const error = new Error('El título debe tener al menos 3 caracteres.');
      error.statusCode = 400;
      throw error;
    }
  }

  if (!partial || payload.description !== undefined) {
    if (!description || description.length < 5) {
      const error = new Error('La descripción debe tener al menos 5 caracteres.');
      error.statusCode = 400;
      throw error;
    }
  }

  if (payload.status !== undefined && !allowedStatus.includes(payload.status)) {
    const error = new Error('El estado de la tarea no es válido.');
    error.statusCode = 400;
    throw error;
  }

  if (payload.priority !== undefined && !allowedPriority.includes(payload.priority)) {
    const error = new Error('La prioridad de la tarea no es válida.');
    error.statusCode = 400;
    throw error;
  }

  if (payload.dueDate !== undefined && payload.dueDate !== '') {
    const date = new Date(payload.dueDate);
    if (Number.isNaN(date.getTime())) {
      const error = new Error('La fecha límite no tiene un formato válido.');
      error.statusCode = 400;
      throw error;
    }
  }
};

const listTasks = async ({ status, search } = {}) => {
  const tasks = await taskRepository.findAll();
  let filtered = [...tasks];

  if (status && status !== 'all') {
    filtered = filtered.filter((task) => task.status === status);
  }

  if (search && search.trim() !== '') {
    const value = search.trim().toLowerCase();
    filtered = filtered.filter((task) =>
      task.title.toLowerCase().includes(value) ||
      task.description.toLowerCase().includes(value) ||
      task.category.toLowerCase().includes(value)
    );
  }

  return filtered.map(toTaskDTO);
};

const findTask = async (id) => {
  const task = await taskRepository.findById(id);
  if (!task) {
    const error = new Error('La tarea solicitada no existe.');
    error.statusCode = 404;
    throw error;
  }
  return toTaskDTO(task);
};

const createTask = async (payload) => {
  validateTaskPayload(payload);

  const task = {
    title: payload.title.trim(),
    description: payload.description.trim(),
    status: payload.status || 'pending',
    priority: payload.priority || 'medium',
    category: payload.category?.trim() || 'General',
    dueDate: payload.dueDate || ''
  };

  const created = await taskRepository.create(task);
  return toTaskDTO(created);
};

const updateTask = async (id, payload) => {
  await findTask(id);
  validateTaskPayload(payload, true);

  const updated = await taskRepository.update(id, {
    ...payload,
    title: payload.title?.trim(),
    description: payload.description?.trim(),
    category: payload.category?.trim() || payload.category
  });

  return toTaskDTO(updated);
};

const deleteTask = async (id) => {
  await findTask(id);
  return taskRepository.remove(id);
};

export default {
  listTasks,
  findTask,
  createTask,
  updateTask,
  deleteTask
};
