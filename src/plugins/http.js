import axios from 'axios'

const MyHttpServer = {}


MyHttpServer.install = (Vue) => {
  // 4. 添加实例方法
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  // 逻辑...
  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    // 获去config有什么
    console.log(config)
    // 在发送请求之前做些什么
    // url可以直接用被baseurl拦截了'http://localhost:8888/api/private/v1
    if (config.url !== 'login') {
      const AUTH_TOKEN = localStorage.getItem("token");
      // 因为config里面有header的token
      config.headers.common["Authorization"] = AUTH_TOKEN;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  Vue.prototype.$http = axios

}
export default MyHttpServer