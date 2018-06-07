<template>
  <div class="control-panel">
    <div class="panel-title"><span class="title">井盖ID:{{detail.sn}}</span></div>
    <div class="panel-control-body">
      <div class="panel-control-item clearfix">
        <div class="panel-img">
          <img src="../../assets/map/well-right.png">
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
    import Services from "../../services/well";
    import CommonConstant from "../../constants/common";
    export default{
        name: 'wellComponent',
        data() {
            return {
                moduleType: {}
            }
        },
        props: {
            detail: {
                default: () => {
                    return {}
                }
            }
        },
        created() {
            this.initData();
        },
        methods: {
            initData(){
                CommonConstant.deviceType.forEach(item => {
                    this.moduleType[item.name] = item.value;
                })
                this.moduleType.well = 4
            },
            hide() {
                this.$emit('hide');
            },
            controlStatus() {
                let data = {operateType: 1, deviceIds: this.detail.deviceId};
                Services.control(data).then(res => {
                    this.updateDetail({deviceid: this.detail.id, moduletype: this.moduleType.well})
                })
            },
            hideShowConfirm() {
                this.isShowConfirm = false;
            },
            updateDetail(data) {
                this.$emit('updateDetail', {deviceid: data.deviceid, moduletype: data.moduletype})
            }
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