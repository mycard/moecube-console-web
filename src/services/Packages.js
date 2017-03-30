import request from '../utils/request'


export async function create(params) {
  return request(`/packages/${params.id}`, {
    method: 'POST',
    body: JSON.stringify(params)
  })
}
