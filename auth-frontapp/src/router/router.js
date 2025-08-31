import { createRouter,createWebHistory } from 'vue-router'
import Login from '../components/auth/Login.vue'
import AfterLogin from '../components/auth/AfterLogin.vue'
import UserUpdate from '../components/auth/UserUpdate.vue'
import Upload from '../components/sounds/upload.vue'
import Download from '../components/sounds/download.vue'


  // デフォルトの挙動では URL に `#` が含まれる.
  // URL から hash を取り除くには `mode:history` を指定する
            
const routes = [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/after-login',
      name: 'AfterLogin',
      component: AfterLogin
    },
    {
        path: '/update',
        name: 'Update',
        component: UserUpdate
    },
    {
        path: '/sound-upload',
        name: 'upload',
        component: Upload
    },
    {
        path: '/download',
        name: 'download',
        component: Download
    }
]

  export const router = createRouter({
    history: createWebHistory(),
    routes,
  })
