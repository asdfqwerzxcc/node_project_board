<!-- PageAbout.vue -->
<template>
  <div class="rankingtabel">
    <h1>This is an ranking</h1>

    <select v-model="selected" @change="onchagenumber()">
      <option value="" disabled selected>일자</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>

    <select v-if="selected !== ''" @change="onSortDirectionChange(selected, $event)">
      <option value="" disabled selected>정렬 방향</option>
      <option value="asc">오름차순</option>
      <option value="desc">내림차순</option>
    </select>
    <!-- <span>Selected: {{ selected }}</span> -->
    <p>
      일자별 유저 dps 및 rank
    </p>
    <div style="min-height:440px;">
      <table v-if="selected" border="1px" align="center">
        <tr>
          <th colspan="4">
            일자별
          </th>
        </tr>
        <tbody>
          <tr>
            <th colspan="4">{{ (formatDate(selected.bossInfo.setDate)) }}</th>
          </tr>
          <tr>
            <th width="200">유저 name</th>
            <th width="100">유저 dps</th>

            <th width="50">유저 rank</th>
            <th width="50">기여</th>
          </tr>
          <tr v-for="j in paginatedData" :key="j">
            <td>{{ j.nickName }} </td>
            <td>{{ (j.attack).toLocaleString('ko-KR') }} </td>
            <td v-if="j.rank === 1">
              <div class="test_obj"><img alt="number1" width="40" height="40" src="../assets/icon_ranking1.png"></div>
            </td>
            <td v-else-if="j.rank === 2">
              <div class="test_obj"><img alt="number2" width="40" height="40" src="../assets/icon_ranking2.png"></div>
            </td>
            <td v-else-if="j.rank === 3">
              <div class="test_obj"><img alt="number3" width="30" height="30" src="../assets/icon_ranking3.png"></div>
            </td>
            <td v-else>{{ j.rank }} </td>
            <td>{{ (j.attack / (selected.bossInfo.maxHp - selected.bossInfo.hp) * 100).toFixed(2) }}%</td>
          </tr>
        </tbody>
      </table>
    </div>


    <div v-if="selected !== ''" style="padding: 20px;">
      <button :disabled="pageNum === 0" @click="firstPage" class="page-btn">
        처음
      </button>
      <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
        이전
      </button>
      <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
        다음
      </button>
      <button :disabled="pageNum >= pageCount - 1" @click="lastPage" class="page-btn">
        마지막으로
      </button>
    </div>

  </div>

  <div class="chart" v-if="selected">
    <hr style="margin: 10px;">
    <h1>
      This an ranking Chart
    </h1>
    <chartRanking :rankingdata="selected"></chartRanking>
  </div>
  <!-- <div id="aa"></div> -->
</template>
<script>
import testJson1 from "@/json/2022-12-07.json";
import testJson2 from "@/json/2022-12-08.json";
import testJson3 from "@/json/2022-12-09.json";
import testJson4 from "@/json/2022-12-10.json";
import testJson5 from "@/json/2022-12-11_event.json";
import chartRanking from "./common/chart_ranking.vue"


export default {
  data() {
    return {
      data_07: testJson1,
      data_08: testJson2,
      data_09: testJson3,
      data_10: testJson4,
      data_11: testJson5,
      selected: '',
      options: [
        { text: '2022-12-07', value: testJson1 },
        { text: '2022-12-08', value: testJson2 },
        { text: '2022-12-09', value: testJson3 },
        { text: '2022-12-10', value: testJson4 },
        { text: '2022-12-11', value: testJson5 },
      ],
      pageNum: 0,

      sortDirection: 'desc'
    };
  },
  components: {
    chartRanking
  },
  mounted() {
  },
  methods: {
    formatDate(date) {
      // console.log(date)
      const dateObj = new Date(date);

      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const hours = String(dateObj.getHours()).padStart(2, '0');
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    onchagenumber() {
      this.pageNum = 0;

    },

    onSortDirectionChange(select, event) {
      console.log(event.target.value)
      if (event.target.value === 'desc') {
        this.selected.rank = select.rank.sort((a, b) => b.rank - a.rank)
      }
      else {
        this.selected.rank = select.rank.sort((a, b) => a.rank - b.rank)
      }
    },
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    },
    firstPage() {
      this.pageNum = 0;
    },
    lastPage() {
      this.pageNum = this.pageCount - 1;
    }
  },
  computed: {
    pageCount() {
      // console.log("page", Object.keys(this.selected.rank).length)
      let listlength = Object.keys(this.selected.rank).length,
        page = Math.floor(listlength / 10)

      if (listlength % 10 > 0) page += 1
      console.log('page', page)
      return page
    },
    paginatedData() {
      const start = this.pageNum * 10,
        end = start + 10;
      return this.selected.rank.slice(start, end);
    }
  }

}
</script>
<style>
@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translateZ(0);
  }
}

.test_obj {
  position: relative;
  animation: fadeInLeft 1s;
  animation-iteration-count: 1;
  /* 한번 재생 */
}

/* 애니메이션 효과를 위한 기본 설정 */
.animated-cell {
  transition: transform 0.3s ease;
}

/* 마우스 호버 시 왼쪽으로 이동하는 애니메이션 적용 */
.animated-cell:hover {
  transform: translateX(-20px);
}
</style>