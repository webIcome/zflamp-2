<template>
  <div class="power-statistics">
    <div :ref="contentRef" class="power-statistics-content">
      <div style="padding-left: 16px; padding-top:13%"><span class="echart-title">用电量统计</span>
        <el-radio v-model="type" :label="1" border>日</el-radio>
        <el-radio v-model="type" :label="2" border>月</el-radio></div>
      <div class="echart">
        <line-echart-component v-if="visible" :data="data" :option="option"></line-echart-component>
      </div>
    </div>
  </div>
</template>
<script>
    import Service from '../../services/operation-center'
    export default {
        name: 'powerStatisticsComponent',
        data() {
            return {
                contentRef: 'contetn-ref',
                visible: false,
                type: 1,
                data: {title: [], value: []},
                Type: {
                    1: '日',
                    2: '月',
                }
            }
        },
        computed: {
            option: function () {
                let option = {
                    xName: this.Type[this.type],
                    nameColor: '#fff',
                    ySplitLine: {show: true, width: 0.2, color: '#fff'},
                    area: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#44B5FD'
                            }, {
                                offset: 0.93, color: 'rgba(110,193,246,0.17)'
                            }],
                        }
                    },

                }
                if (this.type == 2) {
                    option.grid = {
                        left: '15%'
                    }
                }
                return option;
            }
        },
        created() {

        },
        mounted() {
            this.getData(this.type)
        },
        methods: {
            getData(type) {
                this.visible = false;
                Service.getPowerStatistics(type).then(data => {
                    let value = [];
                    let title = [];
                    data.forEach(item => {
                        value.push(item.num);
                        title.push(item.name)
                    });
                    this.data = {
                        title: title,
                        value: value
                    }
                    this.visible = true;
                })
            }
        },
        watch: {
            type: function (newVal) {
                this.getData(newVal);
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