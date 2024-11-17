import axios from 'shared/api/axios'
import { Compare, Sprint, SprintData } from '../types/Sprint'

export function getSprint() {
  return axios.get<Sprint[]>(`/api/v1/sprint/all`, {
    withCredentials: true,
  })
}

export function getCompare(id: number) {
  return axios.get<Compare>(`/api/v1/sprint/${id}/compare`, {
    withCredentials: true,
  })
}

export function getResultSprints(ids: Array<number>) {
  return axios.post<SprintData[]>(`/api/v1/sprint/result`, ids, {
    withCredentials: true,
  })
}

export function postFiles(files: File[]) {
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('files', file)
  })

  return axios.post('/api/v1/upload', formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
