import axios from "axios";
import { isAuthenticated } from "../routes/permissionChecker";
import { fetchRefreshToken } from "../services/auth";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(
  (config) => {
    const checkToken = () => {
      return isAuthenticated();
    };

    const token = checkToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
      config.headers["x-access-token"] = token;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default api;
