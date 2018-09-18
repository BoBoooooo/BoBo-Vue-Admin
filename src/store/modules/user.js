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
} from '@/api/system/users'
const user = {
  state: {
    token: getToken(),
    name: '', //用户昵称名
    realname:'',//用户登录名
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },

    SET_ROLES: (state, roles) => {
      state.roles = roles
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
          const data = response.data
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

          const data = response.data.data
          console.log(data);
          commit('SET_ROLES', data.Roles)
          commit('SET_NAME', data.RealName)
          commit('SET_REALNAME', data.UserName)
          
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },


    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])

        removeToken()
        resolve()
      })
    },

    ChangePassword({
      commit,
      state
    }, NewPassword) {
      return new Promise((resolve, reject) => {
        ChangePassword({
          UserName: state.realname,
          Password: NewPassword
        }).then(response => {
          const data = response.data
          if (data.Success != false) {
            resolve(data)
          } else {
            reject(data.Message)

          }
        }).catch(error => {
          reject(error)
        })

      })
    }
  }
}

export default user
