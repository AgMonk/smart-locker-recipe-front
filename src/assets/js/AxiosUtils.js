import axios from "axios";
import Vue from "vue";

export const request = axios.create({
  baseURL: '/api',
  timeout: 10 * 1000,
  method: "post",
  //跨域时携带凭证
  withCredentials: true,
  //不跟随重定向
  maxRedirects: 0,
});

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  let data = response.data;
  if (data.code === 2000) {
    return data.data;
  } else {
    Vue.prototype.$message.error(data.message);
    console.log(data)
    throw data.data
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


