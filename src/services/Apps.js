import request from '../utils/request'

export async function fetch() {
  return request(`/apps`)
}

export async function create(params) {
  return request(`/apps/${params.id}`, {
    method: 'POST',
    body: JSON.stringify(params)
  })
}

export async function update(params) {
  return request(`/apps/${params.id}`, {
    method: 'PATCH',
    body: JSON.stringify(params)
  })
}