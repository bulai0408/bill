import axios from "axios";

const api = axios.create({
  // baseURL: "https://bill.kami.fit",
  // baseURL: "http://localhost:8000",
  // baseURL: "http://192.168.31.150:8000",
  // baseURL: "http://116.232.118.90:8000",
  baseURL: "http://localhost:3001",
});

api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
