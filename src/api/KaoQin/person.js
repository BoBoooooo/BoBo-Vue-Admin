import fetch from '@/utils/fetch'
export function GetUsers(params){
    return fetch({
        url: '/Person/pulluserlist',
        method: 'post',
        params
      })
}

export function DeleteUser(ID){
    return fetch({
        url: '/Person/DelUser',
        method: 'post',
        params:{ID}
      })
}

export function GetUsersDetail(ID){
    return fetch({
        url: '/Person/PullUsersDetail',
        method: 'post',
        params:{ID}
      })
}

export function SaveNewUsers(data){
    return fetch({
        url: '/Person/SaveNewUsers',
        method: 'post',
        data
      })
}

export function UpdateUsers(data){
    return fetch({
        url: '/Person/UpdateUsers',
        method: 'post',
        data
      })
}


export function ChangePassword(data){
    return fetch({
        url: '/Person/ChangePassword',
        method: 'post',
        data
      })
}