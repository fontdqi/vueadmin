import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useTokenStore } from '@/stores/tokenStore'
const tokenStore = useTokenStore();

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,

  timeout: 5000
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = tokenStore.accessToken
   
      config.headers.Authorization = `Bearer ${token}`

    return config
    // console.log(config);
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // console.log(response.data.status)
    const{data} = response.data
    if (response.data.status === 'success') {
      ElMessage({
        message: response.data.message,
        type: 'success',
      })
      return data

      // console.log(data);
    } else {
      ElMessage.error(response.data.message)
      return Promise.reject(response.data.message)
    }
    // return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    error.response && ElMessage.error(error.response.data)
    return Promise.reject(error.response.data)
  }
)
export default service
