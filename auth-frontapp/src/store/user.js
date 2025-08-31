import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', {
    state: () => ({
      username: "",
      email: "",
      age: 1
    }),
    actions: {
      init(name,email,age) {
        this.username = name;
        this.email = email;
        this.age = age;
      }
    },
  })