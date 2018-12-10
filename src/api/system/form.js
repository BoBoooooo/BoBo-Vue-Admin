import fetch from '@/utils/fetch'

export function getTables() {
  return fetch({
    url: '/form/getTables',
    method: 'post',

  })
}

export function getKeyBytableName(tablename) {
  return fetch({
    url: '/form/getKey',
    method: 'post',
    params: {
      tablename,
    },

  })
}

export function GetFormDetail(tablename) {
  return fetch({
    url: '/form/detail',
    method: 'post',

    params: { tablename },
  })
}

export function AddForm(data) {
  return fetch({
    url: '/form/add',
    method: 'post',
    data,
  })
}

export function UpdateForm(data) {
  return fetch({
    url: '/form/update',
    method: 'post',
    data,
  })
}
