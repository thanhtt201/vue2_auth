import axios from "axios";

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
    console.log("Reponse");
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosClient;
