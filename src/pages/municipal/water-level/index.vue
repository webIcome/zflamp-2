<template>
  <div class="content-right">
    <div class="search-header">
      <div class="search-header-content">
        <form class="form-inline default-form">
          <div class="form-group">
            <label>设备名称</label>
            <el-input type="text" v-model="searchParams.deviceName" placeholder="输入设备名称" clearable></el-input>
          </div>
          <div class="form-group">
            <label>设备ID</label>
            <el-input type="text" v-model="searchParams.sn" placeholder="输入设备ID" clearable/>
          </div>
          <div class="form-group">
            <label>归属项目</label>
            <tree-select-component v-model="searchParams.compIds" :list="companies"></tree-select-component>
          </div>
          <div class="form-group">
            <label>运行状态</label>
            <el-select v-model="searchParams.status" placeholder="请选择" clearable>
              <el-option v-for="status in runningState" :key="status.value" :value="status.value"
                         :label="status.text"></el-option>
            </el-select>
          </div>
          <div @click="search" class="form-group default-btn">查询</div>
          <div @click="clearSearchParams" class="form-group default-btn">清空</div>
        </form>
        <div class="control-add-content">
          <control-component :deviceIds="selectionDeviceIds" :ids="selectionIds" @initCurrentPaging="pagingEvent"></control-component>
          <oper-component :companies="companies" @initPaging="initList"></oper-component>
        </div>
      </div>
    </div>

    <el-table
        :data="list"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        class="my-table"
        :ref="tableRef">
      <el-table-column type="selection" width="55" :selectable="isSelectable"></el-table-column>
      <el-table-column min-width="100" prop="deviceName" label="设备名称"></el-table-column>
      <el-table-column prop="sn" label="设备ID"></el-table-column>
      <el-table-column prop="sn" label="设备型号"></el-table-column>
      <el-table-column prop="compName" label="归属项目"></el-table-column>
      <el-table-column label="运行状态">
        <template slot-scope="scope">
          <span
              :class="{'running-success': scope.row.status == 0, 'running-fail': scope.row.status != 0}">
            <span class="running-icon"></span>{{scope.row.statusName}}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="currentObliquity" label="当前水位"></el-table-column>
      <el-table-column prop="currentObliquity" label="告警阈值"></el-table-column>
      <el-table-column prop="voltage" label="电压V"></el-table-column>
      <el-table-column prop="belongLightId" label="归属灯ID"></el-table-column>
      <el-table-column prop="belongApId" label="归属基站ID"></el-table-column>
      <el-table-column label="地理位置">
        <template slot-scope="scope">
          <show-position :device='scope.row'></show-position>
        </template>
      </el-table-column>
      <el-table-column label="上报时间">
        <template slot-scope="scope">
          <template>{{scope.row.uploadTime | formDate}}</template>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-row type="flex">
            <oper-component ref="oper" :id="scope.row.id" :companies="companies" :edit="true"
                            @initCurrentPaging="pagingEvent"></oper-component>
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
    import Service from "../../../services/water-level";
    import operComponent from './oper-component.vue'
    import detailComponent from './detail-component.vue'
    import deleteComponent from './delete-component.vue'
    import CommonConstant from "../../../constants/common";
    import controlComponent from "./control-component.vue"
    export default {
        components: {
            operComponent,
            detailComponent,
            deleteComponent,
            controlComponent,
        },
        name: 'waterLevelPage',
        data() {
            return {
                searchParams: {},
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE
                },
                list: [],
                selectionList: [],
                selectionDeviceIds: [],
                selectionIds: [],
                companies: [],
                tableRef: 'my-table',
                runningState: CommonConstant.wellStatus,
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
                this.searchParams = {};
                this.initList();
            },
            handleSelectionChange(val) {
                this.selectionList = val;
                this.selectionDeviceIds = [];
                this.selectionIds = [];
                val.forEach(item => {
                    this.selectionDeviceIds.push(item.deviceId);
                    this.selectionIds.push(item.id)
                });
            },
            isSelectable(row,index) {
                return row.status != 1
            }
        }
    }
</script>