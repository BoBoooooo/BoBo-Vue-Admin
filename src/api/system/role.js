import fetch from '@/utils/fetch'

export function RoleList(params) {
  return fetch({
    url: '/role/list',
    method: 'post',
    params,
  })
}

export function GetRolesOptions() {
  return fetch({
    url: '/role/list',
    method: 'post',

  })
}

export function DeleteRole(id) {
  return fetch({
    url: '/role/delete',
    method: 'post',
    params: { id },
  })
}

export function GetRoleDetail(id) {
  return fetch({
    url: '/role/detail',
    method: 'post',
    params: { id },
  })
}

export function AddRole(data) {
  return fetch({
    url: '/role/add',
    method: 'post',
    data,
  })
}

export function UpdateRole(data) {
  return fetch({
    url: '/role/update',
    method: 'post',
    data,
  })
}
