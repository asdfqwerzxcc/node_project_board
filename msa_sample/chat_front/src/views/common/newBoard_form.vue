<template>
    <div>
        <div>
            <h2>글쓰기
            </h2>
            <div id="loginForm">
                <form @submit.prevent="create">
                    <p>
                        <input style="width: 500px; height: 50px;" class="w3-input" name="title"
                            placeholder="Enter your title" v-model="title"><br>
                    </p>
                    <p>
                        <input style="width: 500px; height: 200px;" name="content" class="w3-input"
                            placeholder="Enter your content" v-model="content" type="">
                    </p>

                    <p>
                        <button style="background-color:white;cursor: pointer; border:0px;" @click="submit"
                            class="w3-button w3-green w3-round" id="clicka">submit
                        </button>

                    </p>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
export default {


    name: 'newBoard',
    data() {
        return {
            title: '',
            content: '',
        }
    },
    methods: {
        async create() {
            if (this.title === '') {
                alert('제목을 입력하세요.')
                return
            }

            if (this.content === '') {
                alert('내용을 입력하세요.')
                return
            }


            let user_index = "";
            let data = { id: cookies.get("memberId") }
            await axios.post('http://localhost:3000/user/', data)
                .then((response) => {
                    console.log("userindex:", response.data.index)
                    user_index = response.data.index
                })
            let newdata = { title: this.title, content: this.content, userIndex: user_index }
            console.log(newdata)
            axios.post('http://localhost:3000/board/create', newdata)
                .then((response) => {
                    data = response.data
                    alert("글쓰기 성공")
                    this.$router.push({ path: "/board/list" })

                })

        }
    }

}
</script>

<style></style>