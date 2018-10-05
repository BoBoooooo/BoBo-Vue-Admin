import fetch from '@/utils/fetch'
export function UsersList(params){
    return fetch({
        url: '/users/list',
        method: 'post',
        params
      })
}

export function DeleteUsers(ID){
    return fetch({
        url: '/users/delete',
        method: 'post',
        params:{ID}
      })
}

export function GetUsersDetail(ID){
    return fetch({
        url: '/users/detail',
        method: 'post',
        params:{ID}
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


