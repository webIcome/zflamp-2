<template>
  <div class="power-statistics">
    <div :ref="contentRef" class="power-statistics-content">
      <div class="content-title">故障统计</div>
      <div class="echart-content">
        <div class="content-border left-top"></div>
        <div class="content-border right-top"></div>
        <div class="content-border left-bottom"></div>
        <div class="content-border right-bottom"></div>
        <div class="echart">
          <line-echart-component v-if="visible" :data="data" :option="option"></line-echart-component>
        </div>
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
                data: [],
                option: {},
                visible: false
            }
        },
        created() {
            this.generateHeight();
        },
        mounted() {
            this.visible = true;
        },
        methods: {
            generateHeight() {
                this.data = {title: [1, 1, 2, 3], value: [10, 12, 25, 5]};
                this.option = {
                    xName: '日',
                    color: '#fff',
                    ySplitLine: {show: true, type: 'dashed', width: 1, color: '#fff'},
                    line: {show: true},
                    area: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0.5, color: '#44B5FD'
                            }, {
                                offset: 1, color: '#235c87'
                            }],
                        }
                    }
                }
            }
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
      justify-content: center;
      height: 100%;
      .echart-content {
        position: relative;
        height: 100%;
        width: 110%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: -9%;
        .echart {
          height: 100%;
          width: 80%;
        }
      }
    }
  }
</style>