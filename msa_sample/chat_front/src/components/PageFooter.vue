<!-- PageFooter.vue -->
<template>
  <hr />
  <footer>
    <a @click="clicka()" style="cursor: pointer" id="hi" v-if="cookiecheck()">
      반갑습니다 {{ $store.state.isCookie.memberId }}님
    </a>
  </footer>
</template>
  
<script>
// import {useCookies} from "vue3-cookies";
// const {cookies}=useCookies();
export default {
  data() {
    return {
      memberId: '',
      b: true
    };
  },
  created() {
    console.log(this.$store.state.isCookie)
  },
  methods: {
    cookiecheck() {
      // console.log(this.$store.state.isCookie)
      if (this.$store.state.isCookie) {
        //this.memberId=cookies.get('memberId')
        return true
      }
      return false
    },
    clicka() {
      const a = document.getElementById('hi');

      if (this.b === true) {
        a.style.color = "red";
        this.b = false
      }
      else {
        a.style.color = "black";
        this.b = true
      }
    }
  }
}
</script>
  
<style scoped></style>