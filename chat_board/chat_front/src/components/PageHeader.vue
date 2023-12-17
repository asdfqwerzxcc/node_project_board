<!-- PageHeader.vue -->
<template>
  <header>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/board/list">게시판</router-link> |
      <router-link v-if="!$store.state.isCookie" to="/login">로그인</router-link>

      <a v-if="$store.state.isCookie">
        <a id="logout" style="cursor:pointer; text-decoration: underline;" v-on:click.prevent="reset">로그아웃</a>
      </a>
    </div>
  </header>
  <hr />
</template>
  
<script>
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
export default {
  data() {
    return {
    };
  },
  created() {
    // console.log(typeof (cookies.get('accesstoken')))
    let accessToken = cookies.get('accesstoken')
    if (accessToken !== null) {
      this.$store.state.isCookie = { accessToken: cookies.get('accesstoken'), memberId: cookies.get('memberId') }

    }

    console.log(accessToken)
  },
  methods: {
    reset() {
      console.log(cookies.get("memberId"));
      cookies.remove("memberId");
      cookies.remove("accesstoken");

      this.$store.state.isCookie = ''
      alert("로그아웃 되었습니다.");
      this.$router.replace('/login')
    },
  }

}
</script>
  
<style scoped>
#logout:hover {
  color: red;
}
</style>