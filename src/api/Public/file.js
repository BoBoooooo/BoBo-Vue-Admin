import fetch from '@/utils/fetch'

export function upload(MasterID) {
  return fetch({
    url: '/file/Upload',
    method: 'post',
    params: {
      MasterID
    }
  })
}

export function download(AffixID) {
  return fetch({
    url: '/file/download',
    method: 'get',
    params:{
      AffixID
    }
  })
}


