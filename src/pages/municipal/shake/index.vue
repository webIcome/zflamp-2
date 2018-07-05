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
           <list-search-btns-component @search="search" @clearSearchParams="clearSearchParams" @refresh="pagingEvent"></list-search-btns-component>
        </form>
        <div class="control-add-content">
          <control-component :deviceIds="selectionDeviceIds" @refreshPage="refreshPage"></control-component>
          <div style="display: flex;">
            <oper-component :companies="companies" @initPaging="initList"></oper-component>
            <batch-create-data :url="url" :fileName="fileName" :baseUrl="baseUrl" ></batch-create-data>
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
      <el-table-column prop="deviceName" label="设备名称"></el-table-column>
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
      <el-table-column min-width="120" prop="currentSpeed" label="当前加速度m/s²"></el-table-column>
      <el-table-column prop="voltage" label="电压V"></el-table-column>
      <el-table-column prop="belongLightId" label="归属灯ID"></el-table-column>
      <el-table-column min-width="90" prop="belongApId" label="归属基站ID"></el-table-column>
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
            <oper-component ref="oper" :id="scope.row.deviceId" :companies="companies" :edit="true"
                            @initCurrentPaging="pagingEvent"></oper-component>
            <delete-component :id="scope.row.deviceId" @initCurrentPaging="pagingEvent"></delete-component>
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
    import Service from "../../../services/shake";
    import operComponent from './oper-component.vue'
    import deleteComponent from './delete-component.vue'
    import CommonConstant from "../../../constants/common";
    import controlComponent from "./control-component.vue"
    import mixin from '../../../mixins/paging-mixin'
    import Config from "../../../config";
    export default {
        components: {
            operComponent,
            deleteComponent,
            controlComponent,
        },
        mixins: [mixin],
        name: 'shakePage',
        data() {
            return {
                service: Service,
                url: 'shockCheck/',
                baseUrl: Config.WELL_URL_API,
                fileName: '振动检测模板'
            }
        },
        methods: {
        }
    }
</script>