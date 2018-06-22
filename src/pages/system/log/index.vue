<template>
  <div class="content-right">
    <div class="search-header">
      <form class="form-inline default-form">
        <div class="form-group">
          <label>操作时间</label>
          <el-date-picker id="date-start" v-model="searchParams.operationtimelow"  type="datetime" :value-format="'yyyy-MM-dd HH:mm:ss'" placeholder="选择开始时间"></el-date-picker>
        </div>
        <div class="form-group">
          <label>至</label>
          <el-date-picker id="date-end" v-model="searchParams.operationtimehigh" type="datetime" :value-format="'yyyy-MM-dd HH:mm:ss'" placeholder="选择结束时间"></el-date-picker>
        </div>
        <div class="form-group">
          <label>用户名</label>
          <el-input type="text" v-model="searchParams.loginname" placeholder="输入用户名" clearable/>
        </div>
        <!--<div class="form-group">
          <label>归属项目</label>
          <tree-select-component v-model="searchParams.companyid" :list="companies"></tree-select-component>
        </div>-->
        <div @click="search" class="form-group default-btn">查询</div>
        <div @click="clearSearchParams" class="form-group default-btn">清空</div>
      </form>
    </div>
    <el-table
        :data="list"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        class="my-table"
        :ref="tableRef">
      <el-table-column prop="operationtime" label="操作时间"></el-table-column>
      <el-table-column prop="operation" label="操作内容"></el-table-column>
      <el-table-column prop="loginname" label="用户名"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <!--<el-table-column prop="companyname" label="归属项目"></el-table-column>-->
    </el-table>
    <el-row type="flex" justify="end"  v-if="searchParams.pages">
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

</template>
<script>
    import Config from "../../../config";
    import Service from "../../../services/system";
    import CommonConstant from "../../../constants/common";
    export default {
        components: {

        },
        name: 'logPage',
        data() {
            return {
                searchParams: {},
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE
                },
                list: [],
                selectionList: [],
                companies: [],
                tableRef: 'my-table',
            }
        },
        created() {
            this.initList();
            this.initCompanies();
        },
        methods: {
            initList() {
                this.findList(this.defaultPaging);
            },
            initCompanies() {
                this.$globalCache.companies.then(companies => {
                    this.companies = companies;
                })
            },
            findList(params) {
                Service.findLogs(params).then(data => {
                    this.searchParams.pageNum = data.pageNum;
                    this.searchParams.pages = data.pages;
                    this.searchParams.pageSize = data.pageSize;
                    this.searchParams.total = data.total;
                    this.list = data.list;
                })
            },
            pagingEvent(pageNumber) {
                if (pageNumber) this.searchParams.pageNum = pageNumber;
                this.findList(this.searchParams);
            },
            search: function () {
                this.findList(Object.assign(this.searchParams, this.defaultPaging));
            },
            clearSearchParams: function (e) {
                this.searchParams = {};
                this.initList();
            },
            handleSelectionChange(val) {
                this.selectionList = val;
            }
        }
    }
</script>