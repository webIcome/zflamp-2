<template>
  <div class="left-position">
    <div class="left-position-container">
      <div class="go-home" @click="goToHome">进入列表管理</div>
      <div class="device-items">
        <el-checkbox-group v-model="checkList" style="font-size: inherit">
          <div class="device-ap" @click.self="selectCheck(moduleType.station)">AP<el-checkbox class="item-checkbox" :label="moduleType.station"></el-checkbox></div>
          <div class="device-lamp" @click.self="selectCheck(moduleType.light)">灯具<el-checkbox class="item-checkbox" :label="moduleType.light"></el-checkbox></div>
          <div class="device-loop" @click.self="selectCheck(moduleType.loop)">回路控制器<el-checkbox class="item-checkbox" :label="moduleType.loop"></el-checkbox></div>
        </el-checkbox-group>
      </div>
      <div class="select-items">
        <tree-select-component v-model="companyid" :list="companies"></tree-select-component>
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
                checkList: [1, 2, 3],
                moduleType:{},
                companies: [],
                companyid: ''
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
                this.initCompanies();
                this.search({moduletype: this.checkList})
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
                let filter = false;
                this.checkList.forEach((item, index) => {
                    if (item == value) {
                        this.checkList.splice(index, 1);
                        filter = true;
                    }
                })
                if (!filter) this.checkList.push(value)
            },
            goToHome: function () {
                this.$router.push({path: '/list'})
            },
        },
        watch: {
            companyid(newVal, oldVal) {
                this.search({companyid: newVal, moduletype: this.checkList});
            },
            checkList(newVal,oldVal) {
                this.search({companyid: this.companyid, moduletype: newVal})
            }
        }
    }
</script>
<style lang="less" scoped>
  .left-position {
    position: absolute;
    left: 20px;
    top: 20px;
    .left-position-container {
      position: relative;
      .go-home {
        background: #1789e1;
        color: #fff;
        padding: 0px 10px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        border-radius: 5px;
        &:hover,
        &:active{
          background: #005baa;
        }
      }
      .device-items {
        position: absolute;
        left: 25px;
        top: 100px;
        width: 100px;
        .device-ap,
        .device-lamp,
        .device-loop {
          position: relative;
          width: 80px;
          height: 60px;
          margin: 20px 0;
          text-align: center;
          line-height: 60px;
          background: #1789e1;
          color: #fff;
          border-radius: 2px;
          cursor: pointer;
          .item-checkbox {
            position: absolute;
            right: 6px;
            bottom: 3px;
            line-height: normal;
            margin: 0;
          }
        }
      }
      .select-items {
        position: absolute;
        left: 150px;
        top: 0px;
        width: 250px;
      }
    }
  }
</style>