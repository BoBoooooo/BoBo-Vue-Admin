import fetch from '@/utils/fetch'

export function loginByUsername(username, password) {
  const data = {
    UserName:username,
    Password:password
  }
  console.log(data);
  return fetch({
    url: '/login/post',
    method: 'post',
    data
  })
}

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

