import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorStore = defineStore('error', () => {

  const error = ref<string>('')

  const setError = (message: string) => {
    error.value = message

    setTimeout(() => {
      error.value = ''
    }, 5000)
  }

  return {
    error,
    setError,
  }
})
