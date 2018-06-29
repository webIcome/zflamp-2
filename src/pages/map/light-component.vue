<template>
  <div class="control-panel">
    <div class="panel-title"><span class="title">灯控器ID:{{detail.sn}}</span></div>
    <div class="panel-control-body">
      <div class="panel-control-item clearfix">
        <div class="panel-img">
          <img  src="../../assets/map/light-right.png">
        </div>
        <div class="panel-control-slider">

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
    <div class="panel-table">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th>电压(V)</th>
          <th>电流(A)</th>
          <th>电量(Wh)</th>
          <th>运行状态</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{detail.voltage}}</td>
          <td>{{detail.current}}</td>
          <td>{{detail.sumpower}}</td>
          <td>{{detail.runningstate}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="panel-bottom">
      <div class="control-panel-time">更新时间：{{detail.uptime | formDate}}</div>
      <div @click="controlLightStatus" class="control-panel-refresh">刷新</div>
    </div>
  </div>
</template>
<script>
    import Services from "../../services/map";
    import CommonConstant from "../../constants/common";
    import Config from "../../config";
    export default{
        name: 'lightComponent',
        data() {
            return {
                brightness: 0,
                isShowConfirm: false,
                detail: {},
                REFRESH_TIMES: Config.REFRESH_TIMES,
                TIMER: ''
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
            this.getDetail();
        },
        methods: {
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
                Services.controlLight(this.detail.deviceid, data).then(res => {
                    this.hideShowConfirm();
//                    this.resetTimes();
                })
            },
            controlLightStatus() {
                let data = {controltype: 4}
                Services.controlLight(this.detail.deviceid, data).then(res => {
                    this.getDetail()
                })
            },
            getDetail() {
                Services.getDetail({moduletype: this.moduleType.light, deviceid: this.id}).then(detail => {
                    this.detail = detail;
                    this.brightness = this.detail.brightness;
                    this.updateMarker();
                });
            },
            updateMarker() {
                this.$emit('updateMarker', this.transformData(this.detail))
            },
            transformData(data) {
                return {
                    lng: data.longitude,
                    lat: data.latitude,
                    id: data.deviceid,
                    moduletype: this.moduleType.light,
                    sn: data.sn,
                    status: data.lightstatus,
                }
            },
            hideShowConfirm() {
                this.isShowConfirm = false;
            },
            resetTimes() {
                this.REFRESH_TIMES = Config.REFRESH_TIMES;
                clearTimeout(this.TIMER);
                this.refreshDetail();
            },
            refreshDetail() {
                setTimeout(() => {
                    if (this.REFRESH_TIMES) {
                        this.REFRESH_TIMES --;
                        this.getDetail()
                        this.refreshDetail();
                    }
                }, Config.REFRESH_INTERVAL)
            },
        },
        watch: {
            detail: function (val) {
                this.brightness = val.brightness;
            }
        }
    }
</script>
<style lang="less" scoped>
  .panel-control-body {
    margin-top: 10px;
  }
  .panel-control-item {
    display: flex;
    align-items: center;
    .panel-img {
      text-align: center;
      flex: 3 1 auto;
      img {
        height: 140px;
      }
    }
    .panel-control-slider{
      flex: 1 1 auto;
      display: flex;
      position: relative;
      height: 140px;
      text-align: left;
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
  .panel-table {
    color: #333;
    font-size: 10px;
    margin-top: 15px;
    .table {
      margin-bottom: 12px;
    }
    th {
      font-weight: normal;
    }
  }
  .panel-control-slider {
    display: inline-block;

    background-size: 100%;

  }
</style>