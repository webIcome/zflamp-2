<template>
  <div class="fault-rate">
    <div :ref="contentRef" class="fault-rate-content">
      <template>
        <div class="content-border left-top"></div>
        <div class="content-border right-top"></div>
        <div class="content-border left-bottom"></div>
        <div class="content-border right-bottom"></div>
      </template>

      <div class="echart">
        <pie-echart-component v-if="visible" :data="data" :option="option"></pie-echart-component>
      </div>
      <div class="legend">
        <div class="normal"><span class="icon"></span>正常</div>
        <div class="v-fault"><span class="icon"></span>故障</div>
        <!--<div class="v-fault"><span class="icon"></span>电压异常</div>-->
        <!--<div class="p-fault"><span class="icon"></span>电源故障</div>-->
        <!--<div class="a-fault"><span class="icon"></span>电流异常</div>-->
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'faultRateComponent',
        data() {
            return {
                contentRef: 'content-ref',
                visible: false,
                option: {
                    name: '灯控器',
                    color: ['#3EB37F', '#FF854A', '#FF6668', '#5282E6', '#999999'],
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
                }
            }
        },
        props: {
            data: {
                default: function () {
                    return []
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
  .fault-rate {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    .fault-rate-content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      width: 80%;
      border: 1px solid #419ed0;
      background: linear-gradient(to right, rgba(14,62,119,0.1), rgba(14,62,119,0.5));
      .echart {
        height: 40%;
        width: 100%;
        margin-top: 25%;
      }
      .legend {
        margin-bottom: 20%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        width: 80%;
        color: #fff;
        letter-spacing: 2px;
        align-content: space-around;
        padding-top: 40px;
        .normal,
        .v-fault,
        .p-fault,
        .a-fault,
        .fault {
          font-size: 14px;
          margin-right: 20px;
          text-align: left;
          margin-bottom: 20px;
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
        .v-fault {
          .icon {
            background: #FF854A;
          }
        }
        .p-fault {
          .icon {
            background: #FF6668;
          }
        }
        .a-fault {
          .icon {
            background: #5282E6;
          }
        }
        .fault {
          .icon {
            background: #999999;
          }
        }
      }
    }
  }
</style>