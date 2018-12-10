import fetch from '@/utils/fetch'

export function GetAttenListToday(params) {
  return fetch({
    url: '/Attendance/PullPersonAttenListWithToday',
    method: 'post',
    params,
  })
}

export function DeleteAtten(ID) {
  return fetch({
    url: '/Attendance/DelAtten',
    method: 'post',
    params: { ID },
  })
}

export function AttenDetailByPerson(ID) {
  return fetch({
    url: '/Attendance/PullAttenDetailByPerson',
    method: 'post',
    params: { ID },
  })
}


export function UpdateAtten(data) {
  return fetch({
    url: '/Attendance/SaveAtten',
    method: 'post',
    data,
  })
}


export function SearchPersonByMonth(data) {
  return fetch({
    url: '/Attendance/SearchPersonByMonth',
    method: 'post',
    params: {
      name: data.name,
      month: data.month,
    },

  })
}


export function SearchPersonByYear(data) {
  return fetch({
    url: '/Attendance/SearchPersonByYear',
    method: 'post',
    params: {
      name: data.name,
    },

  })
}
