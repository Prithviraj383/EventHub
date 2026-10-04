import axios from "axios";
import { clearAuth, getToken } from "../utils/tokenManager";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://eventhub-s8ck.onrender.com",
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth();
      if (window.location.pathname !== "/login") {
        window.location.assign("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
