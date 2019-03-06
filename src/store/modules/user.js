/*
 * @Author: BoBo
 * @Date: 2018-12-21 14:34:50
 * @Description: 登录，登出，修改密码，获取用户信息
 * 存储的变量有当前用户token,用户名以及昵称
 */
import {
  login,
  logout,
  getInfo,
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken,
} from '@/utils/auth'
import {
  ChangePassword,
} from '@/api/login'

import 'nprogress/nprogress.css' // Progress 进度条样式


const user = {
  state: {
    token: getToken(),
    name: '', // 用户昵称名
    realname: '', // 用户登录名
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
    },
  },

  actions: {
    // 登录
    async Login({
      commit,
    }, userInfo) {
      const username = userInfo.username.trim()

      try {
        const response = await login(username, userInfo.password)

        const data = response
        if (data.code === 200) {
          setToken(data.data)
          commit('SET_TOKEN', data.data)
          return data
        }

        commit('SET_TOKEN', '')
        removeToken()

        return Promise.reject(data.message)
      } catch (err) {
        return Promise.reject(err)
      }
    },

    // 获取用户信息
    async  GetInfo({
      commit,
      state,
    }) {
      try {
        const response = await getInfo(state.token)
        const { data } = response
        commit('SET_NAME', data.RealName)
        commit('SET_REALNAME', data.UserName)
        return data
      } catch (error) {
        return Promise.reject(error)
      }
    },


    //  登出
    FedLogOut({
      commit,
    }) {
      return new Promise((resolve) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          window.location.reload()
          resolve()
        })
      })
    },

    async  ChangePassword({
      commit,
      state,
    }, NewPassword) {
      await ChangePassword({
        username: state.realname,
        password: NewPassword,
      })
      await this.FedLogOut({ commit })
    },
  },
}

export default user
