<template>
  <div class="left-position">
    <div class="left-position-container">
      <div class="go-home" @click="goToHome">进入列表管理</div>
      <div class="device-items">
        <el-badge class="device-item" :hidden="true">
          <div class="device-ap" :class="{active: apActive}" @click="selectCheck(moduleType.station)"><span class="icon"></span>AP</div>
          <sup @click="showList(apList)" v-if="apList.length" class="el-badge__content is-fixed">{{apList.length}}</sup>
        </el-badge>
        <el-badge class="device-item" :hidden="true">
          <div class="device-lamp" :class="{active: lightActive}" @click="selectCheck(moduleType.light)"><span class="icon"></span>灯控器</div>
          <sup @click="showList(lightList)" v-if="lightList.length" class="el-badge__content is-fixed">{{lightList.length}}</sup>
        </el-badge>
        <el-badge class="device-item" :hidden="true">
          <div class="device-loop" :class="{active: loopActive}" @click="selectCheck(moduleType.loop)"><span class="icon"></span>回路控制器</div>
          <sup @click="showList(loopList)" v-if="loopList.length" class="el-badge__content is-fixed">{{loopList.length}}</sup>
        </el-badge>
        <terminal-component @updateList="getTerminalList" :companyid="companyid" @hide="hidden" :moduleType="moduleType"></terminal-component>
      </div>
      <div class="select-items">
        <tree-select-component class="home" v-model="companyid" :list="companies"></tree-select-component>
      </div>
      <device-alarm-list-component v-if="isListShow" :list="currentList" @hide="hidden"></device-alarm-list-component>
    </div>
  </div>
</template>
<script>
    import CommonContent from "../../constants/common";
    import Config from "../../config";
    import MapServices from "../../services/map";
    import DeviceAlarmListComponent from "./device-alarm-list-component";
    import TerminalComponent from "./terminal-list/index.vue";
    export default {
        components: {TerminalComponent, DeviceAlarmListComponent},
        name: 'leftComponent',
        data() {
            return {
                checkList: [1, 2, 3],
                companies: [],
                devicesList: [],
                terminalList: [],
                companyid: '',
                apActive: false,
                lightActive: false,
                loopActive: false,
                currentList: [],
                isListShow: false,
            }
        },
        props: {
            moduleType: {
                default: function () {
                    return {}
                }
            }
        },
        computed: {
            lightList: function () {
               return this.devicesList.filter(item => {
                    if (item.status == 3 && item.moduletype == this.moduleType.light){
                        return true;
                    } else {
                        return false
                    }
                }).map(item => {
                   let name = item.status;
                   CommonContent.lightStatus.forEach(i => {
                       if (item.status == i.value) {
                           name = i.text;
                       }
                   });
                   return {
                       deviceName: item.devicename,
                       sn: item.sn,
                       statusName: name
                   }
               })
            },
            loopList: function () {
                return this.devicesList.filter(item => {
                    if (item.status != 1 && item.moduletype == this.moduleType.loop){
                        return true;
                    } else {
                        return false
                    }
                }).map(item => {
                    let name = item.status;
                    CommonContent.loopStatus.forEach(i => {
                        if (item.status == i.value) {
                            name = i.text;
                        }
                    });
                    return {
                        deviceName: item.devicename,
                        sn: item.sn,
                        statusName: name
                    }
                })
            },
            apList: function () {
                return this.devicesList.filter(item => {
                    if (item.status != 1 && item.moduletype == this.moduleType.station){
                        return true;
                    } else {
                        return false
                    }
                }).map(item => {
                    let name = item.status;
                    CommonContent.apMapState.forEach(i => {
                        if (item.status == i.value) {
                            name = i.text;
                        }
                    });
                    return {
                        deviceName: item.devicename,
                        sn: item.sn,
                        statusName: name
                    }
                })
            },
        },
        created() {
            this.initData()
        },
        methods: {
            initData() {
                this.initCompanies();
                this.getDevicesList({companyid: this.companyid, moduletype: this.checkList.join()})
                this.showActive();
            },
            initCompanies() {
                this.$globalCache.companies.then(companies => {
                    this.companies = companies;
                })
            },
            getDevicesList(params) {
                MapServices.getDevices(params).then(devices => {
                    this.devicesList = this.transformDevicesList(devices);
                })
            },
            transformDevicesList(devices) {
                return devices.map(item => {
                    item.lng = item.longitude;
                    item.lat = item.latitude;
                    if (item.lng != 0 || item.lat != 0) {
                        return item;
                    }
                }).filter(item => {
                    if (item) {
                        return true;
                    } else {
                        return false;
                    }
                })
            },
            selectCheck(value) {
                if (value) {
                    let filter = false;
                    this.checkList.forEach((item, index) => {
                        if (item == value) {
                            this.checkList.splice(index, 1);
                            filter = true;
                        }
                    })
                    if (!filter) this.checkList.push(value);
                }
                this.showActive();
                this.getDevicesList({companyid: this.companyid, moduletype: this.checkList.join()})
            },
            goToHome: function () {
                this.$router.push({path: '/list'})
            },
            showActive() {
                this.apActive = false;
                this.lightActive = false;
                this.loopActive = false;
                this.checkList.forEach(item => {
                    switch (item) {
                        case this.moduleType.station:
                            this.apActive = true;
                            break;
                        case this.moduleType.light:
                            this.lightActive = true;
                            break;
                        case this.moduleType.loop:
                            this.loopActive = true;
                            break;
                        default:
                            break;
                    }
                })
            },
            getTerminalList(list) {
                this.terminalList = list;
            },
            updateList(list) {
                this.$emit('updateList', list)
            },
            showList(list) {
                if (this.isListShow &&  this.currentList == list) {
                    this.hidden();
                    return
                }
                this.isListShow = true;
                this.currentList = list;
            },
            hidden() {
                this.isListShow = false;
            }
        },
        watch: {
            companyid(newVal, oldVal) {
                this.getDevicesList({companyid: this.companyid, moduletype: this.checkList.join()})
            },
            devicesList(newVal) {
                this.updateList(newVal.concat(this.terminalList))
            },
            terminalList(newVal) {
                this.updateList(newVal.concat(this.devicesList))
            }
        }
    }
</script>
<style lang="less" scoped>
  .left-position {
    position: absolute;
    left: 46px;
    top: 48px;
    .left-position-container {
      position: relative;
      .go-home {
        background: #fff;
        color: #4689d7;
        font-size: 20px;
        padding: 10px 20px;
        cursor: pointer;
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
        &:hover,
        &:active{
          transform: scale(1.02);
        }
      }
      .device-items {
        position: absolute;
        top: 100px;
        width: 100px;
        font-size: 14px;
        .device-item{
          position: relative;
        }
        .device-ap,
        .device-lamp,
        .device-loop,
        .device-well{
          position: relative;
          display: flex;
          align-items: center;
          width: 128px;
          height: 60px;
          box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
          margin-bottom: 10px;
          text-align: center;
          line-height: 60px;
          background: #fff;
          color: #7c8196;
          border-radius: 2px;
          cursor: pointer;
          &.active {
            color: #4689d7;
          }
          &:hover,
          &:active{
            transform: scale(1.02);
            /*color: #4689d7;*/
          }
          .icon {
            display: inline-block;
            width: 30px;
            height: 100%;
            margin-left: 14px;
            margin-right: 7px;
          }
          .item-checkbox {
            position: absolute;
            right: 6px;
            bottom: 3px;
            line-height: normal;
            margin: 0;
          }
        }
        .device-ap {
          .icon {
            background: url("../../assets/map/ap-off.png") no-repeat center;
            background-size: contain;
          }
          /*&:hover,*/
          &.active {
            .icon {
              background: url("../../assets/map/ap-avtive.png") no-repeat center;
              background-size: contain;
            }
          }
        }
        .device-lamp {
          .icon {
            background: url("../../assets/map/light-off.png") no-repeat center;
            background-size: contain;
          }
          /*&:hover,*/
          &.active {
            .icon {
              background: url("../../assets/map/light-active.png") no-repeat center;
              background-size: contain;
            }
          }
        }
        .device-loop {
          .icon {
            background: url("../../assets/map/loop-off.png") no-repeat center;
            background-size: contain;
          }
          /*&:hover,*/
          &.active {
            .icon {
              background: url("../../assets/map/loop-active.png") no-repeat center;
              background-size: contain;
            }
          }
        }
        .device-well {
          .icon {
            background: url("../../assets/map/well-off.png") no-repeat center;
            background-size: contain;
          }
          /*&:hover,*/
          &.active {
            .icon {
              background: url("../../assets/map/well-active.png") no-repeat center;
              background-size: contain;
            }
          }
        }
      }
      .select-items {
        position: absolute;
        left: 223px;
        top: 0px;
        width: 250px;
      }
    }
  }
</style>
<style lang="less">
  .map {
    .device-items {
      .device-item {
        sup {
          cursor: pointer;
        }
      }
    }
  }
</style>
<style src="./style.less" lang="less" scoped></style>