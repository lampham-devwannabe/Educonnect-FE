import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (err) => {
    // Ví dụ: nếu 401 -> chuyển hướng login
    // if (err.response?.status === 401) window.location.href = "/login";
    return Promise.reject(err);
  }
);

export default http;
