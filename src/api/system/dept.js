import fetch from '@/utils/fetch'
export function List(){
    return fetch({
        url: '/dept/list',
        method: 'post'
      })
}

export function Delete(id){
    return fetch({
        url: '/dept/delete',
        method: 'post',
        params:{id}
      })
}

export function Detail(id){
    return fetch({
        url: '/dept/detail',
        method: 'post',
        params:{id}
      })
}

export function Add(data){
    return fetch({
        url: '/dept/add',
        method: 'post',
        data
      })
}

export function Update(data){
    return fetch({
        url: '/dept/update',
        method: 'post',
        data
      })
}

export function GetDeptTree(){
    return fetch({
        url: '/dept/pulldeptree',
        method: 'post',
      })
}