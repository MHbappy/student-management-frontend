import axios from "axios";
import { base_url } from "../config/baseUrl";
import { IS_LOGIN } from "../constants/APP_INFO";

const axiosApiInstance = axios.create({
  baseURL: base_url,
  timeout: 3600000,
});

axiosApiInstance.interceptors.request.use(
  async (config) => {
    if (IS_LOGIN) {
      config.headers = {
        Authorization: `Bearer ${IS_LOGIN}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // Code for clearing invalid user

    if (
      [401, 403].includes(error?.response?.status) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      if (IS_LOGIN) {
        localStorage.clear();
        window.location.replace("/")
        window.location.reload();
      }

      // TODO: Apply refresh token mechanism token here
      console.log("Need to work on refresh token!!!");
      // const accessToken = localStorage.getItem('accessToken');
      // axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      return axiosApiInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);
export default axiosApiInstance;
