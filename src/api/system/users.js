import fetch from '@/utils/fetch'
export function GetUsers(){
    return fetch({
        url: '/admin/pulluserlist',
        method: 'post'
      })
}

export function DeleteUser(ID){
    return fetch({
        url: '/admin/DelUser',
        method: 'post',
        params:{ID}
      })
}

export function GetUsersDetail(ID){
    return fetch({
        url: '/admin/PullUsersDetail',
        method: 'post',
        params:{ID}
      })
}

export function SaveNewUsers(data){
    return fetch({
        url: '/admin/SaveNewUsers',
        method: 'post',
        data
      })
}

export function UpdateUsers(data){
    return fetch({
        url: '/admin/UpdateUsers',
        method: 'post',
        data
      })
}

