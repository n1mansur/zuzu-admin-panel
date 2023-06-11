import { request } from './api'

export const getAll = ({ slug, value }) =>
  request.get(typeof value == 'string' ? slug + '?name=' + value : slug)
export const create = ({ slug, body }) => request.post(`${slug}`, body)
export const getId = ({ slug, id }) => request.get(`${slug}/${id}`)
export const putBranch = ({ slug, id, body }) =>
  request.put(`${slug}/${id}`, body)
export const deleteBranch = ({ slug, id }) => request.delete(`${slug}/${id}`)
