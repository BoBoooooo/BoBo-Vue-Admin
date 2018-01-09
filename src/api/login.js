import fetch from '@/utils/fetch'

export function login(username, password) {
  return fetch({
    url: '/login/post',
    method: 'post',
    data: {
      Username:username,
      Password:password
    }
  })
}

export function getInfo(token) {
  return fetch({
    url: '/admin/userinfo',
    method: 'post',
    data: {
      auth:token
    }
  })
}

export function logout() {
  return fetch({
    url: '/admin/logout',
    method: 'post'
  })
}
