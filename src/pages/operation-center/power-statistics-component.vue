<template>
  <div class="power-statistics">
    <div :ref="contentRef" class="power-statistics-content">
      <div class="content-title">用电量统计</div>
      <div class="echart-content">
        <div class="content-border left-top"></div>
        <div class="content-border right-top"></div>
        <div class="content-border left-bottom"></div>
        <div class="content-border right-bottom"></div>
        <div class="echart">
          <line-echart-component v-if="visible" :data="dataUse" :option="option"></line-echart-component>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'powerStatisticsComponent',
        data() {
            return {
                contentRef: 'contetn-ref',
                option: {
                    xName: '日',
                    yName: 'Wh',
                    nameColor: '#fff',
                    nameFontSize: '16',
                    namePadding: [0,0,0,0],
                    ySplitLine: {show: false, type: 'dashed', width: 1, color: '#555'},
                    line: {show: true, lineStyle: {color: '#5c859b'}},
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
                },
                visible: false
            }
        },
        props: {
            data: {
                default: function () {
                    return []
                }
            }
        },
        computed: {
            dataUse: function () {
                let value = [];
                let title = [];
                this.data.forEach(item => {
                    value.push(item.num);
                    title.push(item.name)
                });
                return {
                    title: title,
                    value: value
                }
            }
        },
        created() {
        },
        mounted() {
            this.visible = true;
        },
        methods: {
        },
        watch: {
            data: function (newVal) {
                this.visible = false;
                setTimeout(() => {
                    this.visible = true;
                })
            }
        }
    }
</script>
<style lang="less" scoped>
  .power-statistics {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    .power-statistics-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      height: 100%;
      width: 90%;
      .echart-content {
        position: relative;
        height: 100%;
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #419ed0;
        background: linear-gradient(to left, rgba(14,62,119,0.1), rgba(14,62,119,0.5));
        .echart {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
</style>