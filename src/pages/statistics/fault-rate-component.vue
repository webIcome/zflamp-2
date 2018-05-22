<template>
  <div class="fault-rate">
    <div :ref="contentRef" class="fault-rate-content">
      <div class="echart">
        <pie-echart-component v-if="visible" :data="data" :option="option"></pie-echart-component>
      </div>
      <div class="legend">
        <div class="normal"><span class="icon"></span>正常</div>
        <div class="fault"><span class="icon"></span>故障</div>
      </div>
    </div>
  </div>
</template>
<script>
  import Service from '../../services/operation-center'
    export default {
        name: 'faultRateComponent',
        data() {
            return {
                contentRef: 'content-ref',
                visible: false,
                option: {
                    name: '灯控器',
                    color: ['#3EB37F', '#FF854A'],
                    title: {
                        text:'故障率',
                        left:'center',
                        top:'center',
                        textStyle:{
                            color:'#fff',
                            fontSize:20,
                            align:'center'
                        }
                    }
                },
                data: [
                    {value: 0, name: '正常'},
                    {value: 0, name: '故障'},

                ]
            }
        },
        computed: {
        },
        created() {
            this.initData();
        },
        mounted() {
            this.visible = true;
        },
        methods: {
            initData() {
                Service.getFaultRate().then(data => {
                    this.data = [
                        {value: data, name: '故障'},
                        {value: 100 - data, name: '正常'}
                    ]
                })
            }
        }
    }
</script>
<style lang="less" scoped>
  .fault-rate {
    height: 100%;
    width: 100%;
    .fault-rate-content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      height: 100%;
      .echart {
        height: 40%;
        width: 100%;
        flex: 4;
      }
      .legend {
        flex: 1;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        width: 80%;
        color: #fff;
        letter-spacing: 2px;
        .normal,
        .fault {
          font-size: 14px;
          margin-right: 20px;
          text-align: left;
          .icon {
            display: inline-block;
            width: 13px;
            height: 13px;
            margin-right: 7px;
          }
        }
        .normal {
          .icon {
            background: #3EB37F;
          }
        }
        .fault {
          .icon {
            background: #FF854A;
          }
        }
      }
    }
  }
</style>