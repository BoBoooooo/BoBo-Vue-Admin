import fetch from '@/utils/fetch'

export function DictList(params) {
  return fetch({
    url: '/dict/list',
    method: 'post',
    params,
  })
}

export function DeleteDict(id) {
  return fetch({
    url: '/dict/delete',
    method: 'post',
    params: { id },
  })
}

export function GetDictDetail(id) {
  return fetch({
    url: '/dict/detail',
    method: 'post',
    params: { id },
  })
}

export function AddDict(data) {
  return fetch({
    url: '/dict/add',
    method: 'post',
    data,
  })
}

export function UpdateDict(data) {
  return fetch({
    url: '/dict/update',
    method: 'post',
    data,
  })
}

export function GetDictTree() {
  return fetch({
    url: '/dict/treelist',
    method: 'post',
  })
}
export function getObj() {
  return fetch({
    url: '/dict/getObj',
    method: 'post',
  })
}
