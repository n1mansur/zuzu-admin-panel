import { request } from './api'

export const getAll = (slug) => request.get(slug)
export const deleteBranch = (slug, id) => request.delete(`${slug}/${id}`)
