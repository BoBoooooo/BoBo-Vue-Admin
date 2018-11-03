import fetch from '@/utils/fetch'
export function GetUsers(params){
    return fetch({
        url: '/person/list',
        method: 'post',
        params
      })
}

export function DeleteUser(id){
    return fetch({
        url: '/person/delete',
        method: 'post',
        params:{id}
      })
}

export function GetUsersDetail(id){
    return fetch({
        url: '/person/detail',
        method: 'post',
        params:{id}
      })
}

export function SaveNewUsers(data){
    return fetch({
        url: '/person/add',
        method: 'post',
        data
      })
}

export function UpdateUsers(data){
    return fetch({
        url: '/person/update',
        method: 'post',
        data
      })
}


export function getKey(){
    return fetch({
        url: '/person/Getkey',
        method: 'post',       
      })
}


export function getObj(){
    return fetch({
        url: '/person/getObj',
        method: 'post',       
      })
}
