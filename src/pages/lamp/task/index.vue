<template>
  <div class="content-right">
    <div class="search-header">
      <form class="form-inline default-form">
        <div class="form-group">
          <label >任务名称</label>
          <el-input type="text" v-model="searchParams.taskName" placeholder="输入任务名称" clearable></el-input>
        </div>
        <div class="form-group">
          <label >任务类型</label>
          <el-select v-model="searchParams.moduleType" placeholder="选择任务类型" clearable >
            <el-option v-for="status in deviceType" :key="status.value" :value="status.value" :label="status.text"></el-option>
          </el-select>
        </div>
        <div class="form-group">
          <label >操作命令</label>
          <el-select v-model="searchParams.taskCmd" placeholder="选择操作命令" clearable >
            <el-option v-for="status in taskCmd" :key="status.value" :value="status.value" :label="status.text"></el-option>
          </el-select>
        </div>
        <div class="form-group">
          <label>归属项目</label>
          <tree-select-component v-model="searchParams.compId" :list="companies"></tree-select-component>
        </div>
        <list-search-btns-component @search="search" @clearSearchParams="clearSearchParams" @refresh="pagingEvent"></list-search-btns-component>
      </form>
      <div style="display: inline-block;">
        <oper-component :companies="companies" @initPaging="initList"></oper-component>
      </div>
    </div>
    <el-table
        :data="list"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        class="my-table"
        :ref="tableRef">
      <el-table-column min-width="100" prop="taskName" label="任务名称"></el-table-column>
      <el-table-column prop="compName" label="归属项目"></el-table-column>
      <el-table-column label="任务类型"><template slot-scope="scope">{{scope.row.moduleType | deviceTypeNameConverter}}</template></el-table-column>
      <el-table-column label="操作命令"><template slot-scope="scope">{{scope.row.taskCmd | taskCmdNameConverter}}</template></el-table-column>
      <el-table-column label="命令状态"><template slot-scope="scope">{{scope.row.taskStatus | taskStatusNameConverter}}</template></el-table-column>
      <el-table-column label="更新日期"><template slot-scope="scope">
        <template v-if="scope.row.modifytime">{{scope.row.modifytime | formDate}}</template>
        <template v-else>{{scope.row.createtime | formDate}}</template>
      </template></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-row type="flex" justify="space-between">
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
    import Service from "../../../services/task";
    import operComponent from './oper-component.vue'
    import detailComponent from './detail-component.vue'
    import deleteComponent from './delete-component.vue'
    import CommonConstant from "../../../constants/common";
    import mixin from '../../../mixins/paging-mixin'
    export default {
        components: {
            operComponent,
            detailComponent,
            deleteComponent,
        },
        mixins: [mixin],
        name: 'taskPage',
        data() {
            return {
                service: Service,
                taskCmd: CommonConstant.taskCmd,
                taskStatus: CommonConstant.taskStatus,
                periodType: CommonConstant.taskPeriodType,
                deviceType: CommonConstant.deviceType.slice(0,2),
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.selectionList = val;
            }
        }
    }
</script>