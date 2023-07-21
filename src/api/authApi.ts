import axios from "axios";

// const BASE_URL = "/";
const BASE_URL = "https://copilot.tel/";
export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

export const tokenApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
tokenApi.defaults.headers.common["Content-Type"] = "application/json";

// 添加请求拦截器
tokenApi.interceptors.request.use(
  (config) => {
    // do something
    const token = JSON.parse(localStorage.getItem("my-zustand-store") || "")
      ?.state?.token;
    if (token) {
      config.headers = config.headers || {};
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    console.log(222);

    return Promise.reject(error);
  }
);
tokenApi.interceptors.response.use(
  (response) => {
    if (response.data.code === 1003) {
      window.location.href='/login'
      // routes.push({path:'login'})
      // history.push("/login");
      return Promise.resolve(response);
      // localStorage.removeItem("my-zustand-store");
    }
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
