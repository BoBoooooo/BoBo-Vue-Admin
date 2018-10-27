import fetch from '@/utils/fetch'

export function upload(MasterID) {
  return fetch({
    url: '/file/Upload',
    method: 'post',
    contentType : false,
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
export function deletefile(AffixID) {
  return fetch({
    url: '/file/delete',
    method: 'get',
    params:{
      AffixID
    }
  })
}

export function GetFileList(MasterID) {
  return fetch({
    url: '/file/list',
    method: 'post',
    
    params:{
      MasterID
    }
  })
}


