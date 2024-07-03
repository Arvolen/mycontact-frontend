import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Ensure this matches your backend URL
});

export default api;