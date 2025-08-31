<script setup>
import { ref ,onMounted } from 'vue';
import { useUserStore } from '../../store/auth/Login'
import { useUserInfoStore } from '../../store/user';
import axios from "axios";
import { useRoute, useRouter } from 'vue-router'
import saveAs from "file-saver";
import { Buffer } from 'buffer'
const userStore = useUserStore();
const userInfoStore = useUserInfoStore()
const failToAuth = ref(false);
const route = useRoute()
const router = useRouter()

axios.defaults.timeout=1000
const errorMessage = ref("")
const list = ref([])

onMounted(() => {
    getdata()
    
})

const getdata = async function () {
    const res = await axios.get("http://127.0.0.1:8000/file-list",{
        headers: { 
       "Authorization": "Bearer " + userStore.token,
        }, 
    }
    
    )
    list.value = res.data
}

const download = async function (item) {
    const res = await axios.get("http://127.0.0.1:8000/download?item="+item,{
        headers: { 
       "Authorization": "Bearer " + userStore.token,
        }, 
        responseType: "blob"
    }
    
    )
    .then((res) => {
      console.log(res)
      let mineType = res.headers["content-type"];
      const name = res.headers["content-disposition"];
      const blob = new Blob([res.data], { type: mineType });
      saveAs(blob, item);
    })
    
}


const playAudio = async (item) => {
  try {
    // 音声取得
    const responseAudio = await axios.get("http://127.0.0.1:8000/play?item="+item, {
    })
    console.log(responseAudio)
    // Base64形式で取得
    const base64Audio = responseAudio?.data
    // Bufferに変換
    const byteArray = Buffer.from(base64Audio, 'base64')
    // Blobに変換
    const audioBlob = new Blob([byteArray], { type: 'audio/x-mp3' })
    // URLに変換
    const audioUrl = URL.createObjectURL(audioBlob)
    // 音声作成
    const audio = new Audio(audioUrl)
    // 音量[0-1]設定
    audio.volume = 1
    // 再生
    audio.play()
  } catch (e) {
    console.error(e)
  }
}

</script>

<template>
  <div class="login-page">
    <div class="">
        <li v-for="(item, index) in list">
        <a @click="download(item)" href="#">{{ item }}</a>
        <img src="../../assets/se.png" width="32px" @click="playAudio(item)"></img>
        </li>
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

  li {
    list-style:none
  }
</style>