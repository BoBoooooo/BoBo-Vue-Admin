import fetch from '@/utils/fetch'

export function MenuList(params) {
  return fetch({
    url: '/menu/list',
    method: 'post',
    params,
  })
}

export function MenuTree() {
  return fetch({
    url: '/menu/treelist',
    method: 'post',
  })
}

export function DeleteMenu(id) {
  return fetch({
    url: '/menu/delete',
    method: 'post',
    params: { id },
  })
}

export function GetMenuDetail(id) {
  return fetch({
    url: '/menu/detail',
    method: 'post',
    params: { id },
  })
}

export function AddMenu(data) {
  return fetch({
    url: '/menu/add',
    method: 'post',
    data,
  })
}

export function UpdateMenu(data) {
  return fetch({
    url: '/menu/update',
    method: 'post',
    data,
  })
}

export function GetMenuTreeByRoleID(roleid) {
  return fetch({
    url: '/menu/MenuTreeByRoleID',
    method: 'post',
    params: {
      roleid,
    },
  })
}
