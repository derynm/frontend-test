import { defineStore } from 'pinia'
import { ref, inject } from 'vue'

import type { inputRocket, Rocket } from '@/types'
import type { ApiService } from '@/plugins/api'
import { useErrorStore } from './error'

export const useRocketStore = defineStore('rocket', () => {

  const api = inject<ApiService>('api')!
  const errorStore = useErrorStore()

  const rockets = ref<Rocket[]>([])
  const rocket = ref<Rocket | null>(null)

  const loading = ref({
    getRockets: true,
    getDetailRocket: false,
  })

  const getRockets = async () => {
    try {
      loading.value.getRockets = true
      const response: any = await api.getRockets()
      rockets.value = response
    } catch (error) {
      errorStore.setError('Failed to fetch rockets')
    } finally {
      loading.value.getRockets = false
    }
  }

  const getDetailRocket = async (id: string) => {
    try {
      loading.value.getDetailRocket = true
      const response: any = await api.getRocket(id)
      rocket.value = response
    } catch (error) {
      errorStore.setError('Failed to fetch rocket detail')
    } finally {
      loading.value.getDetailRocket = false
    }
  }

  const queryRocket = async (name: string) => {
    try {
      loading.value.getRockets = true
      const response: any = await api.postQueryRocket({
        data: {
            query: {
              name: {
                $regex: name,
                $options: "i"
              }
            },
            options: {}
          }
        })

        rockets.value = response.docs
    } catch (error) {
      errorStore.setError('Failed to fetch rockets')
    } finally {
      loading.value.getRockets = false
    }
  }

  const createRocket = async (data: inputRocket) => {
    try {
     await api.postRocket({
        data,
      })
    } catch (error) {
      errorStore.setError('Failed to create rocket')
    }
  }

  return {
    rockets,
    rocket,
    loading,
    getRockets,
    getDetailRocket,
    queryRocket,
    createRocket,
  }
})
