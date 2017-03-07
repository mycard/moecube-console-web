import request from '../utils/request'

export async function fetch() {
  return request(`/apps`)
}

export async function create(params) {
  return request(`/apps/${params.id}`, {
    method: 'post',
    body: JSON.stringify(params)
  })
}