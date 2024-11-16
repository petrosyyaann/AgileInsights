import axios from 'shared/api/axios'
import { Sprint, SprintData } from '../types/Sprint'

export function getSprint() {
  return axios.get<Sprint[]>(`/api/v1/sprint/all`, {
    withCredentials: true,
  })
}

export function getResultSprints(ids: Array<number>) {
  return axios.post<SprintData[]>(`/api/v1/sprint/result`, ids, {
    withCredentials: true,
  })
}
