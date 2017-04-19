import request from '../utils/request'


export async function add(params) {
  return request(`/packages`, {
    method: 'POST',
    body: JSON.stringify(params)
  })
}

export async function patch(params) {
  return request(`/packages`, {
    method: 'PATCH',
    body: JSON.stringify(params)
  })
}

export async function fetch(params) {
  return request(`/packages/manage?appId=${params.appId}`, {
    method: 'GET',
  })
}

export async function urlUpload(params) {
  return request('/upload/packageUrl', {
    method: 'POST',
    body: JSON.stringify(params)
  })
}

export async function del(params) {
  return request(`/packages`, {
    method: 'DELETE',
    body: JSON.stringify(params)
  })
}
