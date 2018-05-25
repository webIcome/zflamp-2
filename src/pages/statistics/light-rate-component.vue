<template>
  <div class="fault-rate">
    <div :ref="contentRef" class="fault-rate-content">
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
        name: 'lightRateComponent',
        data() {
            return {
                contentRef: 'contetn-ref',
                visible: false,
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
                },
                data: [
                    {value: 0, name: '亮灯'},
                    {value: 0, name: '灭灯'},
                ]
            }
        },
        created() {

        },
        mounted() {
            this.initData()
        },
        methods: {
            initData() {
                Service.getLightRate().then(data => {
                    this.data = [
                        {value: data, name: '亮灯'},
                        {value: 100 - data, name: '灭灯'}
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
      justify-content: center;
      height: 100%;
      .echart {
        width: 100%;
        flex: 4;
      }
      .legend {
        flex: 1;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        width: 80%;
        color: #fff;
        letter-spacing: 2px;
        align-items: center;
        .normal,
        .v-fault{
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
            background: #5282E6;
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