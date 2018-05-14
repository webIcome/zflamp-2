<template>
  <div :ref="test" class="operation-center">
    <div class="operation-top">
      <div class="operation-left"></div>
      <div class="operation-middle">路灯物联网运营指挥中心</div>
      <div class="operation-right"></div>
    </div>
    <div class="operation-item">
      <div class="operation-left">
        <fault-rate-component v-if="visible"></fault-rate-component>
      </div>
      <div class="operation-middle">
        <center-rate-component v-if="visible"></center-rate-component>
      </div>
      <div class="operation-right">
        <power-statistics-component v-if="visible"></power-statistics-component>
      </div>
    </div>
    <div class="operation-empty"></div>
    <div class="operation-item operation-bottom">
      <div class="operation-left">
        <light-rate-component v-if="visible"></light-rate-component>
      </div>
      <div class="operation-middle"></div>
      <div class="operation-right">
        <fault-statistics-component v-if="visible"></fault-statistics-component>
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
  export default {
      name: 'operationCenterPage',
      components: {
          faultRateComponent,
          powerStatisticsComponent,
          lightRateComponent,
          faultStatisticsComponent,
          centerRateComponent
      },
      data() {
          return {
              test: 'test',
              visible: false,
          }
      },
      mounted() {
          this.$nextTick(() => {
              this.generateHeight();
              this.visible = true;
          })
      },
      methods: {
          generateHeight() {
              this.$refs[this.test].style.height = document.body.clientWidth * 1080/1500 + 'px';
          }
      }
  }
</script>
<style lang="less" scoped>
  .operation-center {
    display: flex;
    flex-direction: column;
    background: url("../../assets/login/bg.png") no-repeat;
    background-size: contain;
    /*height: 100%;*/
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
      width: 27.67%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .operation-middle {
      /*flex: 1.614 1 auto;*/
      width: 44.7%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .operation-empty {
      height: 5.8%;
    }
  }
</style>
<style lang="less">
  .content-title {
    color: #31dbff;
    font-size: 26px;
    text-align: left;
    padding-left: 30px;
    margin-bottom: 7%;
    letter-spacing: 5px;
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
      left: 10%;
      animation-delay: 0s;
    }
    &.left-bottom {
      border-top: 0;
      border-right: 0;
      bottom: 0;
      left: 10%;
      animation-delay: 0.5s;
    }
    &.right-top {
      border-bottom: 0;
      border-left: 0;
      top: 0;
      right: 10%;
      animation-delay: 1s;
    }
    &.right-bottom {
      border-top: 0;
      border-left: 0;
      bottom: 0;
      right: 10%;
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