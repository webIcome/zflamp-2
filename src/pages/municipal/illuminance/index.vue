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
            <label>状态</label>
            <el-select v-model="searchParams.status" placeholder="请选择" clearable>
              <el-option v-for="status in runningState" :key="status.value" :value="status.value"
                         :label="status.text"></el-option>
            </el-select>
          </div>
           <list-search-btns-component @search="search" @clearSearchParams="clearSearchParams"></list-search-btns-component>
        </form>
        <div class="control-add-content">
          <control-component :deviceIds="selectionDeviceIds" @refreshPage="refreshPage"></control-component>
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
      <el-table-column prop="deviceModel" label="设备型号"></el-table-column>
      <el-table-column prop="compName" label="归属项目"></el-table-column>
      <el-table-column label="运行状态">
        <template slot-scope="scope">
          <span
              :class="{'running-success': scope.row.status == 0, 'running-fail': scope.row.status != 0}">
            <span class="running-icon"></span>{{scope.row.statusName}}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="currentBrightness" label="当前照度/lux"></el-table-column>
      <el-table-column prop="alarmThreshold" label="告警阈值"></el-table-column>
      <el-table-column prop="voltage" label="电压V"></el-table-column>
      <el-table-column prop="belongLightId" label="归属灯"></el-table-column>
      <el-table-column prop="belongApId" label="归属基站"></el-table-column>
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
      <el-table-column type="expand">
        <template slot-scope="scope">
          <detail-component :id="scope.row.deviceId"></detail-component>
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
    import Service from "../../../services/illuminance";
    import operComponent from './oper-component.vue'
    import detailComponent from './detail-component.vue'
    import deleteComponent from './delete-component.vue'
    import CommonConstant from "../../../constants/common";
    import controlComponent from "./control-component.vue"
    import mixin from '../mixin'
    export default {
        components: {
            operComponent,
            deleteComponent,
            controlComponent,
            detailComponent
        },
        mixins: [mixin],
        name: 'illuminancePage',
        data() {
            return {
                service: Service,
            }
        },
        methods: {
        }
    }
</script>