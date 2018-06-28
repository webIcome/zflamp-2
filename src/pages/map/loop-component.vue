<template>
  <div class="control-panel">
    <div class="panel-title"><span class="title">回路控制器ID:{{detail.sn}}</span></div>
    <div class="panel-control-body">
      <div class="panel-control-item clearfix">
        <div class="panel-img">
          <img  src="../../assets/map/loop-right.png">
        </div>
        <div class="loop-switch">
          <template v-for="item in detail.loopnum">
            <div>
              <img @click="loopSwitch(item, 2)" title="开" width="26" height="22" v-if="currentLoopStatus(item)" src="../../assets/map/loop-swich-on.png">
              <img @click="loopSwitch(item, 1)" title="关" width="26" height="22"  v-else src="../../assets/map/loop-switch-off.png">
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="panel-bottom">
      <div class="control-panel-time">更新时间：{{detail.uptime | formDate}}</div>
      <div class="control-panel-status">{{detail.status | loopStatusNameConverter}}</div>
      <div @click="controlStatus" class="control-panel-control">获取状态</div>
    </div>
  </div>
</template>
<script>
    import Services from "../../services/map";
    import CommonConstant from "../../constants/common";
    import Config from "../../config";
    export default{
        name: 'loopComponent',
        data() {
            return {
                currentLoopControl: [],
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
        computed: {
            loopControl: function () {
               if (!this.detail.loopcontrol) {
                   return []
               } else {
                   return this.detail.loopcontrol.split('.')
               }
            }
        },
        created() {
            this.initData();
        },
        methods: {
            initData(){
                this.currentLoopControl = this.loopControl;
                this.getDetail()
            },
            hide() {
                this.$emit('hide');
            },
            showConfirm(value) {
                this.$refs.lightBtns.style.bottom = 1.4 * value - 20 + 'px';
                this.isShowConfirm = true;
            },
            controlStatus() {
                let data = {controltype: 4}
                Services.controlLoop(this.detail.deviceid, data).then(res => {
//                    this.resetTimes();
                    this.getDetail()
                })
            },
            loopSwitch(loop, switchStatus) {
                Services.controlLoop(this.detail.deviceid, {controltype: 1, loop: loop, switchtype: switchStatus}).then(res => {
                    if (switchStatus == 2) {
                        this.currentLoopControl.forEach((item, index) => {
                            if (item == loop) {
                                this.currentLoopControl.splice(index, 1)
                            }
                        })
                    } else {
                        this.currentLoopControl.push(loop)
                    }
                })
            },
            currentLoopStatus(loop) {
                return this.currentLoopControl.some(item => {
                    return item == loop;
                })
            },
            getDetail() {
                Services.getDetail({moduletype: this.moduleType.loop, deviceid: this.id}).then(detail => {
                    this.detail = detail;
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
                    moduletype: this.moduleType.loop,
                    sn: data.sn,
                    status: data.status,
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
                this.TIMER = setTimeout(() => {
                    if (this.REFRESH_TIMES) {
                        this.REFRESH_TIMES --;
                        this.getDetail();
                        this.refreshDetail();
                    }
                }, Config.REFRESH_INTERVAL)
            },
        },
        watch: {
            loopControl: function (val) {
                this.currentLoopControl = val;
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
    flex-direction: column;
    .panel-img {
      text-align: center;
      img {
        height: 140px;
      }
    }
    .loop-switch{
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      padding: 37px 20px 0;
      img{
        cursor: pointer;
      }
    }
  }
  .panel-bottom{
    margin-top: 31px;
  }
</style>