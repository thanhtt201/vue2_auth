import axios from "axios";
import authApi from "./auth";

const axiosClient = axios.create({
  baseURL: process.env.VUE_APP_URL_API,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = await JSON.parse(localStorage.getItem("accessToken"));
    config.headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return config;
  },
  (err) => {
    console.log("errAxios");
    return Promise.reject(err);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const originalRequest = err.config;
    if (err.response.data.statusCode === 401 && !originalRequest._retry) {
      try {
        const refreshToken = await authApi.refreshToken();
        console.log("refreshToken", refreshToken);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + refreshToken;
      } catch (error) {
        console.log("errorRefreshTOken", error);
      }
      return axiosClient(originalRequest);
    }
    console.log("errReponsso", err);
    return Promise.reject(err);
  }
);

export default axiosClient;
