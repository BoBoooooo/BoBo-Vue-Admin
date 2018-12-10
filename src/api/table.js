import fetch from '@/utils/fetch'

// eslint-disable-next-line import/prefer-default-export
export function getList(params) {
  return fetch({
    url: '/table/list',
    method: 'get',
    params,
  })
}
