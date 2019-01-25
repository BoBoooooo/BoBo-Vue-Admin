import fetch from '@/utils/fetch'

export function UnitList(params) {
  return fetch({
    url: '/unit/list',
    method: 'post',
    params,
  })
}

export function DeleteUnit(id) {
  return fetch({
    url: '/unit/delete',
    method: 'post',
    params: { id },
  })
}

export function GetUnitDetail(id) {
  return fetch({
    url: '/unit/detail',
    method: 'post',
    params: { id },
  })
}

export function AddUnit(data) {
  return fetch({
    url: '/unit/add',
    method: 'post',
    data,
  })
}

export function UpdateUnit(data) {
  return fetch({
    url: '/unit/update',
    method: 'post',
    data,
  })
}

export function GetUnitTree() {
  return fetch({
    url: '/unit/treelist',
    method: 'post',
  })
}
export function getObj() {
  return fetch({
    url: '/unit/getObj',
    method: 'post',
  })
}
