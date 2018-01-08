import fetch from '@/utils/fetch'
export function GetUsers(){
    return fetch({
        url: '/user/pulluserlist',
        method: 'post'
      })
}

export function DeleteUser(ID){
    return fetch({
        url: '/user/DelUser',
        method: 'post',
        params:{ID}
      })
}

export function GetUsersDetail(ID){
    return fetch({
        url: '/user/PullUsersDetail',
        method: 'post',
        params:{ID}
      })
}

export function SaveNewUsers(data){
    return fetch({
        url: '/user/SaveNewUsers',
        method: 'post',
        data
      })
}

export function UpdateUsers(data){
    return fetch({
        url: '/user/UpdateUsers',
        method: 'post',
        data
      })
}