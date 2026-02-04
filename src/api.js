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
// SEO CMS
export const getSEO = (slug) => api.get(`/seo/${slug}`);
export const getAllSEO = () => api.get(`/seo`);
export const updateSEO = (slug, data) => api.put(`/seo/${slug}`, data);
export const deleteSEO = (slug) => api.delete(`/seo/${slug}`);
export const sendFreeEstimate = (data) => api.post("/free-estimate", data);

export default api;
