<template>
  <div :ref="test" style="height: 100%; width: 100%; flex: 1"></div>
</template>
<script>
    const Echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/line')
    require('echarts/lib/component/legend');
    import EchartOption from "../utils/echart-option"
    export default {
        name: 'lineEchartComponent',
        data() {
            return {
                test: 'test',
                testChart: ''
            }
        },
        props: {
            data: {
                default: {
                    title: [],
                    value: []
                }
            },
            option: {}
        },
        mounted() {
            this.initData();
        },
        methods: {
            initData() {
                this.testChart = Echarts.init(this.$refs[this.test]);
                this.testChart.setOption(this.getLineOption(this.data));
            },
            getLineOption(data) {
                return EchartOption.getLineOption(data,  this.option)
            }
        }
    }
</script>