<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '../../store/auth/Login';
import { useUserInfoStore } from '../../store/user';
import axios from "axios";
import { useRoute, useRouter, RouterLink } from 'vue-router'


const route = useRoute()
const router = useRouter()
const userAuthStore = useUserStore();
const userInfoStore = useUserInfoStore()
const failToAuth = ref(false);
axios.defaults.timeout=1000

onMounted(() => {
  axios.get("http://127.0.0.1:8000/users/me", {
    headers : {
      accept: 'application/json',
      Authorization: `Bearer ${userAuthStore.token}`
    }
  })
  .then(res => {
    console.log(res)
    userInfoStore.init(res.data.username,res.data.email,20)
  })
  
})

</script>

<template>
  <div class="login-page">
    <div class="error-field alert alert-success">
      <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </svg>
      ログインに成功しました
    </div>
    <router-link to='/'>ログインページへ戻る</router-link>
    <router-link to='/update'>ユーザー情報の更新</router-link>
    <div>
      {{ userInfoStore.username }} さん。こんにちは
    </div>
  </div>
</template>

<style scoped>

  .error-field{
    margin-bottom: 2em;
  }

  .login-page{
    margin: auto;
    width: 600px;
    padding:150px 0;
  }
  .form-field{
    width: 600px;
    text-align: center;
  }
  .input-label {
    text-align: left;
    font-size: 0.8em;
    margin-bottom: 0.2em;
    margin-top: 2rem;
  }

  .button-area{
    padding-top: 3rem;
  }
  svg {
    width: 1rem;
  }

  input{
    width: 100%;
  }
</style>