<template>
  <div class="group-transfer">
    <div class="transfer-left">
      <div class="transfer-title">{{titles[0]}}</div>
      <div class="transfer-table">
        <el-table
            :data="leftList"
            @selection-change="handleLeftSelectionChange">
          <el-table-column type="selection" width="55" :selectable="isSelectable"></el-table-column>
          <el-table-column prop="devicename" label="设备名称"></el-table-column>
          <el-table-column prop="sn" label="设备ID"></el-table-column>
          <el-table-column label="替换组">
            <template slot-scope="scope">
              <el-select v-if="!isSelectable(scope.row)" v-model="scope.row.exceptgroupid" placeholder="替换组" clearable style="width: 100%;">
                <el-option v-for="type in scope.row.group" :value="type.value" :key="type.value" :label="type.text"></el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <div class="transfer-pagging">
        <slot name="left-footer"></slot>
      </div>
    </div>
    <div class="el-transfer__buttons">
      <el-button @click="toLeft" type="primary" class="el-transfer__button" :disabled="leftBtnDisabled"><span><i class="el-icon-arrow-left"></i></span></el-button>
      <el-button @click="toRight" type="primary" class="el-transfer__button" :disabled="rightBtnDisabled"><span><i class="el-icon-arrow-right"></i></span></el-button>
    </div>
    <div class="transfer-right">
      <div class="transfer-title">{{titles[1]}}</div>
      <div class="transfer-table">
        <el-table
            :data="rightList"
            @selection-change="handleRightSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="devicename" label="设备名称"></el-table-column>
          <el-table-column prop="sn" label="设备ID"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
    export default{
        name: 'transferComponent',
        data(){
            return {
                selectingLeft: [],
                selectingRight: [],
                selected: [],
                moveItems: {},
            }
        },
        props: {
            data: {
                default: function () {
                    return [];
                }
            },
            titles: {
                default: function () {
                    return ['设备列表', '已选择列表'];
                }
            },
            value: {
                default: function () {
                    return [];
                }
            },
            props: {
                default: function () {
                    return {key: 'objectid'};
                }
            },
            groupid: ''
        },
        computed: {
            leftBtnDisabled: function () {
                return this.selectingRight.length == 0;
            },
            rightBtnDisabled: function () {
                return this.selectingLeft.length == 0;
            },
            leftList: function () {
                return this.data.filter(item => {
                    return !this.selected.some(i => {
                        if (!i) {
                            throw new Error()
                        }
                        return item[this.props.key] == i;
                    })
                })
            },
            rightList: function () {
                return this.data.filter(item => {
                    return this.selected.some(i => {
                        if (!i) {
                            throw new Error()
                        }
                        return item[this.props.key] == i;
                    })
                })
            }
        },
        created: function () {
            this.initData();
        },
        methods: {
            initData () {
                this.value.forEach(item => {
                    if (item) this.selected.push(item);
                })
            },
            toLeft() {
                this.selectingRight.forEach(item => {
                    this.moveItems[item[this.props.key]] = this.removeDeviceGroupId(item);
                    this.selected.splice(this.selected.indexOf(item[this.props.key]),1)
                })
                this.getMoveItems();
            },
            toRight() {
                this.selectingLeft.forEach(item => {
                    this.moveItems[item[this.props.key]] = this.addDeviceGroupId(item);
                    this.selected.push(item[this.props.key])
                })
                this.getMoveItems();
            },
            removeDeviceGroupId(device) {
                let groupIds = []
                device.group.forEach(item => {
                    if (item.value != this.groupid) groupIds.push(item.value)
                })
                return groupIds;
            },
            addDeviceGroupId(device) {
                let groupIds = []
                let filter = true;
                device.group.forEach(item => {
                    if (item.value != device.exceptgroupid) groupIds.push(item.value)
                    if (item.value == this.groupid) filter = false;
                })
                if (filter) groupIds.push(this.groupid);
                return groupIds;
            },
            handleLeftSelectionChange(val) {
                this.selectingLeft = val;
            },
            handleRightSelectionChange(val) {
                this.selectingRight = val;
            },
            transformSendData(val) {
                return val;
            },
            isSelectable(row, index) {
                if (row.group.length != 5) return true;
                if(row.group.length == 5 && !row.exceptgroupid) {
                   return row.group.some(item => {
                        if (item.value == this.groupid) {
                            return true;
                        } else {
                            return false
                        }
                    })
                } else {
                    return true;
                }
            },
            getMoveItems() {
                this.$emit('moveItems', this.moveItems);
            }
        },
        watch: {
            selected: function (newVal, oldVal) {
//                this.$emit('input', this.transformSendData(newVal))
            }
        }
    }
</script>
<style lang="less" scoped>
  .group-transfer {
    display: flex;
    align-items: flex-start;
    width: 100%;
    .transfer-title {
      height: 40px;
      line-height: 40px;
      background: #f5f7fa;
      margin: 0;
      padding-left: 15px;
      border-bottom: 1px solid #ebeef5;
      box-sizing: border-box;
      color: #000;
    }
    .el-transfer__buttons{
      align-self: center;
    }
    .transfer-left {
      position: relative;
      flex: 3 1 auto;
      border: 1px solid #ebeef5;
      height: 450px;
    }
    .transfer-right {
      flex: 2 1 auto;
      border: 1px solid #ebeef5;
      height: 450px;
    }
    .transfer-table {
      overflow-y: auto;
      height: 370px;
      padding: 15px;
    }
    .transfer-pagging {
      height: 40px;
      background: #fff;
      margin: 0;
      padding: 0;
      border-top: 1px solid #ebeef5;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 1;
    }
  }
</style>
<style lang="less">

</style>