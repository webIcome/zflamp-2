<template>
  <div class="content-right">
    <form class="form-inline default-form">
      <div class="form-group">
        <label class="sr-only">任务名称：</label>
        <el-input type="text" v-model="searchParams.taskName" placeholder="输入任务名称" clearable></el-input>
      </div>
      <div class="form-group">
        <label class="sr-only">任务类型：</label>
        <el-select v-model="searchParams.moduleType" placeholder="选择任务类型" clearable >
          <el-option v-for="status in deviceType" :key="status.value" :value="status.value" :label="status.text"></el-option>
        </el-select>
      </div>
      <div class="form-group">
        <label class="sr-only">操作命令：</label>
        <el-select v-model="searchParams.taskCmd" placeholder="选择操作命令" clearable >
          <el-option v-for="status in taskCmd" :key="status.value" :value="status.value" :label="status.text"></el-option>
        </el-select>
      </div>
      <div class="form-group">
        <label class="sr-only">任务状态：</label>
        <el-select v-model="searchParams.taskStatus" placeholder="选择任务状态" clearable >
          <el-option v-for="status in taskStatus" :key="status.value" :value="status.value" :label="status.text"></el-option>
        </el-select>
      </div>
      <div class="form-group">
        <label class="sr-only">归属企业：</label>
        <tree-select-component v-model="searchParams.compId" :list="companies"></tree-select-component>
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
      <el-table-column min-width="100" prop="taskName" label="任务名称"></el-table-column>
      <el-table-column label="任务类型"><template slot-scope="scope">{{scope.row.moduleType | deviceTypeNameConverter}}</template></el-table-column>
      <el-table-column label="操作命令"><template slot-scope="scope">{{scope.row.taskCmd | taskCmdNameConverter}}</template></el-table-column>
      <el-table-column label="命令状态"><template slot-scope="scope">{{scope.row.taskStatus | taskStatusNameConverter}}</template></el-table-column>
      <el-table-column label="更新日期"><template slot-scope="scope">
        <template v-if="scope.row.modifytime">{{scope.row.modifytime | formDate}}</template>
        <template v-else>{{scope.row.createtime | formDate}}</template>
      </template></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row type="flex" justify="space-around">
            <oper-component ref="oper" :id="scope.row.id" :companies="companies" :edit="true" @initCurrentPaging="pagingEvent"></oper-component>
            <delete-component :id="scope.row.id" @initCurrentPaging="pagingEvent"></delete-component>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <detail-component :id="scope.row.id"></detail-component>
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
    import Service from "../../../services/task";
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
                deviceType: [
                    {value: 1, text: '灯控器'},
                    {value: 2, text: '回路控制器'},
                ],
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