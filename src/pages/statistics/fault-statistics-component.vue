<template>
  <div class="power-statistics">
    <div :ref="contentRef" class="power-statistics-content">
      <div style="padding-left: 16px; padding-top:13%"><span class="echart-title">故障统计</span></div>
      <div class="echart">
        <line-echart-component v-if="visible" :data="data" :option="option"></line-echart-component>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'faultStatisticsComponent',
        data() {
            return {
                contentRef: 'contetn-ref',
                visible: false
            }
        },
        props: {
            data: {
                default: function () {
                    return {title: [1, 1, 2, 3], value: [10, 12, 25, 5]}
                }
            }
        },
        computed: {
            option: function () {
                let option = {
                    xName: '日',
                    color: '#fff',
                    ySplitLine: {show: true, width: 0.2, color: '#fff'},
                    startColor: '#3866ea',
                    endColor: '#2d3866ea',
                }
                return option;
            }
        },
        created() {

        },
        mounted() {
            this.visible = true;
        },
        methods: {
        }
    }
</script>
<style lang="less" scoped>
  .power-statistics {
    height: 100%;
    width: 100%;
    text-align: center;
    .power-statistics-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      /*justify-content: space-between;*/
      height: 100%;
      .echart {
        padding: 30px 0 20px;
        height: 100%;
        width: 100%;
      }
    }
  }
</style>