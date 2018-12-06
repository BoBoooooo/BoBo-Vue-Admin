import fetch from '@/utils/fetch'

export function DeptList(params) {
  return fetch({
    url: '/dept/list',
    method: 'post',
    params,
  })
}

export function DeleteDept(id) {
  return fetch({
    url: '/dept/delete',
    method: 'post',
    params: { id },
  })
}

export function GetDeptDetail(id) {
  return fetch({
    url: '/dept/detail',
    method: 'post',
    params: { id },
  })
}

export function AddDept(data) {
  return fetch({
    url: '/dept/add',
    method: 'post',
    data,
  })
}

export function UpdateDept(data) {
  return fetch({
    url: '/dept/update',
    method: 'post',
    data,
  })
}

export function GetDeptTree() {
  return fetch({
    url: '/dept/pulldeptree',
    method: 'post',
  })
}
