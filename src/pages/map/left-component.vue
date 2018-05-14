<template>
  <div class="left-position">
    <div class="left-position-container">
      <div class="go-home" @click="goToHome">进入列表管理</div>
      <div class="device-items">
          <div class="device-ap" :class="{active: apActive}" @click.self="selectCheck(moduleType.station)"><span class="icon"></span>AP</div>
          <div class="device-lamp" :class="{active: lightActive}" @click.self="selectCheck(moduleType.light)"><span class="icon"></span>灯控器</div>
          <div class="device-loop" :class="{active: loopActive}" @click.self="selectCheck(moduleType.loop)"><span class="icon"></span>回路控制器</div>
          <div class="device-well" :class="{active: wellActive}" @click.self="selectCheck(moduleType.well)"><span class="icon"></span>井盖</div>
      </div>
      <div class="select-items">
        <tree-select-component class="home" v-model="companyid" :list="companies"></tree-select-component>
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
                this.selectCheck()
//                this.search({moduletype: this.checkList})
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
                this.search({companyid: this.companyid, moduletype: this.checkList})
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
            }
        },
        watch: {
            companyid(newVal, oldVal) {
                this.search({companyid: newVal, moduletype: this.checkList});
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
        .device-ap,
        .device-lamp,
        .device-loop,
        .device-well{
          position: relative;
          top: 51px;
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
          }
          .icon {
            display: inline-block;
            width: 30px;
            height: 100%;
            margin-left: 14px;
            margin-right: 7px;
            background-size: contain;
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
            background: url("../../assets/home/device-active.png") no-repeat center;
          }
        }
        .device-lamp {
          .icon {
            background: url("../../assets/home/device-active.png") no-repeat center;
          }
        }
        .device-loop {
          .icon {
            background: url("../../assets/home/device-active.png") no-repeat center;
          }
        }
        .device-well {
          .icon {
            background: url("../../assets/home/device-active.png") no-repeat center;
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