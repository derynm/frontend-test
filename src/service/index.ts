import type { AxiosInstance, AxiosRequestConfig } from 'axios'

type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface BaseResponse<T> {
  data: T
  message: string
  status: number
}

export interface ApiMethods {
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<BaseResponse<T>>
  post: <T>(url: string, config?: AxiosRequestConfig) => Promise<BaseResponse<T>>
  put: <T>(url: string, config?: AxiosRequestConfig) => Promise<BaseResponse<T>>
  delete: <T>(url: string, config?: AxiosRequestConfig) => Promise<BaseResponse<T>>
  patch: <T>(url: string, config?: AxiosRequestConfig) => Promise<BaseResponse<T>>
}

export const service = (axios: AxiosInstance) => {
  const createMethod = (method: ApiMethod) => {
    return async <T>(url: string, config?: AxiosRequestConfig): Promise<BaseResponse<T>> => {
      const response = await axios({
        url,
        method,
        ...config,
      })
      return response.data
    }
  }

  const api: ApiMethods = {
    get: createMethod('GET'),
    post: createMethod('POST'),
    put: createMethod('PUT'),
    delete: createMethod('DELETE'),
    patch: createMethod('PATCH'),
  }

  const apiResource = {
    getRockets: (config?: AxiosRequestConfig) => api.get('/v4/rockets', config),
    getRocket: (id: string, config?: AxiosRequestConfig) => api.get(`/v4/rockets/${id}`, config),
    postRocket: (config?: AxiosRequestConfig) => api.post('/v4/rockets', config),
    postQueryRocket: (config?: AxiosRequestConfig) => api.post('/v4/rockets/query', config),
  }

  return apiResource
}
