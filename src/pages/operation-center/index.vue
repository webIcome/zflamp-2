<template>
  <div :ref="test" class="operation-center">
    <div class="operation-top">
      <div class="operation-left"></div>
      <div class="operation-middle"></div>
      <div class="operation-right">
        <div class="go-home" @click="goHome"></div>
      </div>
    </div>
    <div class="operation-item">
      <div class="operation-left">
        <fault-rate-component v-if="visible" :data="faultRate"></fault-rate-component>
      </div>
      <div class="operation-middle">
        <center-rate-component v-if="visible" :lightData="lightOnline" :apData="apOnline" :wellData="wellOnline"></center-rate-component>
      </div>
      <div class="operation-right">
        <power-statistics-component v-if="visible" :data="powerStatistics"></power-statistics-component>
      </div>
    </div>
    <div class="operation-empty"></div>
    <div class="operation-item operation-bottom">
      <div class="operation-left">
        <light-rate-component v-if="visible" :data="lightRate"></light-rate-component>
      </div>
      <div class="operation-middle">
        <console-component v-if="visible" :data="alarmData"></console-component>
      </div>
      <div class="operation-right">
        <fault-statistics-component v-if="visible" :data="lightStatistics"></fault-statistics-component>
      </div>
    </div>
    <div class="operation-empty"></div>
  </div>
</template>
<script>
  import faultRateComponent from "./fault-rate-component.vue"
  import powerStatisticsComponent from "./power-statistics-component.vue"
  import lightRateComponent from './light-rate-component.vue'
  import faultStatisticsComponent from "./fault-statistics-component.vue"
  import centerRateComponent from "./center-rate-component.vue"
  import ConsoleComponent from "./console-component";
  import Service from '../../services/operation-center'
  export default {
      name: 'operationCenterPage',
      components: {
          ConsoleComponent, faultRateComponent,
          powerStatisticsComponent,
          lightRateComponent,
          faultStatisticsComponent,
          centerRateComponent
      },
      data() {
          return {
              test: 'test',
              visible: false,
              data: {},
              time: 300000,
              timer: '',
              apOnline: [
                  {value: 0, name: '在线'},
                  {value: 100, name: '离线'}
              ],
              faultRate: [
                  {value: 0, name: '故障'},
                  {value: 100, name: '正常'}
              ],
              lightOnline: [
                  {value: 0, name: '在线'},
                  {value: 100, name: '离线'}
              ],
              wellOnline: [
                  {value: 0, name: '在线'},
                  {value: 100, name: '离线'}
              ],
              lightRate: [
                  {value: 0, name: '亮灯'},
                  {value: 100, name: '灭灯'}
              ],
              powerStatistics: [],
              lightStatistics: [],
              alarmData: []
          }
      },
      created() {
          this.timer = setInterval(this.initData.bind(this), this.time)
      },
      computed:{

      },
      mounted() {
          this.$nextTick(() => {
              this.generateHeight();
              this.visible = true;
          })
          this.initData();
      },
      methods: {
          initData() {
              Promise.all([Service.getApLineRate(), Service.getLightLineRate(), Service.getWellLineRate()])
                  .then(([apData, lightData, wellData]) => {
                      this.apOnline = [
                          {value: apData, name: '在线'},
                          {value: 100 - apData, name: '离线'}
                      ];
                      this.lightOnline = [
                          {value: lightData, name: '在线'},
                          {value: 100 - lightData, name: '离线'}
                      ];
                      this.wellOnline = [
                          {value: wellData, name: '在线'},
                          {value: 100 - wellData, name: '离线'}
                      ];
                  });
              Service.getFaultRate().then(data => {
                  this.faultRate = [
                      {value: data, name: '故障'},
                      {value: 100 - data, name: '正常'}
                  ]
              });
              Service.getLightRate().then(data => {
                  this.lightRate = [
                      {value: data, name: '亮灯'},
                      {value: 100 - data, name: '灭灯'}
                  ]
              });
              Service.getLightStatistics(1).then(data => {
                  this.lightStatistics = data;
              });
              Service.getPowerStatistics(1).then(data => {
                  this.powerStatistics = data
              });
              Service.getAlarm().then(data => {
                  this.alarmData = data;
              })
          },
          generateHeight() {
              this.$refs[this.test].style.height = document.body.clientWidth * 1080/1500 + 'px';
          },
          goHome() {
              this.$router.push({path: '/list'})
          }
      },
      destroyed() {
          clearInterval(this.timer);
      }
  }
</script>
<style lang="less" scoped>
  .operation-center {
    display: flex;
    flex-direction: column;
    background: url("../../assets/echart/bg.png") no-repeat;
    background-size: contain;
    /*height: 100%;*/
    .operation-title {
      display: inline-block;

    }
    .operation-top {
      height: 17%;
      font-size: 48.56px;
      text-align: center;
      display: flex;
      flex-direction: row;
    }
    .operation-item {
     height: 35%;
      display: flex;
    }
    .operation-right,
    .operation-left {
      /*flex: 1 1 auto;*/
      width: 27%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .operation-right {
      width: 28%;
    }
    .operation-middle {
      /*flex: 1.614 1 auto;*/
      width: 45%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .operation-empty {
      height: 5.8%;
    }
    .go-home {
      background: url("../../assets/echart/gohome.png");
      width: 147px;
      height: 30px;
      cursor: pointer;
    }
  }
</style>
<style lang="less">
  .content-title {
    color: #31dbff;
    font-size: 26px;
    text-align: left;
    padding: 15px 30px;
    margin-bottom: 15px;
    letter-spacing: 5px;
    background: linear-gradient(to right, #07486f, rgba(7,72,111,0.2));
    width: 100%;
  }
  .content-border {
    position: absolute;
    width: 12px;
    height: 13px;
    border: 2px solid #5bb7e5;
    //animation: marquee 2s infinite;
    &.left-top {
      border-bottom: 0;
      border-right: 0;
      top: 0;
      left: 0;
      animation-delay: 0s;
    }
    &.left-bottom {
      border-top: 0;
      border-right: 0;
      bottom: 0;
      left: 0;
      animation-delay: 0.5s;
    }
    &.right-top {
      border-bottom: 0;
      border-left: 0;
      top: 0;
      right: 0;
      animation-delay: 1s;
    }
    &.right-bottom {
      border-top: 0;
      border-left: 0;
      bottom: 0;
      right: 0;
      animation-delay: 1.5s;
    }
  }

  @keyframes marquee {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>