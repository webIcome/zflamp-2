<template>
  <div>
    <el-input :disabled="!companyId" type="text" v-model="modelnum" placeholder="选择灯具" @focus="dialogSelect" @change="changeSelect" clearable></el-input>
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
          <el-table-column label="额定电流/A" prop="ratedcurrent" align="center"></el-table-column>
          <el-table-column label="额定电压/V" prop="ratedvoltage" align="center"></el-table-column>
        </el-table>
        <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNum" :pages="searchParams.pages"
                          @pagingEvent='pagingEvent'></paging-component>
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
            dialogSelect: function () {
                this.findList(this.defaultPaging);
                this.dialogVisible = true;
            },
            select: function (val) {
                this.dialogVisible = false;
                this.$emit('input', val.objectid);
                this.$emit('name', val.modelnum);
            },
            changeSelect: function (val) {
                this.$emit('input', '');
                this.$emit('name', '');
            },
        }
    }
</script>