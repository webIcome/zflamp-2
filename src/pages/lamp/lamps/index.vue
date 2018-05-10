<template>
  <div class="content-right">
    <div class="search-header">
      <form class="form-inline default-form">
        <div class="form-group">
          <label >灯具型号</label>
          <el-input type="text" v-model="searchParams.modelnum" placeholder="输入灯具型号" clearable></el-input>
        </div>
        <div class="form-group">
          <label>归属项目</label>
          <tree-select-component v-model="searchParams.companyid" :list="companies"></tree-select-component>
        </div>
        <div @click="search" class="form-group default-btn">查询</div>
        <div @click="clearSearchParams" class="form-group default-btn">清空</div>
      </form>
      <div style="display: flex; align-items: center; margin-top: 22px;">
        <oper-component :companies="companies" @initPaging="initList"></oper-component>
      </div>
    </div>
    <el-table
        :data="list"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        class="my-table"
        :ref="tableRef">
      <el-table-column min-width="100" prop="modelnum" label="灯具型号"></el-table-column>
      <el-table-column prop="companyname" label="归属项目"></el-table-column>
      <el-table-column label="灯具类型"><template slot-scope="scope">{{scope.row.lamptype | lampTypeNameConverter}}</template></el-table-column>
      <el-table-column prop="lifetime" label="灯具寿命/H"></el-table-column>
      <el-table-column prop="power" label="灯具功率/W"></el-table-column>
      <el-table-column prop="lampcurrent" label="灯具额定电流/A"></el-table-column>
      <el-table-column prop="lampvol" label="灯具额定电压/V"></el-table-column>
      <el-table-column prop="notes" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-row type="flex" justify="space-between">
            <oper-component ref="oper" :id="scope.row.objectid" :companies="companies" :edit="true" @initCurrentPaging="pagingEvent"></oper-component>
            <delete-component :id="scope.row.objectid" @initCurrentPaging="pagingEvent"></delete-component>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <detail-component :id="scope.row.objectid"></detail-component>
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
    import Config from "../../../config";
    import Service from "../../../services/lamps";
    import operComponent from './oper-component.vue'
    import detailComponent from './detail-component.vue'
    import deleteComponent from './delete-component.vue'
    import CommonConstant from "../../../constants/common";
    export default {
        components: {
            operComponent,
            detailComponent,
            deleteComponent,
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
                taskCmd: CommonConstant.taskCmd,
                taskStatus: CommonConstant.taskStatus,
                periodType: CommonConstant.taskPeriodType,
                deviceType: CommonConstant.deviceType.slice(0,2),
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
                Service.findList(params).then(data => {
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