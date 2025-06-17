// utils/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, //
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tambahkan interceptor respons
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect ke landing page saat token invalid/expired
      window.location.href = "/"; // ganti ke route yang kamu inginkan
    }
    return Promise.reject(error);
  }
);
export default api;
