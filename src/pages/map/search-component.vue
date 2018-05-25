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
                isShowConfirm: false,
                moduleType: {}
            }
        },
        props: {
            isShow: {
                default: false
            },
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
            findList(value) {
                this.loading = true;
                this.list = [];
                Services.findDevices(value).then(devices => {
                    this.loading = false;
                    this.list = this.list.concat(this.getTransformList(devices))
                }).catch(err => {
                    this.loading = false
                });
                WellServices.getList({keys: value, pageSize: 5, pageNum: 1}).then(wellList => {
                    this.loading = false;
                    this.list = this.list.concat(this.getTransformWellList(wellList))
                }).catch(err => {
                    this.loading = false
                });
                /*Promise.all([Services.findDevices(value),WellServices.getList({keys: value, pageSize: 10, pageNum: 1})]).then(([devices,wellList]) => {
                    this.loading = false;
                    this.list = this.getTransformList(devices).concat(this.getTransformWellList(wellList));
                }).catch(err => {
                    this.loading = false
                });*/
            },
            getTransformList(list) {
                return list.map(item => {
                    let label = this.$common.getLabel(item.moduletype, CommonConstant.deviceType) + ':' + item.devicename + "/" + item.sn;
                    return {value: JSON.stringify(item), label: label}
                });
            },
            getTransformWellList(list) {
                return list.map(item => {
                    let label = '井盖:' + item.deviceName + "/" + item.sn;
                    return {value: JSON.stringify(item), label: label}
                });
            },
            search(value) {
                if (value) {
                    value = JSON.parse(value);
                } else {
                    value = {}
                }
                if (value.moduletype) {
                    this.$emit('search', {deviceid: value.deviceid, moduletype: value.moduletype})
                } else {
                    this.$emit('searchWell', value.id)
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