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
      <div class="control-panel-time">更新时间：{{detail.uptime | formDate}}</div>
      <div class="control-panel-status">{{detail.status | wellStatusNameConverter}}</div>
      <div @click="controlStatus" class="control-panel-status">获取状态</div>
    </div>
  </div>
</template>
<script>
    import Services from "../../services/map";
    import CommonConstant from "../../constants/common";
    export default{
        name: 'wellComponent',
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
                    this.updateDetail({deviceid: this.detail.deviceid, moduletype: this.moduleType.well})
                })
            },
            controlStatus() {
                let data = {controltype: 4}
                Services.controlWell(this.detail.deviceid, data).then(res => {
                    this.updateDetail({deviceid: this.detail.deviceid, moduletype: this.moduleType.well})
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