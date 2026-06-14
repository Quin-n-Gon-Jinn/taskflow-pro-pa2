import taskService from '../services/taskService.js';

const getTasks = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const tasks = await taskService.listTasks({ status, search });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.findTask(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const newTask = await taskService.createTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const updatedTask = await taskService.updateTask(req.params.id, req.body);
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(200).json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};

export default {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
