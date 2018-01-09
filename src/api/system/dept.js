import fetch from '@/utils/fetch'
export function GetDepts(){
    return fetch({
        url: '/admin/pulldeptlist',
        method: 'post'
      })
}

export function DeleteDept(ID){
    return fetch({
        url: '/admin/Deldept',
        method: 'post',
        params:{ID}
      })
}

export function GetDeptDetail(ID){
    return fetch({
        url: '/admin/PulldeptDetail',
        method: 'post',
        params:{ID}
      })
}

export function SaveNewDept(data){
    return fetch({
        url: '/admin/SaveNewdept',
        method: 'post',
        data
      })
}

export function UpdateDept(data){
    return fetch({
        url: '/admin/Updatedept',
        method: 'post',
        data
      })
}

export function GetDeptTree(){
    return fetch({
        url: '/admin/PullDeptTree',
        method: 'post',
      })
}