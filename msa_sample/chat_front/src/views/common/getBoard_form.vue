<template>
    <table border="1px" align="center">
        <tr>
            <th>제목</th>
            <td style="width: 500px;">
                {{ this.board.title }}
            </td>
        </tr>
        <tr>
            <th>작성자</th>
            <td>
                {{ this.board.userIndex }}
            </td>
        </tr>
        <tr>
            <th>내용</th>
            <td>
                {{ this.board.content }}
            </td>
        </tr>
        <tr>
            <th>추천</th>
            <td>
                {{ this.board_count=this.board.count }} <a style="cursor:pointer; color: red; float: right;"
                    @click="goodcount()">추천하기
                </a>
            </td>
        </tr>
        <tr>
            <th>조회수</th>
            <td>
                {{ this.board.view }}
            </td>
        </tr>
        <tr>
            <th>생성일자</th>
            <td>
                {{ formatDate(this.board.createdAt) }}
            </td>
        </tr>
        <tr>
            <th>수정일자</th>
            <td>
                {{ formatDate(this.board.UpdatedAt) }}
            </td>
        </tr>
    </table>
    <p></p>
    <div v-if="this.user_index === this.board.userIndex">
        <a id="delete" style="cursor:pointer;" @click="deleteBoard()">삭제</a>
        <a> | </a>
        <a id="update" style="cursor:pointer;"
            @click="$router.push({ name: 'ReboardComponent', params: { index: this.index }, request })">수정</a>
    </div>
    <hr>
    <!-- 댓글 -->
    <div style="text-align: center;">
        <form>
            <input name="comment" class="w3-input" placeholder="Enter your comment" v-model="comment">
            <a style="cursor: pointer;" @click="createsub()">제출</a>
        </form>
        <p></p>
        <table border="1px" align="center" style="border-collapse: collapse">
            <tr>
                <th colspan="5">댓글</th>
            </tr>
            <tr>
                <th style="border: 0px;"></th>
                <th style="min-width: 500px;">내용</th>
                <th style="padding:10px">작성자</th>
                <th>작성일자</th>
                <th style="border: 0px;"></th>

            </tr>
            <tbody v-for="(items, index) in subboard" :key="index">
                <tr style="text-align: left;">
                    <td style="border: 0px;"></td>
                    <!-- <td v-if="items.direct != 0">{{ addSpacesForDashes(items.path) }}{{ items.comment }}</td> -->
                    <td v-if="items.direct != 0">
                        <p><b v-for="i in addSpacesForDashes(items.path)" :key="i">&nbsp;&nbsp;&nbsp;</b> ↳{{ items.comment
                        }}</p>
                    </td>
                    <td v-if="items.direct == 0"> {{ items.comment }}</td>
                    <!-- <td ></td> -->
                    <td style="text-align: center; padding:10px">{{ items.userIndex }}</td>
                    <td style="padding:10px">{{ formatDate(items.createdAt) }}</td>
                    <td style="border: 0px;">
                        <a style="cursor: pointer;" @click="togglecomment(index, items.comment)"> 수정 </a>
                        <a style="cursor: pointer;"> 삭제 </a>
                        <a style="cursor: pointer;" @click="toggleReply(index)"> 답글 </a>
                    </td>
                </tr>
                <tr v-if="showupdateReply[index]" id="reply">
                    <td colspan="5">
                        <input type="text" v-model="updateText[index]" />
                        <a style="cursor: pointer;"></a>
                    </td>

                </tr>
                <tr v-if="showReply[index]" id="reply">
                    <td colspan="5">
                        <input type="text" v-model="replyText[index]" />
                        <a style="cursor: pointer;"
                            @click="createsubcomment(index, items.index), toggleReply(index)">답글전송</a>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import { ref } from 'vue'; // Vue 3에서 추가된 모듈

export default {
    setup() {
        // const subboard = reactive([]); // Your subboard data here (using `reactive`)
        const showReply = ref([]); // Array to track reply input visibility for each row (using `ref`)
        const replyText = ref([]); // Array to store reply input text for each row (using `ref`)
        const showupdateReply = ref([])
        const updateText = ref([])
        function toggleReply(index) {
            // Toggle reply input visibility for the clicked row
            showReply.value[index] = !showReply.value[index];
            if (showReply.value[index]) {
                replyText.value[index] = ''; // Clear reply input text when showing
            }
        }
        function togglecomment(index, comment) {
            // Toggle reply input visibility for the clicked row
            showupdateReply.value[index] = !showupdateReply.value[index];
            if (showupdateReply.value[index]) {
                updateText.value[index] = comment; // Clear reply input text when showing
            }
        }

        return { updateText, showReply, replyText, showupdateReply, toggleReply, togglecomment };
    },
    name: 'getBoard',
    data() {
        return {
            board: {},
            index: this.$route.params.index,
            user_index: {},
            board_count: '',
            comment: '',
            subboard: {},
            inputValue: '',
            replydiv: ''
        }
    },
    methods: {
        async getBoard() {
            axios.get(`http://localhost:3001/board/${this.index}`,
            ).then(async (repsonse) => {
                // console.log(repsonse)
                this.board = repsonse.data
                await axios.post(`http://localhost:3001/board/update/${this.index}`, { view: this.board.view + 1 })
                    .then((response) =>
                        this.board = response.data
                    )
            }).catch(error => { console.error(error) })
        },
        deleteBoard() {
            axios.post(`http://localhost:3001/board/delete`, this.board)
                .then((response) => {
                    console.log(response)
                    alert(response.data)
                    this.$router.replace({ path: "/board/list" })

                }).catch((error) => {
                    console.log(error)
                })
        },
        async goodcount() {
            console.log(this.index)
            this.board_count++;
            console.log(this.board_count)
            try {
                await axios.post(`http://localhost:3001/board/update/${this.index}`, { count: this.board_count })
                    .then((response) => {
                        this.board = response.data
                        console.log(this.board)
                    }

                    ).catch((error) => {
                        console.log("error::", error)
                    })
            }
            catch { (error) => { console.log(error) } }


        },
        formatDate(date) {
            if (date == null) {
                return ''
            }
            // console.log(date)
            const dateObj = new Date(date);

            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            const hours = String(dateObj.getHours()).padStart(2, '0');
            const minutes = String(dateObj.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}`;
        },
        //댓글 리스트
        async getallsub() {
            await axios.get(`http://localhost:3000/subboard/all/${this.index}`)
                .then((response) => {
                    this.subboard = response.data
                    console.log(response.data)

                })
                .catch((error => { console.log(error) }))

        },
        //댓글 생성
        async createsub() {

            let data = { comment: this.comment, boardIndex: this.board.index, userIndex: this.user_index }
            // this.subboard.push(data);
            await axios.post(`http://localhost:3000/subboard/create`, data)
                .then((response) => {
                    console.log(response.data)

                })
                .catch((error) => { console.log(error) })
            await this.getallsub();
            this.comment = ''
        },
        //대댓글 생성
        async createsubcomment(index, direct) {

            let data = { comment: this.replyText[index], boardIndex: this.board.index, userIndex: this.user_index, direct: direct }
            // this.subboard.push(data);
            await axios.post(`http://localhost:3000/subboard/create`, data)
                .then((response) => {
                    console.log(response.data)

                })
                .catch((error) => { console.log(error) })
            await this.getallsub();
        },

        addSpacesForDashes(path) {
            if (typeof path !== 'string') {
                return ''; // 빈 문자열 또는 원하는 기본값으로 처리
            }
            console.log(path)
            const dashCount = (path.match(/-/g) || []).length;
            // console.log(dashCount)
            //const spaces = '----'.repeat(dashCount);
            // console.log(spaces)
            //return `${spaces} ↳`
            return dashCount;
        }


    },
    // watch: {
    //     subboard(newValue, oldValue) {
    //         console.log(newValue, oldValue)
    //     }
    // },
    mounted() {
        console.log(this.$route.params.index)
        this.getBoard();
        this.getallsub();
    },
    async created() {
        console.log(this.$route.params.index)
        await axios.post(`http://localhost:3000/user`, { id: cookies.get("memberId") }
        ).then((repsonse) => {
            // console.log(repsonse)
            this.user_index = repsonse.data.index
            console.log(this.user_index)
        }).catch(error => { console.error(error) })
    }

}
</script>

<style>
#update:hover {
    color: blue;

}

#delete:hover {
    color: tomato;
}
</style>