<template>
  <div>
    <div class="search-header">
      <div class="search-header-content">
        <form class="form-inline default-form">
          <div class="form-group">
            <label>组名称</label>
            <el-input type="text" v-model="searchParams.groupname" placeholder="输入组名称" clearable/>
          </div>
          <div class="form-group">
            <label>归属项目</label>
            <tree-select-component v-model="searchParams.companyid" :list="companies"></tree-select-component>
          </div>
          <div @click="search" class="form-group default-btn">查询</div>
          <div @click="clearSearchParams" class="form-group default-btn">清空</div>
        </form>
        <div class="control-add-content">
          <control-light-component v-if="moduletype == moduleType.light" :isGroup="true" :ids="selectionIds"></control-light-component>
          <control-loop-component v-else-if="moduletype == moduleType.loop" :isGroup="true" :ids="selectionIds"></control-loop-component>
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
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column min-width="100" prop="groupname" label="组名称"></el-table-column>
      <el-table-column prop="companyname" label="归属项目"></el-table-column>
      <el-table-column prop="loopcontrol" label="回路状态"></el-table-column>
      <el-table-column label="设备列表">
        <template slot-scope="scope">

        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-row type="flex" justify="space-between">
            <oper-component ref="oper" :id="scope.row.objectid" :companies="companies" :edit="true" @initCurrentPaging="pagingEvent"></oper-component>
            <delete-component :id="scope.row.objectid" @initCurrentPaging="pagingEvent"></delete-component>
          </el-row>
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
    import Service from "../../../services/group";
    import operComponent from './oper-component.vue'
    import controlLightComponent from "../light/control-component.vue"
    import deleteComponent from './delete-component.vue'
    import CommonConstant from "../../../constants/common";
    import controlLoopComponent from "../loop/control-component.vue"
    export default {
        components: {
            operComponent,
            deleteComponent,
            controlLightComponent,
            controlLoopComponent
        },
        name: 'lightPage',
        data() {
            return {
                searchParams: {},
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                },
                list: [],
                selectionList: [],
                selectionIds: [],
                companies: [],
                tableRef: 'my-table',
                moduleType: {}
            }
        },
        props: {
            moduletype: {
                default: 1
            }
        },
        created() {
            this.initList();
            this.initCompanies();
            this.initCommonData();
        },
        methods: {
            initList() {
                this.findList(Object.assign(this.defaultPaging, {moduletype: this.moduletype}));
            },
            initCompanies() {
                this.$globalCache.companies.then(companies => {
                    this.companies = companies;
                })
            },
            initCommonData: function () {
                CommonConstant.deviceType.forEach(item => {
                    this.moduleType[item.name] = item.value;
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
                this.selectionIds = val.map(item => {
                    return item.deviceid;
                })
            }
        }
    }
</script>