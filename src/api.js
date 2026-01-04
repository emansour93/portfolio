import axios from "axios";

const api = axios.create({
  baseURL: "/api", // Vite proxy handles it locally
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getPage = (slug) => api.get(`/pages/${slug}`);
export const updatePage = (slug, data) => api.put(`/pages/${slug}`, data);

export default api;
