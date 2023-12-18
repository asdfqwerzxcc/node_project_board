<template>
    <Pie ref="chart" :options="options" :data="chartData" />
    <a>{{ chartData }}</a>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend, } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    name: 'chartRanking',
    components: {
        Pie
    },
    props: {
        rankingdata: Object
    },
    data() {
        return {
            options: {
                responsive: false,
                maintainAspectRatio: true
            },
            chartData: {
                labels: [this.rankingdata.rank.slice(0, 10).map((item) => item.nickName)],
                datasets: [
                    {
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                        data: [this.rankingdata.rank.slice(0, 10).map((item) => item.attack)]
                    }
                ]
            }
        }
    },
    watch: {
        // rankingdata: {
        //     handler: 'updateChartData',
        //     immediate: true
        // },
        rankingdata(newData) {
            console.log(newData.rank.slice(0, 10).map((item) => item.attack));
            this.chartData.labels = newData.rank.slice(0, 10).map((item) => item.nickName);
            this.chartData.datasets[0].data = newData.rank.slice(0, 10).map((item) => item.attack);
            console.log(this.chartData)
        }


    },        //     watchEffect() {
    // this.updateChartData();
    // this.$nextTick(() => {
    //   this.$refs.chart.renderChart(this.chartData, this.options);
    // });


    methods: {
        updateChartData() {
            // console.log(this.$refs.chart)
            // console.log(this.rankingdata)
            this.chartData.labels = this.rankingdata.rank.slice(0, 10).map((item) => item.nickName);
            console.log(this.chartData.labels)
            this.chartData.datasets[0].data = this.rankingdata.rank.slice(0, 10).map((item) => item.attack);
            // console.log(this.chartData)
            // if (this.$refs.chart) {
            //     this.$refs.chart.renderChart(this.chartData, this.options)
            // }
        },

    },

}
</script>
