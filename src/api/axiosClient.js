import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.VUE_APP_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});
