import axios, { AxiosError } from 'axios'
import { service } from '@/service'
import type { App } from 'vue'

export type ApiService = ReturnType<typeof service>

interface ApiError {
  status: number
  message: string
  code: string
}

export const apiPlugin = {
  install: (app: App) => {

    const axiosInstance = axios.create({
      baseURL: 'https://api.spacexdata.com',
      timeout: 25000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // axiosInstance.interceptors.request.use((config) => {

    // })

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiError>) => {
        return Promise.reject(error)
      },
    )

    const $api = service(axiosInstance)

    app.config.globalProperties.$api = $api
    app.provide('api', $api)
  },
}
