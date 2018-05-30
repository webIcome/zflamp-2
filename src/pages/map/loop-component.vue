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
                moduleType: {},
                currentLoopControl: [],
            }
        },
        props: {
            detail: {
                default: () => {
                    return {}
                }
            }
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
                CommonConstant.deviceType.forEach(item => {
                    this.moduleType[item.name] = item.value;
                })
                this.currentLoopControl = Array.concat(this.loopControl);
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
                    this.updateDetail({deviceid: this.detail.deviceid, moduletype: this.moduleType.loop})
                })
            },
            loopSwitch(loop, switchStatus) {
                Services.controlLoop(this.detail.deviceid, {controltype: 1, loop: loop, switchtype: switchStatus}).then(res => {
                    if (switchStatus == 2) {
                        this.currentLoopControl.splice(this.currentLoopControl.indexOf(loop),1)
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
            hideShowConfirm() {
                this.isShowConfirm = false;
            },
            updateDetail(data) {
                this.$emit('updateDetail', {deviceid: data.deviceid, moduletype: data.moduletype})
            }
        },
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