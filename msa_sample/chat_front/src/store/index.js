import { createStore } from 'vuex'
// import { useCookies } from "vue3-cookies";
// const { cookies } = useCookies();

export default createStore({
  state: {
    isCookie: '',
    token: ''
  },
  getters: {
    iscookie(state) {
      //console.log(this.state)
      return state.isCookie !== ""
    }
  },
  mutations: {
    // if() {
    // isCookie: { accesstoken: cookies.get('accesstoken'), memberId: cookies.get('memberId') },
    // },

  },
  actions: {
  },
  modules: {
  }
})
