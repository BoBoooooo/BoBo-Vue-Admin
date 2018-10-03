import fetch from '@/utils/fetch'
export function List(){
    return fetch({
        url: '/menu/list',
        method: 'post'
      })
}

export function Delete(id){
    return fetch({
        url: '/menu/delete',
        method: 'post',
        params:{id}
      })
}

export function Detail(id){
    return fetch({
        url: '/menu/detail',
        method: 'post',
        params:{id}
      })
}

export function Add(data){
    return fetch({
        url: '/menu/add',
        method: 'post',
        data
      })
}

export function Update(data){
    return fetch({
        url: '/menu/update',
        method: 'post',
        data
      })
}

