import axios from "axios";
import { refreshAccessToken } from "./authService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    const expiration = localStorage.getItem("accessTokenExpiration");

    if (token && expiration && new Date(expiration) < new Date()) {
      const refreshToken = localStorage.getItem("refreshToken");
      const newTokenData = await refreshAccessToken(refreshToken);

      localStorage.setItem("token", newTokenData.accessToken);
      localStorage.setItem(
        "accessTokenExpiration",
        newTokenData.accessTokenExpiration
      );

      config.headers.Authorization = `Bearer ${newTokenData.accessToken}`;
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
