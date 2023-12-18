<template>
    <div>
      <div>
        <h2>Please register</h2>
        <div id="loginForm">
          <form @submit.prevent="register">
            <p>
              <input class="w3-input" name="uid" placeholder="Enter your ID" v-model="user_id"><br>
            </p>
            <p>
              <input name="password" class="w3-input" placeholder="Enter your password" v-model="user_pw" type="password">
            </p>
            <p>
              <input name="name" class="w3-input" placeholder="Enter your name" v-model="user_name">
            </p>
            <p>
              <button type="submit" class="w3-button w3-green w3-round">submit</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'

  export default {
    data() {
      return {
        user_id: '',
        user_pw: '',
        user_name:''

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
  
        alert('로그인 되었습니다.')
      },
      register(){
        // const root_url ='http://localhost:8080' ;

        console.log(this.user_id,this.user_name);
        let url='http://localhost:3000/user/create';
        let data={
            id:this.user_id,
            passwd:this.user_pw,
            name: this.user_name
        };
        let error_sta= false
        let response_data
        axios.post(url,data)
        .then(function(response){
            console.log(response);
            response_data=response.data;
            console.log(response_data);
            alert(response_data);
            
        })
        .catch(function(error){
            console.log(error)
            error_sta=true
            alert(error.response.data.message)

        })
        if(error_sta){
          this.$router.push({ path: "/login" });
        }
      }
    }
  }
  </script>
  
  <style>
  #loginForm {
    width: 500px;
    margin: auto;
  }
  </style>