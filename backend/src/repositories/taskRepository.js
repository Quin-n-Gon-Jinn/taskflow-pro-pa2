import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../../data/tasks.json');

const readTasks = async () => {
  const content = await readFile(DATA_FILE, 'utf-8');
  return JSON.parse(content);
};

const writeTasks = async (tasks) => {
  await writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf-8');
};

const findAll = async () => {
  const tasks = await readTasks();
  return tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const findById = async (id) => {
  const tasks = await readTasks();
  return tasks.find((task) => task.id === id) || null;
};

const create = async (task) => {
  const tasks = await readTasks();
  const now = new Date().toISOString();
  const newTask = {
    id: `tsk-${Date.now()}`,
    ...task,
    createdAt: now,
    updatedAt: now
  };

  tasks.push(newTask);
  await writeTasks(tasks);
  return newTask;
};

const update = async (id, payload) => {
  const tasks = await readTasks();
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return null;
  }

  tasks[index] = {
    ...tasks[index],
    ...payload,
    updatedAt: new Date().toISOString()
  };

  await writeTasks(tasks);
  return tasks[index];
};

const remove = async (id) => {
  const tasks = await readTasks();
  const filtered = tasks.filter((task) => task.id !== id);
  await writeTasks(filtered);
  return true;
};

export default {
  findAll,
  findById,
  create,
  update,
  remove
};
