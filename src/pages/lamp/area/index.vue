<template>
  <div>
    <form class="form-inline default-form">
      <div class="form-group">
        <label class="sr-only">设备名称：</label>
        <el-input type="text" v-model="searchParams.devicename" placeholder="输入设备名称" clearable></el-input>
      </div>
      <div class="form-group">
        <label class="sr-only">设备ID：</label>
        <el-input type="text" v-model="searchParams.sn" placeholder="输入设备ID" clearable/>
      </div>
      <div class="form-group">
        <label class="sr-only">归属企业：</label>
        <tree-select-component v-model="searchParams.companyid" :list="companies"></tree-select-component>
      </div>
      <div class="form-group">
        <label class="sr-only">选择开关状态：</label>
        <el-select v-model="searchParams.switchstate" placeholder="选择开关状态" clearable >
          <el-option v-for="status in switchState" :key="status.value" :value="status.value" :label="status.text"></el-option>
        </el-select>
      </div>
      <div class="form-group">
        <label class="sr-only">传感器类型：</label>
        <el-select v-model="searchParams.sensortype" placeholder="选择传感器类型" clearable >
          <el-option v-for="status in sensorType" :key="status.value" :value="status.value" :label="status.text"></el-option>
        </el-select>
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
      <el-table-column min-width="100" prop="devicename" label="设备名称"></el-table-column>
      <el-table-column prop="sn" label="设备ID"></el-table-column>
      <el-table-column prop="companyname" label="归属项目"></el-table-column>
      <el-table-column label="运行状态"><span slot-scope="scope">{{scope.row.runningstate | apStateNameConverter}}</span></el-table-column>
      <el-table-column label="地理位置" show-overflow-tooltip><template slot-scope="scope"><show-position :device='scope.row'></show-position></template></el-table-column>
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
    import Config from "../../../config";
    import Service from "../../../services/light";
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
        name: 'singlePage',
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