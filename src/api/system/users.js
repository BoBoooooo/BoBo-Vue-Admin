import fetch from '@/utils/fetch'
export function UsersList(params){
    return fetch({
        url: '/users/list',
        method: 'post',
        params
      })
}

export function DeleteUsers(id){
    return fetch({
        url: '/users/delete',
        method: 'post',
        params:{id}
      })
}

export function GetUsersDetail(id){
    return fetch({
        url: '/users/detail',
        method: 'post',
        params:{id}
      })
}

export function AddUsers(data){
    return fetch({
        url: '/users/add',
        method: 'post',
        data
      })
}

export function UpdateUsers(data){
    return fetch({
        url: '/users/update',
        method: 'post',
        data
      })
}


