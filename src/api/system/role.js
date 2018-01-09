import fetch from '@/utils/fetch'
export function GetRoles(){
    return fetch({
        url: '/admin/pullrolelist',
        method: 'post'
      })
}

export function DeleteRole(ID){
    return fetch({
        url: '/admin/Delrole',
        method: 'post',
        params:{ID}
      })
}

export function GetRoleDetail(ID){
    return fetch({
        url: '/admin/PullroleDetail',
        method: 'post',
        params:{ID}
      })
}

export function SaveNewRole(data){
    return fetch({
        url: '/admin/SaveNewrole',
        method: 'post',
        data
      })
}

export function UpdateRole(data){
    return fetch({
        url: '/admin/Updaterole',
        method: 'post',
        data
      })
}