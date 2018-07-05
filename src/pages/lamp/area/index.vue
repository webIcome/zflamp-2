<template>
  <div>
    <div class="search-header">
      <div class="search-header-content">
        <form class="form-inline default-form">
          <div class="form-group">
            <label >设备名称</label>
            <el-input type="text" v-model="searchParams.devicename" placeholder="输入设备名称" clearable></el-input>
          </div>
          <div class="form-group">
            <label >基站ID</label>
            <el-input type="text" v-model="searchParams.sn" placeholder="输入设备ID" clearable/>
          </div>
          <div class="form-group">
            <label >归属项目</label>
            <tree-select-component v-model="searchParams.companyid" :list="companies"></tree-select-component>
          </div>
          <div class="form-group">
            <label >选择运行状态</label>
            <el-select v-model="searchParams.runningstate" placeholder="选择运行状态" clearable >
              <el-option v-for="status in apState" :key="status.value" :value="status.value" :label="status.text"></el-option>
            </el-select>
          </div>
          <list-search-btns-component @search="search" @clearSearchParams="clearSearchParams" @refresh="pagingEvent"></list-search-btns-component>
         <!-- <div @click="search" class="form-group default-btn">查询</div>
          <div @click="clearSearchParams" class="form-group default-btn">清空</div>-->
        </form>
        <div class="control-add-content">
          <control-light-component :isArea="true" :ids="selectionIds" @refreshPage="refreshPage"></control-light-component>
          <div style="display: flex;">
            <oper-component :companies="companies" @initPaging="initList"></oper-component>
            <batch-create-data :url="url" :fileName="fileName" ></batch-create-data>
          </div>
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
      <el-table-column prop="devicename" label="设备名称"></el-table-column>
      <el-table-column prop="sn" label="设备ID"></el-table-column>
      <el-table-column prop="companyname" label="归属项目"></el-table-column>
      <el-table-column label="运行状态">
        <template slot-scope="scope">
          <span :class="{'running-success': scope.row.runningstate == 'online', 'running-fail': scope.row.runningstate != 'online'}">
            <span class="running-icon"></span>{{scope.row.runningstate  | apStateNameConverter}}
          </span>
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
     <!-- <el-table-column type="expand">
        <template slot-scope="scope">
          <detail-component :id="scope.row.deviceid"></detail-component>
        </template>
      </el-table-column>-->
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
    import Service from "../../../services/area";
    import operComponent from './oper-component.vue'
    import detailComponent from './detail-component.vue'
    import deleteComponent from './delete-component.vue'
    import CommonConstant from "../../../constants/common";
    import controlLightComponent from "../light/control-component.vue"
    import ListSearchBtnsComponent from "../../../components/list-search-btns";
    import mixin from '../../../mixins/paging-mixin'
    export default {
        components: {
            ListSearchBtnsComponent, operComponent,
            detailComponent,
            deleteComponent,
            controlLightComponent
        },
        mixins: [mixin],
        name: 'areaPage',
        data() {
            return {
                service: Service,
                apState: CommonConstant.apState,
                url: 'ap/',
                fileName: '基站模板'
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.selectionList = val;
                this.selectionIds = val.map(item => {
                    return item.deviceid;
                })
            },
            isSelectable(row,index) {
                return row.runningstate != 'offline'
            }
        }
    }
</script>