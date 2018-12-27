import axios from 'axios'
import {
  Message,
  MessageBox,
} from 'element-ui'
import store from '../store'
import {
  getToken,
  setToken,
  removeToken,
} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // 后端接口路径
  timeout: 15000, // 请求超时时间
})

// request拦截器
service.interceptors.request.use((config) => {
  if (store.getters.token) {
    config.headers.auth = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, (error) => {
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000,
  })
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 401 403 :帐号信息与token不匹配  需要重新拉取token
    if (res.code === 401 || res.code === 403) {
      MessageBox.alert('帐号信息发生变化，请重新登录', {
        confirmButtonText: '重新登录',
        showCancelButton: false,
        type: 'warning',
      }).then(() => {
        setToken('')
        removeToken()
        // eslint-disable-next-line no-restricted-globals
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    } else {
      if (res.code !== 200) { // 后台报错信息显示
        Message({
          message: res.message,
          type: 'error',
          duration: 1500,
        })
      } else if (res.message !== '' && res.message !== null && res.message !== 'SUCCESS') {
        Message({
          message: res.message,
          type: 'success',
          duration: 1500,
        })
      }

      return res
    }
  },
  error => Promise.reject(error),
)

export default service
