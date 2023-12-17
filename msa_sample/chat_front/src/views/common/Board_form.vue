<!-- PageAbout.vue -->
<template>
    <div classs="hotBoardlist">
        <h1>인기글</h1>
    </div>
    <!-- 인기글 게시판 -->
    <div>
        <table border="1px" align="center">
            <tr>

                <th width="300px">
                    제목
                </th>
                <th width="150px">
                    작성자
                </th>
                <th width="70px">
                    추천
                </th>
                <th width="70px">
                    조회수
                </th>
            </tr>
            <tbody v-for=" (items)  in  hot_board  " :key="items">
                <tr>
                    <td>
                        <a id="boardtitle" style="cursor:pointer; "
                            @click="$router.push({ name: 'getBoard', params: { index: items.index } })">{{ items.title
                            }}</a>
                    </td>
                    <td>
                        {{ items.userIndex }}
                    </td>
                    <td>
                        {{ items.count }}
                    </td>
                    <td>
                        {{ items.view }}
                    </td>
                </tr>

            </tbody>


        </table>
    </div>
    <div class="Boardlist">
        <h1>게시판</h1>
    </div>
    <!-- 게시판 -->
    <div class="Boardlist" style="width:auto ;">
        <table border="1px" align="center">
            <tr>
                <th width="300px">
                    제목
                </th>
                <th width="150px">
                    작성자
                </th>
                <th width="70px">
                    추천
                </th>
                <th width="70px">
                    조회수
                </th>
                <th width="150px">
                    생성일자
                </th>
            </tr>
            <tr v-for=" (items)  in   board  " :key="items">

                <td>
                    <a id="boardtitle" style="cursor:pointer; "
                        @click="$router.push({ name: 'getBoard', params: { index: items.index } })">{{ items.title }}</a>
                </td>
                <td>
                    {{ items.userIndex }}
                </td>
                <td>
                    {{ items.count }}
                </td>
                <td>
                    {{ items.view }}
                </td>
                <td>
                    {{ items.createdAt }}
                </td>
            </tr>
        </table>
        <div style="text-align: right;width: 740px; margin:auto">
            <span id="write" style="cursor:pointer; text-decoration: underline;"
                @click="$router.push({ name: 'newBoard' })">글쓰기</span>
        </div>
        <div id="nav">
            <a v-for="page_num in board_page" :key="page_num" :class="{ 'active': page_num === this.currentPage }"
                style="cursor: pointer; text-decoration: underline;" @click="setCurrentPage(page_num)">
                {{ page_num }}
                <a> | </a>
            </a>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Board_form',
    components: {

    },
    data() {
        return {
            hot_board: [],
            board: [],
            board_page: '',
            board_length: '',
            currentPage: 1, // 현재 선택된 페이지 번호를 저장할 변수

        }
    },
    methods: {
        async getBoardlist() {
            await axios.get('http://localhost:3001/board/all')
                .then((response) => {
                    this.board_length = response.data
                    // console.log(this.board_length)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getBoardpage() {
            // console.log(this.board_length % 10)
            if (this.board_length % 10 != 0) {
                // console.log(this.board_length)
                this.board_page = parseInt(this.board_length / 10) + 1
                // console.log(this.board_page)


            } else {
                this.board_page = parseInt(this.board_length / 10)
            }
        },
        async getBoard(page) {
            // console.log(page)
            await axios.get(`http://localhost:3001/board/boardlist/${page}`)
                .then((response) => {
                    this.board = response.data
                    console.log(this.board)
                    for (let i in this.board) {
                        // console.log(this.formatDate(this.board[i].createdAt).then(value => console.log(value)))
                        this.formatDate(this.board[i].createdAt).then(value => this.board[i].createdAt = value)
                        // console.log(this.board[i])

                    }
                    // this.board.createdAt = this.formatDate(this.board.createdAt)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async formatDate(date) {
            // console.log(date)
            const dateObj = new Date(date);

            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            const hours = String(dateObj.getHours()).padStart(2, '0');
            const minutes = String(dateObj.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}`;
        },
        async gethotboard() {
            // console.log("hot")
            await axios.get(`http://localhost:3001/board/hot`)
                .then((response) => {
                    // console.log(response)
                    this.hot_board = response.data
                    // console.log(this.board)
                    // const dateObj = new Date(response.data.createdAt);

                    // this.board.createdAt = dateObj.toISOString().replace("T", " ").slice(0, 19);
                })
                .catch(error => {
                    console.log(error)
                })
        },
        setCurrentPage(pageNum) {
            // console.log(pageNum)
            this.currentPage = pageNum; // 클릭한 페이지 번호를 현재 페이지로 설정
            // console.log(this.currentPage)
            this.getBoard(pageNum); // 페이지 변경 시 해당 페이지 데이터를 가져옴
        },





    },
    // computed: {
    //     formattedBoard() {
    //         // board 배열의 각 아이템에 대해 createdAt 날짜를 원하는 형식으로 변환하여 새로운 배열을 반환
    //         return this.board.map((item) => ({
    //             ...item,
    //             createdAt: this.formatDate(item.createdAt)
    //         }));
    //     }
    // },
    async mounted() {
        await this.getBoardlist();
        await this.getBoardpage();
        await this.gethotboard();
    },
    async created() {
        this.getBoard(1)
    }


}
</script>
<style scoped>
#boardtitle:hover {
    color: blue;
}

#write:hover {
    color: #42b983;
}

#nav .active {
    color: #42b983;
    /* 예시로 빨간색으로 표시 */
    font-weight: bold;
}
</style>