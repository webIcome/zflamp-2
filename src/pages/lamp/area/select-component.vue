<template>
  <div>
    <el-button :disabled="!companyid" v-if="!name" type="primary" @click="showModal">选择</el-button>
    <div v-else class="show-text" @click.self="showModal">{{name}}<span class="clear" @click.stop="changeSelect">&times;</span>
    </div>
    <el-dialog title="选择基站" :visible.sync="visible" center :width="'600px'" append-to-body>
      <el-form :inline="true" label-width="170px" :model="searchParams" ref="editGroup">
        <el-form-item prop="devicename">
          <el-input type="text" v-model="searchParams.devicename" placeholder="输入基站名称"></el-input>
        </el-form-item>
        <el-button type="primary" @click="search" icon="el-icon-search">筛选</el-button>
      </el-form>
      <div>
        <el-table ref="singleTable" :data="list" border class="table" @row-click="select" highlight-current-row>
          <el-table-column label="名称" prop="devicename" align="center"></el-table-column>
          <el-table-column label="设备ID" prop="sn" align="center"></el-table-column>
          <el-table-column label="归属项目" prop="companyname" align="center"></el-table-column>
        </el-table>
        <el-row type="flex" justify="end" v-if="paginationShow">
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
    import AreaService from '../../../services/area'
    import Config from "../../../config";
    export default {
        name: 'selectAreaComponent',
        data() {
            return {
                visible: false,
                searchParams: {},
                list: [],
                selectedDeviceId: '',
                number: '',
                loopnum: '',
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
                detail: {},
                name: ''
            }
        },
        props: {
            companyid: {
                default: ''
            },
            value: ''
        },
        created() {
            if (this.value) this.getDetail();
        },
        methods: {
            search() {
                this.findList(this.searchParams)
            },
            pagingEvent: function (pageNumber) {
                this.searchParams.pageNum = pageNumber;
                this.findList(this.searchParams);
            },
            search: function () {
                this.findList(Object.assign(this.searchParams, this.defaultPaging))
            },
            findList: function (params) {
                params.companyid = this.companyid;
                AreaService.findList(params).then(data => {
                    this.searchParams.pageNum = data.pageNum;
                    this.searchParams.pages = data.pages;
                    this.searchParams.pageSize = data.pageSize;
                    this.searchParams.total = data.total;
                    this.list = data.list;
                })
            },
            getDetail(){
                AreaService.getDetailBySn(this.value).then(data => {
                    this.detail = data;
                    this.name = this.detail.devicename
                })
            },
            showModal: function () {
                this.findList(this.defaultPaging);
                this.visible = true;
            },
            select: function (val) {
                this.visible = false;
                this.$emit('input', val.sn);
                this.name = val.devicename;
            },
            changeSelect: function (val) {
                this.$emit('input', '');
                this.name = '';
            },
        },
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