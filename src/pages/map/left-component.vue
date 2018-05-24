<template>
  <div class="left-position">
    <div class="left-position-container">
      <div class="go-home" @click="goToHome">进入列表管理</div>
      <div class="device-items">
        <el-badge class="device-item" :hidden="true">
          <div class="device-ap" :class="{active: apActive}" @click.self="selectCheck(moduleType.station)"><span class="icon"></span>AP</div>
          <sup @click="showList(apList)" v-if="apList.length" class="el-badge__content is-fixed">{{apList.length}}</sup>
        </el-badge>
        <el-badge class="device-item" :hidden="true">
          <div class="device-lamp" :class="{active: lightActive}" @click.self="selectCheck(moduleType.light)"><span class="icon"></span>灯控器</div>
          <sup @click="showList(lightList)" v-if="lightList.length" class="el-badge__content is-fixed">{{lightList.length}}</sup>
        </el-badge>
        <el-badge class="device-item" :hidden="true">
          <div class="device-loop" :class="{active: loopActive}" @click.self="selectCheck(moduleType.loop)"><span class="icon"></span>回路控制器</div>
          <sup @click="showList(loopList)" v-if="loopList.length" class="el-badge__content is-fixed">{{loopList.length}}</sup>
        </el-badge>
        <el-badge class="device-item" :hidden="true">
          <div class="device-well" :class="{active: wellActive}" @click.self="selectCheck(moduleType.well)"><span class="icon"></span>井盖</div>
          <sup @click="showList(wellFaultList)" v-if="wellFaultList.length" class="el-badge__content is-fixed">{{wellFaultList.length}}</sup>
        </el-badge>
      </div>
      <div class="select-items">
        <tree-select-component class="home" v-model="companyid" :list="companies"></tree-select-component>
      </div>
      <div v-if="isListShow" class="show-err-list">
        <div @click="hidden" class="close">&times;</div>
        <div class="list">
          <table class="table">
            <thead>
            <th>设备名称</th>
            <th>设备ID</th>
            <th>告警类型</th>
            </thead>
            <tbody>
            <tr v-for="log in currentList">
              <td>{{log.devicename}}</td>
              <td>{{log.sn}}</td>
              <td>{{statusModuleType(log)}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import CommonContent from "../../constants/common";
    import Config from "../../config";
    export default {
        name: 'leftComponent',
        data() {
            return {
                checkList: [1, 2, 3, 4],
                moduleType:{},
                companies: [],
                companyid: '',
                apActive: false,
                lightActive: false,
                loopActive: false,
                wellActive: false,
                currentList: [],
                isListShow: false,
            }
        },
        props: {
            list: {
                default: function () {
                    return []
                }
            },
            wellList: {
                default: function () {
                    return []
                }
            }
        },
        computed: {
            lightList: function () {
               return this.list.filter(item => {
                    if (item.status != 1 && item.moduletype == this.moduleType.light){
                        return true;
                    } else {
                        return false
                    }
                })
            },
            loopList: function () {
                return this.list.filter(item => {
                    if (item.status != 1 && item.moduletype == this.moduleType.loop){
                        return true;
                    } else {
                        return false
                    }
                })
            },
            apList: function () {
                return this.list.filter(item => {
                    if (item.status != 1 && item.moduletype == this.moduleType.station){
                        return true;
                    } else {
                        return false
                    }
                })
            },
            wellFaultList: function () {
                return this.wellList.filter(item => {
                    if (item.status != 0 && item.moduletype == this.moduleType.well){
                        return true;
                    } else {
                        return false
                    }
                })
            }
        },
        created() {
            this.initData()
        },
        methods: {
            initData() {
                CommonContent.deviceType.forEach(item => {
                    this.moduleType[item.name] = item.value;
                })
                this.moduleType.well = 4;
                this.initCompanies();
                this.searchWell({compIds: this.companyid})
                this.search({companyid: this.companyid, moduletype: this.checkList})
                this.showActive();
            },
            initItems() {
                this.$globalCache.items.then(data => {
                    this.items = data;
                })
            },
            initCompanies() {
                this.$globalCache.companies.then(companies => {
                    this.companies = companies;
                })
            },
            search(params) {
                if (!params.moduletype) {
                    params.moduletype = [];
                }
                params.moduletype = params.moduletype.join(',');
                this.$emit('search', params)
            },
            searchWell(params) {
                this.$emit('searchWell', params);
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
                if (this.checkList.some(item => item == this.moduleType.well)) {
                    this.searchWell({compIds: this.companyid})
                } else if (value == this.moduleType.well) {
                    this.searchWell({compIds: this.companyid, clear: true})
                }
                if (value != this.moduleType.well){
                    this.search({companyid: this.companyid, moduletype: this.checkList})
                }
            },
            goToHome: function () {
                this.$router.push({path: '/list'})
            },
            showActive() {
                this.apActive = false;
                this.lightActive = false;
                this.loopActive = false;
                this.wellActive = false;
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
                        case this.moduleType.well:
                            this.wellActive = true;
                        default:
                            break;
                    }
                })
            },
            showList(list) {
                this.isListShow = true;
                this.currentList = list;
            },
            statusModuleType(device) {
                let statusArr = [];
                switch (device.moduletype) {
                    case this.moduleType.station:
                        statusArr = CommonContent.apState;
                        break;
                    case this.moduleType.light:
                        statusArr = CommonContent.lightStatus;
                        break;
                    case this.moduleType.loop:
                        statusArr = CommonContent.loopStatus;
                        break;
                    case this.moduleType.well:
                        statusArr = CommonContent.wellStatus;
                    default:
                        break;
                }
                let name = device.status;
                statusArr.forEach(item => {
                    if (device.status == item.value) {
                        name = item.text;
                    }
                });
                return name;
            },
            hidden() {
                this.isListShow = false;
            }
        },
        watch: {
            companyid(newVal, oldVal) {
                if (this.checkList.some(item => item == this.moduleType.well)) {
                    this.searchWell({compIds: newVal})
                } else {
                    this.search({companyid: newVal, moduletype: this.checkList});
                }
            },
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
        /*top: 157px;*/
        width: 100px;
        font-size: 14px;
        .device-item{
          position: relative;
          top: 51px;
        }
        .device-ap,
        .device-lamp,
        .device-loop,
        .device-well{
          position: relative;
          /*top: 51px;*/
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
            color: #4689d7;
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
          &:hover,
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
          &:hover,
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
          &:hover,
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
          &:hover,
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
      .show-err-list {
        background: #fff;
        position: absolute;
        left: 180px;
        top: 100px;
        width: 400px;
        height: 300px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
        border-radius: 4px;
        padding: 10px;
        .close {
          font-size: 25px;
        }
        .table {
          td {
            border: none !important;
          }
          th {
            padding: 8px !important;
          }
          tbody {
            display:block;
            height:210px;
            overflow-y:auto;
          }
          thead, tbody tr {
            display:table;
            width:100%;
            table-layout:fixed;
          }
        }
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