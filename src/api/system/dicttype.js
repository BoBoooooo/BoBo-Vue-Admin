import fetch from '@/utils/fetch'

export function DictTypeList() {
  return fetch({
    url: '/dicttype/list',
    method: 'post',
  })
}

export function DeleteDictType(id) {
  return fetch({
    url: '/dicttype/delete',
    method: 'post',
    params: { id },
  })
}

export function GetDictTypeDetail(id) {
  return fetch({
    url: '/dicttype/detail',
    method: 'post',
    params: { id },
  })
}

export function AddDictType(data) {
  return fetch({
    url: '/dicttype/add',
    method: 'post',
    data,
  })
}

export function UpdateDictType(data) {
  return fetch({
    url: '/dicttype/update',
    method: 'post',
    data,
  })
}

export function GetDictTypeTree() {
  return fetch({
    url: '/dicttype/treelist',
    method: 'post',
  })
}
export function getObj() {
  return fetch({
    url: '/dicttype/getObj',
    method: 'post',
  })
}
