<template>
  <div class="control-panel">
    <div class="panel-title"><span class="title">回路控制器ID:{{detail.sn}}</span></div>
    <div class="panel-control-body">
      <div class="panel-control-item clearfix">
        <div class="panel-img">
          <img v-if="detail.status == 3"  src="../../assets/map/lightErr.png">
          <img v-else-if="detail.status == 2"   src="../../assets/map/lightOff.png">
          <img v-else  src="../../assets/map/light.png">
        </div>
      </div>
    </div>
    <div class="panel-bottom">
      <div class="control-panel-time">更新时间：{{detail.uptime | formDate}}</div>
      <div class="control-panel-status">{{detail.status | apStateNameConverter}}</div>
      <div @click="controlStatus" class="control-panel-status">获取状态</div>
    </div>
  </div>
</template>
<script>
    import Services from "../../services/map";
    import CommonConstant from "../../constants/common";
    export default{
        name: 'loopComponent',
        data() {
            return {
                brightness: 0,
                isShowConfirm: false,
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
            },
            hide() {
                this.$emit('hide');
            },
            showConfirm(value) {
                this.$refs.lightBtns.style.bottom = 1.4 * value - 20 + 'px';
                this.isShowConfirm = true;
            },
            controlBrightness() {
                let data = {};
                if (!this.brightness) {
                    data.controltype = 2;
                } else if (this.brightness == 100) {
                    data.controltype = 1;
                } else {
                    data.controltype = 3;
                    data.brightness = this.brightness
                }
                Services.controlStation(this.detail.deviceid, data).then(res => {
                    this.hideShowConfirm();
                    this.updateDetail({deviceid: this.detail.deviceid, moduletype: this.moduleType.light})
                })
            },
            controlStatus() {
                let data = {controltype: 4}
                Services.controlLoop(this.detail.deviceid, data).then(res => {
                    this.updateDetail({deviceid: this.detail.deviceid, moduletype: this.moduleType.light})
                })
            },
            hideShowConfirm() {
                this.isShowConfirm = false;
            },
            updateDetail(data) {
                this.$emit('updateDetail', {deviceid: data.deviceid, moduletype: data.moduletype})
            }
        },
        watch: {
            detail: function (newVal, oldVal) {
                this.brightness = this.detail.brightness;
            },
            isShow: function (newVal, oldVal) {
                if (!newVal) {
                    this.hideShowConfirm()
                }
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
      text-align: center;
      img {
        height: 140px;
      }
    }
  }
  .panel-bottom{
    margin-top: 49px;
  }
</style>