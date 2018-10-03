import fetch from '@/utils/fetch'

export function login(username, password) {
  return fetch({
    url: '/login/login',
    method: 'post',
    params: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return fetch({
    url: '/login/userinfo',
    method: 'post',
    // data: {
    //   auth:token
    // }
  })
}

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  })
}


export function ChangePassword(data){
  return fetch({
      url: '/login/changepassword',
      method: 'post',
      params:data
    })
}