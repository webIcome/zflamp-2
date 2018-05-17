<template>
  <div :ref="test" class="content-right echart-statistics">
    <div class="echart-top">
      <div class="echart-item echart-left">
        <fault-rate-component v-if="visible"></fault-rate-component>
      </div>
      <div class="echart-item echart-right" style="display: flex; flex-direction: column">
        <div style="padding-left: 37px; padding-top:60px"><span class="echart-title">在线率</span></div>
        <div style="flex:1; display: flex; align-items: center">
          <online-rate-component v-if="visible"></online-rate-component>
        </div>
      </div>
    </div>
    <div class="echart-bottom">
      <div class="echart-item echart-left">
        <light-rate-component v-if="visible"></light-rate-component>
      </div>
      <div class="echart-item echart-right echart-line">
        <div class="echart-line-item">
          <power-statistics-component v-if="visible"></power-statistics-component>
        </div>
        <div class="echart-line-item"></div>
      </div>
    </div>
  </div>
</template>
<script>
    import FaultRateComponent from "./fault-rate-component";
    import FaultStatisticsComponent from "./fault-statistics-component";
    import LightRateComponent from "./light-rate-component.vue"
    import OnlineRateComponent from "./online-rate-component";
    import PowerStatisticsComponent from "./power-statistics-component";
    export default {
        components: {
            PowerStatisticsComponent, OnlineRateComponent,
            FaultStatisticsComponent,
            FaultRateComponent,
            LightRateComponent,
        },
        name: 'statisticsPage',
        data() {
            return {
                data: {},
                option: {},
                pieData: {},
                pieOption: {},
                test: 'test',
                visible: false,
            }
        },
        created() {
            this.initData();
        },
        mounted() {
            this.$nextTick(() => {
                this.generateHeight();
                this.visible = true;
            })
        },
        methods: {
            initData() {
                this.data = {title: [1, 1, 2, 3], value: [10, 12, 25, 5]};
                this.option = {startColor: '#ff854A', endColor: 'rgba(255,133,74,0.29)', xName: 'yue'}
                this.pieData = [
                    {value: 111, name: 'ddd'},
                    {value: 111, name: 'aaa'},
                    {value: 111, name: 'bbb'},
                    {value: 111, name: 'ccc'},
                ]
                this.pieOption = {
                    name: 'test'
                }
            },
            generateHeight() {
                this.$refs[this.test].style.height =  (document.body.clientWidth - 250) * 920/1190 + 'px';
            }

        }
    }
</script>
<style lang="less" scoped>
  @backgroundColor: #25273E;
  .content-right {
    display: flex;
    flex-direction: column;
  }
  .echart-top {
    display: flex;
    flex: 1;
    margin-bottom: 20px;
  }
  .echart-bottom {
    display: flex;
    flex: 1;
  }
  .echart-item {
    background: @backgroundColor;
    border-radius: 4px;
  }
  .echart-left {
    padding: 37px;
    width: 35%;
    margin-right: 20px;
    height: 100%;
  }
  .echart-right {
    width: 65%;
    height: 100%;
  }
  .echart-line {
    display: flex;
    .echart-line-item {
      flex: 1;
    }
  }
</style>
<style lang="less">
  .echart-statistics{
    .echart-title {
      font-size: 26px;
      color: #fff;
    }
  }
</style>