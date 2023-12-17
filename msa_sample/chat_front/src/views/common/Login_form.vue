<template>
  <div>
    <h2>Please Log In</h2>
    <div id="loginForm">
      <form @submit.prevent="fnLogin">
        <p>
          <input class="w3-input" name="uid" placeholder="Enter your ID" v-model="user_id"><br>
        </p>
        <p>
          <input name="password" class="w3-input" placeholder="Enter your password" v-model="user_pw" type="password">
        </p>
        <p>
          <button style="background-color:white;cursor: pointer; border:0px;" @click="submit"
            class="w3-button w3-green w3-round" id="clicka">Login
          </button>
          <a style="cursor: pointer;" @click="$router.push('/register')" id="clicka" class="w3-button w3-green w3-round">|
            회원가입 </a>
        </p>
      </form>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
export default {

  data() {
    return {
      user_id: '',
      user_pw: '',
      user_name: ''
    }
  },
  methods: {
    fnLogin() {
      if (this.user_id === '') {
        alert('ID를 입력하세요.')
        return
      }

      if (this.user_pw === '') {
        alert('비밀번호를 입력하세요.')
        return
      }
      console.log(this.user_id, this.user_name);
      let url = 'http://localhost:3000/auth/signin';
      let data = {
        id: this.user_id,
        passwd: this.user_pw,
      };
      axios.post(url, data)
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            data = response.data;
            console.log("토큰: ", data);
            cookies.set("memberId", this.user_id);
            // cookies.set("refreshToken", response.cookies.header.refreshToken);
            cookies.set("accesstoken", data);

            this.$store.state.isCookie = { accessToken: data, memberId: this.user_id };

            console.log(this.$store.state.isCookie)

            alert('로그인 되었습니다.')
            this.$router.push({ path: "/" })

          }
        })
        .catch(function (error) {
          console.log(error)
          alert("fail")

        })
      // alert('로그인 되었습니다.')

    }
  }
}
</script>
  
<style>
#loginForm {
  width: 500px;
  margin: auto;
}

#clicka:hover {
  color: #42b983;

}
</style>