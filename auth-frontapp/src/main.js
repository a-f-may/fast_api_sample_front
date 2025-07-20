import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router/router.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'


const pinia = createPinia()


createApp(App).use(pinia).use(router).mount('#app')
