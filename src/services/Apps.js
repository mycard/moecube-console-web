import * as qs from 'qs'
import request from '../utils/request'

export async function fetch(params) {

  return request(`/v1/apps?${qs.stringify(params)}`)
}

export async function create(params) {
  return request(`/v1/app/${params.id}`, {
    method: 'POST',
    body: JSON.stringify(params)
  })
}

export async function update(params) {
  return request(`/v1/app/${params.id}`, {
    method: 'PATCH',
    body: JSON.stringify(params)
  })
}
