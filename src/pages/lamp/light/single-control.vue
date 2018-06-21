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
          <div class="form-group">
            <label>选择开关状态</label>
            <el-select v-model="searchParams.switchstate" placeholder="选择开关状态" clearable >
              <el-option v-for="status in switchState" :key="status.value" :value="status.value" :label="status.text"></el-option>
            </el-select>
          </div>
          <list-search-btns-component @search="search" @clearSearchParams="clearSearchParams" @refresh="pagingEvent"></list-search-btns-component>
        </form>
        <div class="control-add-content">
          <control-component :isSingle="true" :ids="selectionIds" @refreshPage="refreshPage"></control-component>
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
      <el-table-column type="selection" width="55" :selectable=isSelectable></el-table-column>
      <el-table-column prop="devicename" label="设备名称"></el-table-column>
      <el-table-column prop="sn" label="设备ID"></el-table-column>
      <el-table-column prop="companyname" label="归属项目"></el-table-column>
      <el-table-column label="运行状态">
        <template slot-scope="scope">
          <span :class="{'running-success': scope.row.runningstate == '正常', 'running-fail': scope.row.runningstate != '正常'}">
            <span class="running-icon"></span>{{scope.row.runningstate}}
          </span>
        </template>
      </el-table-column>
      <!--<el-table-column label="开关状态"><template slot-scope="scope">{{scope.row.switchstate | switchStateNameConverter}}</template></el-table-column>-->
      <el-table-column label="开关状态"><template slot-scope="scope">
        <span :class="{'light-on': scope.row.switchstate == 1, 'light-off': scope.row.switchstate != 1}"></span>
      </template>
      </el-table-column>
      <el-table-column label="亮度"><template slot-scope="scope">{{scope.row.brightness == 255 ? '控制异常' : scope.row.brightness + '%'}}</template></el-table-column>
      <el-table-column prop="voltage" label="电压V"></el-table-column>
      <el-table-column prop="current" label="电流A"></el-table-column>
      <el-table-column prop="sumpower" label="用电量KW·h"></el-table-column>
      <el-table-column label="地理位置"><template slot-scope="scope"><show-position :device='scope.row'></show-position></template></el-table-column>
      <el-table-column label="上报时间">
        <template slot-scope="scope">
          <template>{{scope.row.uptime | formDate}}</template>
        </template>
      </el-table-column>
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
    import Service from "../../../services/light";
    import operComponent from './oper-component.vue'
    import detailComponent from './detail-component.vue'
    import deleteComponent from './delete-component.vue'
    import CommonConstant from "../../../constants/common";
    import controlComponent from "./control-component.vue"
    import mixin from '../../../mixins/paging-mixin'
    export default {
        components: {
            operComponent,
            detailComponent,
            deleteComponent,
            controlComponent,
        },
        mixins: [mixin],
        name: 'singlePage',
        data() {
            return {
                service: Service,
                switchState:  CommonConstant.switchState,
                lightControllerType: CommonConstant.lightControllerType,
                sensorType: CommonConstant.sensorType,
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
                return row.lightstatus != 3
            }
        }
    }
</script>