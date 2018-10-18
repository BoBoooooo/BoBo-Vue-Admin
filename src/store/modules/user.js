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

import 'nprogress/nprogress.css' // Progress 进度条样式



const user = {
  state: {
    token: getToken(),
    name: '', //用户昵称名
    realname: '', //用户登录名
  },

  mutations: {
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
          location.reload()
          resolve()

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
