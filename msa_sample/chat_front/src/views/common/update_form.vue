<template>
    <div>
        <div>
            <h2>글 수정하기
            </h2>
            <div id="loginForm">
                <form @submit.prevent="update">
                    <p>
                        <input style="width: 500px; height: 50px;" class="w3-input" name="title" v-model="title"><br>
                    </p>
                    <p>
                        <input type="text" style="width: 500px; height: 200px;" name="content" class="w3-input"
                            v-model="content">
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
import axios from 'axios';

export default {
    name: "ReboardComponent",
    data() {
        return {
            index: this.$route.params.index,
            title: '',
            content: '',
            board: {},

        }
    },
    methods: {
        async getBoard() {
            axios.get(`http://localhost:3000/board/${this.index}`,
            ).then(async (repsonse) => {
                console.log(repsonse)
                this.board = repsonse.data
                this.title = repsonse.data.title
                this.content = repsonse.data.content
            }).catch(error => { console.error(error) })
        },
        async update() {
            const dateObj = new Date();

            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            const hours = String(dateObj.getHours()).padStart(2, '0');
            const minutes = String(dateObj.getMinutes()).padStart(2, '0');


            const time = `${year}-${month}-${day} ${hours}:${minutes}`
            console.log("today", `${year}-${month}-${day} ${hours}:${minutes}`);

            let newdata = { title: this.title, content: this.content, UpdatedAt: time }
            axios.post(`http://localhost:3000/board/update/${this.index}`, newdata)
                .then((repsonse) => {
                    this.board = repsonse.data
                    this.$router.replace({ path: "/board/list" })
                })
        }
    },
    async mounted() {
        // console.log(this.$route.params.index)
        await this.getBoard();
    },

}
</script>
<style></style>