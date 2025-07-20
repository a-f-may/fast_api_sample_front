import { createRouter,createMemoryHistory } from 'vue-router'
import Login from '../components/auth/Login.vue'
import AfterLogin from '../components/auth/AfterLogin.vue'



  // デフォルトの挙動では URL に `#` が含まれる.
  // URL から hash を取り除くには `mode:history` を指定する
            
  const routes = [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    //
    // 省略
    //
    {
      path: '/after-login',
      name: 'AfterLogin',
      component: AfterLogin
    }
  ]

  export const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })
