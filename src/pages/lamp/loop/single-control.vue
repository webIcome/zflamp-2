<template>
  <div>
    <div class="search-header">
      <div class="search-header-content">
        <form class="form-inline default-form">
          <div class="form-group">
            <label>设备名称</label>
            <el-input type="text" v-model="searchParams.devicename" placeholder="输入设备名称" clearable></el-input>
          </div>
          <div class="form-group">
            <label>设备ID</label>
            <el-input type="text" v-model="searchParams.sn" placeholder="输入设备ID" clearable/>
          </div>
          <div class="form-group">
            <label>归属项目</label>
            <tree-select-component v-model="searchParams.companyid" :list="companies"></tree-select-component>
          </div>
          <list-search-btns-component @search="search" @clearSearchParams="clearSearchParams"></list-search-btns-component>
        </form>
        <div class="control-add-content">
          <control-component :isSingle="true" :ids="selectionIds" @refreshPage="refreshPage"></control-component>
          <oper-component :companies="companies" @initPaging="initList"></oper-component>
        </div>
      </div>
    </div>
    <el-table
        :data="list"
        @selection-change="handleSelectionChange"
        class="my-table"
        :ref="tableRef">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="devicename" label="设备名称"></el-table-column>
      <el-table-column prop="sn" label="设备ID"></el-table-column>
      <el-table-column prop="companyname" label="归属项目"></el-table-column>
      <el-table-column label="线路状态">
        <template slot-scope="scope">
          <template v-for="item in scope.row.loopnum">
            <span :class="{'light-on': isLoopOn(scope.row, item), 'light-off': !isLoopOn(scope.row, item)}"></span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="地理位置" show-overflow-tooltip><template slot-scope="scope"><show-position :device='scope.row'></show-position></template></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-row type="flex" justify="space-between">
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
    <el-row type="flex" justify="end" v-if="searchParams.pages">
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
    import Service from "../../../services/loop";
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
            controlComponent
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
                selectionIds: [],
                companies: [],
                tableRef: 'my-table',
                timedtasktotal: 0,
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
            refreshPage() {
                Service.findList(this.searchParams).then(data => {
                    this.list.forEach(item => {
                        data.list.forEach(i => {
                            if (i.sn == item.sn) {
                                Object.assign(item, i);
                            }
                        })
                    })
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
                let max = 0;
                this.selectionIds = val.map(item => {
                    if (max <= item.timedtasktotal) {
                        max = item.timedtasktotal
                    }
                    return item.deviceid;
                })
                this.timedtasktotal = max;
            },
            isLoopOn(item, loop) {
                return item.loopcontrol.split('.').some(i => {
                    return i == loop;
                })
            }
        }
    }
</script>