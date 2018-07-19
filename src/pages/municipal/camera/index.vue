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
            <label>归属项目</label>
            <tree-select-component v-model="searchParams.compIds" :list="companies"></tree-select-component>
          </div>
          <div class="form-group">
            <label>服务器IP</label>
            <el-input type="text" v-model="searchParams.serviceIp" placeholder="输入服务器IP" clearable/>
          </div>
          <div class="form-group">
            <label>服务器端口</label>
            <el-input type="text" v-model="searchParams.servicePort" placeholder="输入服务器端口" clearable/>
          </div>
          <list-search-btns-component @search="search" @clearSearchParams="clearSearchParams" @refresh="pagingEvent"></list-search-btns-component>
        </form>
        <div class="control-add-content">
          <control-component :devices="selectionList" ></control-component>
          <div style="display: flex;">
            <oper-component :companies="companies" @initPaging="initList"></oper-component>
            <batch-create-data :url="url" :fileName="fileName" :baseUrl="baseUrl" @initPaging="initList"></batch-create-data>
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
      <el-table-column prop="serviceIp" label="服务器IP"></el-table-column>
      <el-table-column prop="servicePort" label="服务器端口"></el-table-column>
      <el-table-column prop="deviceUser" label="设备用户名"></el-table-column>
      <el-table-column prop="devicePassword" label="设备密码"></el-table-column>
      <el-table-column prop="splitNumber" label="画面分割数"></el-table-column>
      <el-table-column prop="previewChannel" label="预览通道"></el-table-column>
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
    import Service from "../../../services/camera";
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
        name: 'posePage',
        data() {
            return {
                service: Service,
                url: 'video/',
                baseUrl: Config.WELL_URL_API,
                fileName: '摄像头模板',
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.selectionList = val;
            },
        }
    }
</script>