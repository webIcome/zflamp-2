<template>
  <div>
    <el-button :disabled="!companyId" v-if="!modelnum" type="primary" @click="showModal">选择</el-button>
    <div v-else class="show-text" @click="showModal">{{modelnum}}11<span class="clear" @click.stop="clearSelect">&times;</span></div>
    <el-dialog title="选择灯具" :visible.sync="dialogVisible" center :width="'600px'"  append-to-body>
      <el-form :inline="true" label-width="170px" :model="searchParams">
        <el-form-item prop="switchstate">
          <el-input type="text" v-model="searchParams.modelnum" placeholder="输入灯具型号"></el-input>
        </el-form-item>
        <el-button type="primary" @click="findList" icon="el-icon-search">筛选</el-button>
      </el-form>
      <div>
        <el-table ref="singleTable" :data="list" border class="table" @row-click="select" highlight-current-row>
          <el-table-column label="灯具型号" prop="modelnum" align="center"></el-table-column>
          <el-table-column label="归属项目" prop="companyname" align="center"></el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
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
    </el-dialog>
  </div>
</template>
<script>
    import LampsServices from "../../../services/lamps";
    import Config from "../../../config";
    import CommonConstant from "../../../constants/common";
    export default {
        data() {
            return {
                searchParams: {
                    modelnum: '',
                },
                deviceType: [],
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
                dialogVisible: false,
                list: []
            }
        },
        props: {
            modelnum: {
                default: ''
            },
            companyId: {
                default: ''
            }
        },
        created: function () {
            this.initData()
        },
        methods: {
            initData: function () {
                this.initCommonConstants();
            },
            initCommonConstants: function () {
                this.deviceType = CommonConstant.deviceType;
            },
            pagingEvent: function (pageNumber) {
                this.searchParams.pageNum = pageNumber;
                this.findList(this.searchParams);
            },
            search: function () {
                this.findList(Object.assign(this.searchParams, this.defaultPaging))
            },
            findList: function (params) {
                params.companyid = this.companyId;
                LampsServices.findList(params).then(data => {
                    this.searchParams.pageNum = data.pageNum;
                    this.searchParams.pages = data.pages;
                    this.searchParams.pageSize = data.pageSize;
                    this.list = data.list;
                })
            },
            showModal: function () {
                this.findList(this.defaultPaging);
                this.dialogVisible = true;
            },
            select: function (val) {
                this.dialogVisible = false;
                this.$emit('input', val.objectid);
                this.$emit('name', val.modelnum);
            },
            clearSelect: function (val) {
                this.$emit('input', '');
                this.$emit('name', '');
            },
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