import {
  login,
  logout,
  getInfo
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  ChangePassword
} from '@/api/login'
import { constantRouterMap,asyncRouterMap_Map } from '@/router/index'

import 'nprogress/nprogress.css' // Progress 进度条样式
import Layout from '@/views/layout/Layout'


function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
   if (route.component === 'Layout') {//Layout组件特殊处理
        route.component = Layout
      } else {
        // route.component = ()=>import(`@/views/${route.component}`)

        route.component =asyncRouterMap_Map[route.name]

        
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}



const user = {
  state: {
    token: getToken(),
    name: '', //用户昵称名
    realname: '', //用户登录名
    routers: constantRouterMap,  //登录后 则保存的是全部路由
    addRouters: []    //后台返回的异步路由信息
    
  },

  mutations: {

    SET_ROUTERS: (state, routers) => {

      console.log(routers)
      routers.push({path:"*",redirect:'/404',hidden:true})
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },

 

    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },

    
    SET_REALNAME: (state, realname) => {
      state.realname = realname
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response
          if (data.code == 200) {
            console.log(data.data);
            setToken(data.data)


            commit('SET_TOKEN', data.data)
            resolve(data)

          } else {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            reject(data.message)
          }

        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {

          const data = response.data
          console.log(data);
          commit('SET_NAME', data.RealName)
          commit('SET_REALNAME', data.UserName)
          const asyncrouters  =filterAsyncRouter(data.Routers)
        
          commit('SET_ROUTERS', asyncrouters)
          
          

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },


    //  登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        logout().then(res => {
            commit('SET_TOKEN', '')
            removeToken()
            resolve()
        }).catch(err => {
          reject(err)
        })

      })
    },

    ChangePassword({
      commit,
      state
    }, NewPassword) {
      return new Promise((resolve, reject) => {
        ChangePassword({
          username: state.realname,
          password: NewPassword
        }).then(response => {
          const data = response
            resolve(data)
            logout().then(res => {
              commit('SET_TOKEN', '')
              removeToken()
              resolve()
          }).catch(err => {
            reject(err)
          })
          
        }).catch(error => {
          reject(error)
        })

      })
    }
  }
}

export default user
