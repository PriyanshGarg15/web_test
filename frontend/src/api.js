import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Set up Axios headers
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export const login = async (userData) => {
  const { data } = await axios.post(`${API_URL}/auth/login`, userData);
  localStorage.setItem('token', data.token);
};

export const signup = async (userData) => {
  await axios.post(`${API_URL}/auth/signup`, userData);
};

export const getNotes = async () => {
  const { data } = await axios.get(`${API_URL}/notes`);
  return data;
};

export const createNote = async (content) => {
  const { data } = await axios.post(`${API_URL}/notes`, { content });
  return data;
};

export const deleteNote = async (id) => {
  await axios.delete(`${API_URL}/notes/${id}`);
};

export const updateNote = async (id, content) => {
  await axios.put(`${API_URL}/notes/${id}`, { content });
};
