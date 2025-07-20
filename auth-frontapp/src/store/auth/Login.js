import { defineStore } from 'pinia'

export const useUserStore = defineStore('userAuth', {
    state: () => ({
      username: "username",
      password:"",
      token:""
    }),
    actions: {

    },
  })