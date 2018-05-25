<template>
  <div :ref="test" style="height: 100%; width: 100%; flex: 1"></div>
</template>
<script>
    const Echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/pie');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
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
                this.testChart.setOption(this.getOption(this.data));
            },
            getOption(data) {
                return EchartOption.getPieOption(data,  this.option)
            }
        },
        watch:{
            data: function () {
                this.initData();
            },
            option: function () {
                this.initData();
            }
        }
    }
</script>