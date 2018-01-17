import fetch from '@/utils/fetch'

export function GetAttenListToday(params){
    return fetch({
        url: '/Attendance/PullPersonAttenListWithToday',
        method: 'post',
        params
      })
}

export function DeleteAtten(ID){
    return fetch({
        url: '/Attendance/DelAtten',
        method: 'post',
        params:{ID}
      })
}

export function AttenDetailByPerson(ID){
    return fetch({
        url: '/Attendance/PullAttenDetailByPerson',
        method: 'post',
        params:{ID}
      })
}

export function SaveNewAtten(data){
    return fetch({
        url: '/Attendance/SaveNewAtten',
        method: 'post',
        data
      })
}

export function UpdateAtten(data){
    return fetch({
        url: '/Attendance/UpdateAtten',
        method: 'post',
        data
      })
}


