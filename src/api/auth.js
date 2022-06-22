import axiosClient from "./axiosClient";

const authApi = {
  signUp(payload) {
    const url = "/auth/register";
    return axiosClient.post(url, payload);
  },
  signIn(payload) {
    const url = "/auth/login";
    return axiosClient.post(url, payload);
  },
  userList() {
    const url = "/users";
    return axiosClient.get(url);
  },
  refreshToken() {
    const url = "/auth/refreshToken";
    return axiosClient.post(url);
  },
};

export default authApi;
