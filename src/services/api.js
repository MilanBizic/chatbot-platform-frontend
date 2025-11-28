import axios from 'axios';

// Ispravljena Linija 3: Uklonjena je dupla deklaracija 'const API_URL = '
const API_URL = import.meta.env.VITE_API_URL || 'https://chatbot-platform-backend-dh4o.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', null, { params: data }),
  login: (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
  }
};
// NAPOMENA: Vaš originalni kod je završavao ovde, bez vraćanja (return) rezultata
// u funkciji login. Ako funkcija login treba da se završi, dodajte return ispod.
