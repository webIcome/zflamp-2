<template>
  <div class="control-panel">
    <div class="panel-title"><span class="title">基站ID:{{detail.sn}}</span></div>
    <div class="panel-control-body">
      <div class="panel-control-item clearfix">
        <div class="panel-img">
          <img src="../../assets/map/ap-right.png">
        </div>
        <div class="panel-control-slider">
          <div class="slider-title">控制基站下所有灯</div>
          <div class="slider-body">
            <el-slider class="my-slider" v-model="brightness" vertical height="140px" @change="showConfirm" :step="5"></el-slider>
            <div class="slider-label">
              <div class="slider-label-text top"><span>开灯</span></div>
              <div class="slider-label-number">75</div>
              <div class="slider-label-number">50</div>
              <div class="slider-label-number">25</div>
              <div class="slider-label-text bottom"><span>关灯</span></div>
            </div>
            <div ref="lightBtns" class="btns" v-show="isShowConfirm">
              <div class="show-text">{{brightness}}</div>
              <div class="confirm-btn" @click="controlBrightness"><i class="el-icon-check"></i></div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="panel-bottom">
      <div class="control-panel-time">更新时间：{{detail.uptime | formDate}}</div>
      <div class="control-panel-status">{{detail.status | apMapStateNameConverter}}</div>
      <!--<div @click="controlLightStatus" class="control-panel-refresh">刷新</div>-->
    </div>
  </div>
</template>
<script>
    import Services from "../../services/map";
    import ApServices from "../../services/area"
    import CommonConstant from "../../constants/common";
    export default{
        name: 'apComponent',
        data() {
            return {
                brightness: 0,
                isShowConfirm: false,
                detail: {}
            }
        },
        props: {
            id: '',
            moduleType: {
                default: function () {
                    return {}
                }
            },
        },
        created() {
            this.initData();
        },
        methods: {
            initData(){
               this.getDetail()
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
                data.deviceIds = this.id;
                ApServices.controlStation(data).then(res => {
                    this.hideShowConfirm();
                })
            },
            controlLightStatus() {
                let data = {controltype: 4}
                data.deviceIds = this.id;
                Services.controlStation(data).then(res => {
                    this.getDetail()
                })
            },
            hideShowConfirm() {
                this.isShowConfirm = false;
            },
            getDetail() {
                Services.getDetail({deviceid: this.id, moduletype: this.moduleType.station}).then(detail => {
                    this.detail = detail;
                    this.brightness = this.detail.brightness;
                    this.updateMarker();
                });
            },
            updateMarker() {
                this.$emit('updateMarker', this.transformData(this.detail))
            },
            transformData(data) {
                let status = ''
                if (data.runningstate == 'offline') {
                    status = 2
                } else {
                    status = 1
                }
                return {
                    lng: data.longitude,
                    lat: data.latitude,
                    id: data.deviceid,
                    moduletype: this.moduleType.station,
                    sn: data.sn,
                    status: status,
                }
            },
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
    .panel-img {
      text-align: center;
      flex: 2 1 auto;
      img {
        height: 140px;
      }
    }
    .panel-control-slider {
      flex: 1 1 auto;
      position: relative;
      .slider-title {
        font-size: 12px;
        position: absolute;
        top: -40px;
        left: -20px;
        width: 200px;
      }
      .slider-body{
        flex: 1 1 auto;
        display: flex;
        .slider-label {
          position: relative;
          display: flex;
          flex-direction: column;
          font-size: 12px;
          .slider-label-text {
            flex: 1;
            display: flex;
            align-items: flex-start;
            span {
              margin-top: -10px;
            }
            &.bottom {
              align-items: flex-end;
              span {
                margin-top: 0;
                margin-bottom: -10px;
              }
            }
          }
          .slider-label-number {
            flex: 2;
            display: flex;
            align-items: center;
          }
        }
      }
      .my-slider {
        display: inline-block;
      }
      .btns {
        position: absolute;
        left: 30px;
        botom: 0;
        width: 40px;
        /*border: 1px solid #ccc;*/
        .show-text {
          background: #ffffcc;
          /*border-radius: 4px;*/
          box-shadow: 2px 2px 1px #ccc;
          text-align: center;
          margin-bottom: 5px;
        }
        .confirm-btn {
          text-align: center;
          font-weight: bolder;
          cursor: pointer;
          background: #fff;
          box-shadow: 2px 2px 1px #ccc;
          i {
            transform: scale(1.5);
          }
          &:hover {
            background: orangered;
          }
        }
        .confirm-btn {
          color: #24bb1c;
          border-bottom: 0.5px solid #ddd;
        }
        .cencel-btn {
          color: #ccc;
        }
      }
    }
  }
  .panel-bottom{
    margin-top: 49px;
  }
</style>