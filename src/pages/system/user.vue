<template>
  <div class="content-right">
    <form class="form-inline default-form">
      <div class="form-group">
        <label class="sr-only">归属企业：</label>
        <tree-select-component v-model="searchParams.companyid" :list="companies"></tree-select-component>
      </div>
      <div class="form-group">
        <label class="sr-only">用户名：</label>
        <el-input type="text" v-model="searchParams.loginname" placeholder="输入用户名" clearable></el-input>
      </div>
      <div class="form-group">
        <label class="sr-only">岗位名称：</label>
        <el-input type="text" v-model="searchParams.postname" placeholder="输入岗位名称" clearable></el-input>
      </div>

      <div @click="search" class="form-group default-btn">查询</div>
      <div @click="clearSearchParams" class="form-group default-btn">清空</div>
      <div class="pull-right">
        <oper-component :companies="companies" @initPaging="initList"></oper-component>
      </div>
    </form>
    <el-table
        :data="list"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        stripe
        class="my-table"
        :ref="tableRef">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column min-width="100" prop="loginname" label="用户名"></el-table-column>
      <el-table-column prop="companyname" label="归属项目"></el-table-column>
      <el-table-column prop="postname" label="归属岗位"></el-table-column>
      <el-table-column prop="email" label="电子邮箱"></el-table-column>
      <el-table-column label="有效期至" show-overflow-tooltip><template slot-scope="scope">{{scope.row.expiretime | formDate}}</template></el-table-column>
      <el-table-column label="创建时间" show-overflow-tooltip><template slot-scope="scope">{{scope.row.createtime | formDate}}</template></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row type="flex" justify="space-around">
            <oper-component ref="oper" :id="scope.row.deviceid" :companies="companies" :edit="true" @initCurrentPaging="pagingEvent"></oper-component>
            <delete-component :id="scope.row.deviceid" @initCurrentPaging="pagingEvent"></delete-component>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <detail-component :id="scope.row.deviceid"></detail-component>
        </template>
      </el-table-column>
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

</template>
<script>
    import Config from "../../config";
    import Service from "../../services/system";
    import CommonConstant from "../../constants/common";
    export default {
        components: {
        },
        name: 'userPage',
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
                Object.keys(this.searchParams).forEach(key => {
                    this.searchParams[key] = '';
                });
                this.initList();
            },
            handleSelectionChange(val) {
                this.selectionList = val;
            }
        }
    }
</script>