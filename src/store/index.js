
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
export const user = defineStore('user', () => {
  const user = reactive({
    id: "talks_001",
    token: "",
  })
  return {
    user
  }
})
