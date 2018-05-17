<template>
  <div class="fault-rate">
    <div :ref="contentRef" class="fault-rate-content">
      <template v-if="border">
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
        <div class="v-fault"><span class="icon"></span>电压异常</div>
        <div class="p-fault"><span class="icon"></span>电源故障</div>
        <div class="a-fault"><span class="icon"></span>电流异常</div>
        <div class="fault"><span class="icon"></span>故障</div>
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
      props: {
          border: false
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
                  {value: 111, name: 'bbb'},
                  {value: 111, name: 'ccc'},
                  {value: 111, name: 'ss'},
              ]
              this.option = {
                  name: 'test',
                  color: ['#3EB37F', '#FF854A', '#FF6668', '#5282E6', '#999999'],
                  title: '故障率'
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
        width: 100%;
        flex: 3;
        text-align: center;
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
        align-content: space-around;
        .normal,
        .v-fault,
        .p-fault,
        .a-fault,
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