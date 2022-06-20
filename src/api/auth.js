import { axiosClient } from "./axiosClient";

const authApi = {
  signUp(payload) {
    const url = "/auth/register";
    return axiosClient.post(url, payload);
  },
  signIn(payload) {
    const url = "/auth/login";
    return axiosClient.post(url, payload);
  },
};

export default authApi;
