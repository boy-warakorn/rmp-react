import axios from "axios";

export const AxiosService = axios.create({
  baseURL: "http://localhost:1234/api",
});

AxiosService.interceptors.request.use(
  async function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
      config.headers["Accept-Language"] = localStorage.getItem("i18nextLng");
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
