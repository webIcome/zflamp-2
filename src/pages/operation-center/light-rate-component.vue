<template>
  <div class="fault-rate">
    <div :ref="contentRef" class="fault-rate-content">
      <div class="content-border left-top"></div>
      <div class="content-border right-top"></div>
      <div class="content-border left-bottom"></div>
      <div class="content-border right-bottom"></div>
      <div class="echart">
        <pie-echart-component v-if="visible" :data="data" :option="option"></pie-echart-component>
      </div>
      <div class="legend">
        <div class="normal"><span class="icon"></span>亮灯数量</div>
        <div class="v-fault"><span class="icon"></span>灭灯数量</div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'faultRateComponent',
        data() {
            return {
                contentRef: 'contetn-ref',
                data: [],
                option: {},
                test: 'test',
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
                this.data = [
                    {value: 111, name: 'ddd'},
                    {value: 111, name: 'aaa'},
                ]
                this.option = {
                    name: 'test',
                    color: ['#ffc300', '#b3b3b3', '#00c3d5', '#3a8dde', '#b1b1b1']
                }
            },
        }
    }
</script>
<style lang="less" scoped>
  .fault-rate {
    height: 100%;
    width: 100%;
    text-align: center;
    .fault-rate-content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      .echart {
        height: 40%;
        width: 40%;
        flex: 3;
        margin-top: 17%;
        text-align: center;
      }
      .legend {
        flex: 1;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        width: 80%;
        color: #fff;
        letter-spacing: 2px;
        align-content: space-between;
        .normal,
        .v-fault{
          font-size: 14px;
          width: 33%;
          text-align: center;
          .icon {
            display: inline-block;
            width: 13px;
            height: 13px;
            margin-right: 7px;
          }
        }
        .normal {
          .icon {
            background: #ffc300;
          }
        }
        .v-fault {
          .icon {
            background: #b3b3b3;
          }
        }
      }
    }
  }
</style>