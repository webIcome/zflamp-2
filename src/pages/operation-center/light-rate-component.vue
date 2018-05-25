<template>
  <div class="fault-rate">
    <div :ref="contentRef" class="fault-rate-content">
      <div class="content-border left-top"></div>
      <div class="content-border right-top"></div>
      <div class="content-border left-bottom"></div>
      <div class="content-border right-bottom"></div>
      <div class="echart">
        <pie-echart-component :data="data" :option="option"></pie-echart-component>
      </div>
      <div class="legend">
        <div class="normal"><span class="icon"></span>亮灯</div>
        <div class="v-fault"><span class="icon"></span>灭灯</div>
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
                option: {
                    name: '灯控器',
                    color: ['#ffc500', '#999'],
                    title: {
                        text:'亮灯率',
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
        },
        methods: {

        },
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
      background: linear-gradient(to right, rgba(14, 62, 119, 0.1), rgba(14, 62, 119, 0.5));
      .echart {
        height: 50%;
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
        .v-fault {
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
            background: #ffc500;
          }
        }
        .v-fault {
          .icon {
            background: #999;
          }
        }
      }
    }
  }
</style>