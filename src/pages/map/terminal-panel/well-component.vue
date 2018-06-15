<template>
  <div class="control-panel">
    <div class="panel-title"><span class="title">井盖ID:{{detail.sn}}</span></div>
    <div class="panel-control-body">
      <div class="panel-control-item clearfix">
        <div class="panel-img">
          <img src="../../../assets/map/well-right.png">
        </div>
        <div class="panel-text"><span>井盖被打开({{detail.currentObliquity}}°)</span></div>
      </div>
    </div>
    <div class="panel-bottom">
      <div class="control-panel-time">更新时间：{{detail.uploadTime | formDate}}</div>
      <div class="control-panel-status">{{detail.statusName}}</div>
      <div @click="controlStatus" class="control-panel-status">获取状态</div>
    </div>
  </div>
</template>
<script>
    import Service from "../../../services/well";
    import CommonConstant from "../../../constants/common";
    import panelMixin from "./panel-mixin"
    export default{
        name: 'wellComponent',
        mixins: [panelMixin],
        data() {
            return {
                service: Service
            }
        },
        computed: {
            type: function() {
               return this.moduleType.well
            }
        },
        methods: {
            controlStatus() {
                Service.controlSearchStatus(this.detail.deviceId).then(res => {
                })
            },
        }
    }
</script>
<style lang="less" scoped>
  .panel-control-body {
    margin-top: 24px;
  }
  .panel-control-item {
    display: flex;
    align-items: center;
    justify-content: center;
    .panel-img {
      width: 70%;
      text-align: center;
      img {
        height: 140px;
      }
    }
    .panel-text {
      position: relative;
      width: 30%;
      font-size: 16px;
      color: #333;
      align-self: flex-start;
      span {
        position: absolute;
        left: -28px;
        top: 10px;
        white-space: nowrap;
      }
    }
  }
  .panel-bottom{
    margin-top: 49px;
  }
</style>