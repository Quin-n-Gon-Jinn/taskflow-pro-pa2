const API_URL = 'http://localhost:3000/api/tasks';

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'No se pudo completar la operación.');
  }

  return data;
};

export const getTasks = async ({ status = 'all', search = '' } = {}) => {
  const params = new URLSearchParams();

  if (status && status !== 'all') params.append('status', status);
  if (search.trim() !== '') params.append('search', search.trim());

  const url = params.toString() ? `${API_URL}?${params.toString()}` : API_URL;
  const response = await fetch(url);
  return handleResponse(response);
};

export const createTask = async (task) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });

  return handleResponse(response);
};

export const updateTask = async (id, task) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });

  return handleResponse(response);
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  return handleResponse(response);
};
