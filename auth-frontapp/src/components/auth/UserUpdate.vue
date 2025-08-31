<script setup>
import { ref } from 'vue';
import { useUserStore } from '../../store/auth/Login'
import { useUserInfoStore } from '../../store/user';
import axios from "axios";
import { useRoute, useRouter } from 'vue-router'

const userStore = useUserStore();
const userInfoStore = useUserInfoStore()
const failToAuth = ref(false);
const route = useRoute()
const router = useRouter()

axios.defaults.timeout=1000
const errorMessage = ref("")
const submit = async function(){
    console.log("【START】submit#Login")
    const params = createFormData()
    await axios.post("http://127.0.0.1:8000/token",params)
    .then(
      response => {
      console.log(response)
      userStore.token = response.data.access_token

      router.push({
        name:'AfterLogin'
      })
      }
    )
    .catch(error =>{
      failToAuth.value = true 
      if(error.status == '401'){
        errorMessage.value = "認証情報が間違っています"
      } else {
        console.log("エラーが発生しました")
        errorMessage.value = "エラーが発生しました"
      }
    })

    return 
}

const createFormData = function() {
    const params = new URLSearchParams();
    params.append('username',userStore.username)
    params.append('password',userStore.password)
    return params
}

const userMe = async function () {
    const res = await axios.get("http://127.0.0.1:8000/users/me",{
        headers: { 
       "Authorization": "Bearer " + userStore.token,
        }, 
    }
    )
}

</script>

<template>
  <div class="login-page">
    <div v-if="failToAuth" class="error-field alert alert-danger">
      <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </svg>
       <span>{{ errorMessage }}</span>
    </div>
    <div class="form-field">
      <div class="email">
        <div class="input-label">
          <label>username：</label>
        </div>
        <input type="text" class="form-control" v-model="userStore.username" name="username">
      </div>

      <div class="button-area">
        <button @click="submit" class="btn btn-outline-primary">login</button>
      </div>
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