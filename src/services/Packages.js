import request from '../utils/request'


export async function add(params) {
  return request(`/v1/package`, {
    method: 'POST',
    body: JSON.stringify(params)
  })
}

export async function patch(params) {
  return request(`/v1/package`, {
    method: 'PATCH',
    body: JSON.stringify(params)
  })
}

export async function fetch(params) {
  return request(`/v1/packages?appId=${params.appId}`, {
    method: 'GET',
  })
}

export async function urlUpload(params) {
  return request('/v1/upload/packageUrl', {
    method: 'POST',
    body: JSON.stringify(params)
  })
}

export async function del(params) {
  return request(`/v1/package`, {
    method: 'DELETE',
    body: JSON.stringify(params)
  })
}
