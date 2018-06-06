<template>
  <div>
    <el-button :disabled="!companyid || !apId" v-if="!showText" type="primary" @click="showModal">选择</el-button>
    <div v-else class="show-text" @click="showModal">{{showText}}<span class="clear" @click.stop="clearSelect">&times;</span></div>
    <el-dialog title="选择回路控制器" :visible.sync="visible" center :width="'600px'" append-to-body>
      <el-form :inline="true" label-width="170px" :model="searchParams" ref="editGroup">
        <el-form-item prop="switchstate">
          <el-input type="text" v-model="searchParams.devicename" placeholder="输入设备名称"></el-input>
        </el-form-item>
        <el-button type="primary" @click="searchLoop" icon="el-icon-search">筛选</el-button>
      </el-form>
      <div>
        <el-table ref="singleTable" :data="list" border class="table" @current-change="select" highlight-current-row>
          <el-table-column label="名称" prop="devicename" align="center"></el-table-column>
          <el-table-column label="设备ID" prop="sn" align="center"></el-table-column>
          <el-table-column label="归属项目" prop="companyname" align="center"></el-table-column>
        </el-table>
        <el-row type="flex" justify="end" v-if="searchParams.pages">
          <el-pagination
              background
              :current-page="searchParams.pageNum"
              layout="total, prev, pager, next, jumper"
              :page-size="searchParams.pageSize"
              @current-change="pagingEvent"
              :total="searchParams.total">
          </el-pagination>
        </el-row>
      </div>
      <el-form style="margin-top: 10px; padding: 0" label-width="" :model="data" :rules="Rules" ref="loopnum" class="el-form-default">
        <el-form-item label="" prop="number">
          <el-select style="max-width: 280px" v-model="data.number" clearable placeholder="请选择回路控制器的某一线路">
            <el-option v-for="item in loopnum" :value="item" :label="item + ' 线路'" :key="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button  type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import loopService from '../../../services/loop'
    export default {
        name: 'selectLoopComponent',
        data() {
            return {
                visible: false,
                searchParams: {},
                list: [],
                selectedSn: '',
                selectedDeviceId: '',
                number: '',
                loopnum: '',
                data: {number: ''},
                Rules: {
                    number: [
                        {required: true, message: '先选择回路控制器然后选择回路控制器的某一线路'},
                    ],
                }
            }
        },
        props: {
            companyid: {
                default: ''
            },
            value: '',
            apId: ''
        },
        computed: {
            showText: function () {
                if (this.value) {
                    return this.value.slice(0, 2).join('-');
                } else {
                    return '';
                }
            },
        },
        methods: {
            searchLoop() {
                this.findList(this.searchParams)
            },
            pagingEvent: function (pageNum) {
                this.searchParams.pageNum = pageNum;
                this.findList(this.searchParams);
            },
            findList(params) {
                loopService.findList(params).then(data => {
                    this.searchParams.pageNum = data.pageNum;
                    this.searchParams.pages = data.pages;
                    this.searchParams.pageSize = data.pageSize;
                    this.list = data.list;
                })
            },
            select(val){
                this.selectedDeviceId = val.deviceid;
                this.selectedSn = val.sn;
                this.loopnum = val.loopnum;
                if (this.loopnum) this.data.number = 1;
            },
            confirm() {
                this.$refs.loopnum.validate(valid => {
                    if (valid) {
                        if (this.selectedSn && this.data.number) {
                            this.$emit('input',[this.selectedSn, this.data.number,  this.selectedDeviceId]);
                            this.hideModal();
                        } else {
                            this.showMessage();
                        }
                    }
                })
            },
            changeSelect: function (val) {
                if (!val) {
                    this.clearSelect();
                }
            },
            clearSelect() {
                this.$emit('input', '')
            },
            showMessage() {
                this.$message({
                    message: '请选择回路控制器和填写回路数',
                    type: 'warning',
                    duration: 1500
                })
            },
            showModal() {
                this.visible = true;
                this.searchParams = {};
                this.searchParams.companyid = this.companyid;
                this.searchParams.apuid = this.apId;
                this.findList(this.searchParams)
            },
            hideModal() {
                this.visible = false;
            }
        },
        watch: {
            companyid: function (newValue, oldValue) {
                if (oldValue) this.clearSelect();
            }
        }
    }
</script>
<style lang="less" scoped>
  .show-text {
    position: relative;
    cursor: pointer;
    color: #1789e1;
    &:hover {
      color: #2b71b8;
    }
  }
  .clear {
    position: absolute;
    right: 10px;
    top: 50%;
    user-select: none;
    margin-top: -13px;
    cursor: pointer;
    font-size: 21px;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .2;
    &:hover {
      color: #000;
      text-decoration: none;
      cursor: pointer;
      opacity: .5;
    }
  }
</style>