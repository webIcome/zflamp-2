<template>
  <div class="content-right">
    <div class="search-header">
      <form class="form-inline default-form">
        <div class="form-group">
          <label>用户名</label>
          <el-input type="text" v-model="searchParams.loginname" placeholder="输入用户名" clearable/>
        </div>
        <div class="form-group">
          <label>归属项目</label>
          <tree-select-component v-model="searchParams.companyid" :list="companies"></tree-select-component>
        </div>
        <div class="form-group">
          <label>岗位名称</label>
          <el-input type="text" v-model="searchParams.postname" placeholder="输入岗位名称" clearable/>
        </div>
        <list-search-btns-component @search="search" @clearSearchParams="clearSearchParams" @refresh="pagingEvent"></list-search-btns-component>
        <oper-component :companies="companies" @initPaging="initList"></oper-component>
      </form>
    </div>
    <el-table
        :data="list"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        class="my-table"
        :ref="tableRef">
      <el-table-column prop="loginname" label="用户名"></el-table-column>
      <el-table-column prop="companyname" label="归属项目"></el-table-column>
      <el-table-column prop="postname" label="归属岗位"></el-table-column>
      <el-table-column prop="email" label="电子邮箱"></el-table-column>
      <el-table-column label="有效期至"><template slot-scope="scope">{{scope.row.expiretime | formDate}}</template></el-table-column>
      <el-table-column label="创建时间"><template slot-scope="scope">{{scope.row.createtime | formDate}}</template></el-table-column>
      <el-table-column label="操作" width="170">
        <template slot-scope="scope">
          <el-row type="flex" justify="space-between">
            <oper-component ref="oper" :user="scope.row" :companies="companies" :edit="true" @initCurrentPaging="pagingEvent"></oper-component>
            <reset-password-component :id="scope.row.objectid" @initCurrentPaging="pagingEvent"></reset-password-component>
            <delete-component :id="scope.row.objectid" @initCurrentPaging="pagingEvent"></delete-component>
          </el-row>
        </template>
      </el-table-column>
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

</template>
<script>
    import Config from "../../../config";
    import Service from "../../../services/system";
    import CommonConstant from "../../../constants/common";
    import deleteComponent from "./delete-component.vue"
    import operComponent from "./oper-component.vue"
    import ResetPasswordComponent from "./reset-password-component";
    export default {
        components: {
            ResetPasswordComponent, deleteComponent,
            operComponent
        },
        name: 'taskPage',
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
                Service.findUsers(params).then(data => {
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