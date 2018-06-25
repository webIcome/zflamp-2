<template>
  <div class="search">
    <el-select class="map-search" v-model="id"
               :remote-method="findList"
               :loading="loading"
               placeholder="输入名称或ID"
               filterable remote @change="search" clearable>
      <el-option
          v-for="item in list"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>
<script>
    import Services from "../../services/map";
    import CommonConstant from "../../constants/common";
    import WellServices from '../../services/well'
    export default{
        name: 'rightPosition',
        data() {
            return {
                id: '',
                loading: false,
                list: [],
                detail: {}
            }
        },
        props: {
            moduleType: {
                default: function () {
                    return {}
                }
            }
        },
        created() {
            this.initData();
        },
        methods: {
            initData(){

            },
            findList(value) {
                this.loading = true;
                this.list = [];
                if (!value) return;
                Services.findDevices(value).then(devices => {
                    this.loading = false;
                    this.list = this.list.concat(this.getTransformList(devices))
                }).catch(err => {
                    this.loading = false
                });
                Services.findTerminalList(value).then(list => {
                    this.loading = false;
                    this.list = this.list.concat(this.getTransformTerminalList(list))
                }).catch(err => {
                    this.loading = false
                });
            },
            getTransformList(list) {
                return list.map(item => {
                    let label = this.$common.getLabel(item.moduletype, CommonConstant.deviceType) + ':' + item.devicename + "/" + item.sn;
                    return {value: JSON.stringify(item), label: label}
                });
            },
            getTransformTerminalList(list) {
                return list.map(item => {
                    let label = this.$common.getLabel(item.terminalType, CommonConstant.terminalType) + ':' + item.deviceName + "/" + item.sn;
                    return {value: JSON.stringify(item), label: label}
                });
            },
            search(value) {
                if (value) {
                    value = JSON.parse(value);
                } else {
                    value = {}
                }
                console.log(value)
                if (value.moduletype <= CommonConstant.deviceType.length) {
                    this.$emit('search', {id: value.deviceid, moduletype: value.moduletype})
                } else {
                    this.$emit('search', {id: value.deviceId, moduletype: value.terminalType + CommonConstant.deviceType.length})
                }
            },
        }
    }
</script>
<style lang="less" scoped>

</style>
<style lang="less">
  .map-search {
    width: 100%;
    &.el-select .el-input.is-focus .el-input__inner {
      border-color: #c0c4cc;
    }
    .el-input__inner {
      background: #fff;
      color: #333;
      font-size: 20px;
      padding: 10px 20px;
      padding-right: 35px;
      height: 48px;
      line-height: 48px;
      cursor: pointer;
      border-radius: 4px;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
      &:hover,
      &:focus {
        border-color: #c0c4cc;
      }
    }
  }
</style>