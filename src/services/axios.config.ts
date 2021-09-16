import { baseApiUrl } from "@configs/api";
import axios from "axios";

export const AxiosService = axios.create({
  baseURL: baseApiUrl,
});

AxiosService.interceptors.request.use(
  async function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
