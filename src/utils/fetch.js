import axios from 'axios'
import {
  Message,MessageBox
} from 'element-ui'
import store from '../store'
import {
  getToken
} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['auth'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  Promise.reject(error)
})

//respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 400:帐号信息与token不匹配  需要重新拉取token
    if (res.code === 401) {
      MessageBox.alert('帐号信息发生变化，请重新登录', {
        confirmButtonText: '重新登录',
        showCancelButton: false,
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug 
        })
      })
      return Promise.reject(error)

    } else {
      if (res.code !== 200) { //增删改操作的状态返回
   
          Message({
            message: res.message,
            type: 'error',
            duration: 1500
          })
        
      }
      return response;
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
