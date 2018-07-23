<template>
  <div class="oper-component">
    <div v-if="edit" class="icon-item"><span class="edit-icon" @click="showModal">编辑</span></div>
    <div v-else class="add-btn" @click="showModal"><span class="add-icon default-icon"></span>创建</div>
    <el-dialog :title="title" :visible.sync="visible" center :width="'600px'">
      <el-form label-width="170px" :model="data" :rules="Rules" :ref="ref" class="el-form-default" :validate-on-rule-change="false">
        <el-form-item label="设备名称：" prop="deviceName">
          <el-input v-model.trim="data.deviceName" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="归属项目：" prop="compId">
          <tree-select-component v-model="data.compId" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="服务器IP：" prop="serviceIp">
          <el-input v-model.trim="data.serviceIp" placeholder="请输入服务器IP"></el-input>
        </el-form-item>
        <el-form-item label="服务器端口：" prop="servicePort">
          <el-input v-model.trim="data.servicePort" placeholder="请输入服务器端口"></el-input>
        </el-form-item>
        <el-form-item label="设备用户名：" prop="deviceUser">
          <el-input v-model.trim="data.deviceUser" placeholder="请输入设备用户名"></el-input>
        </el-form-item>
        <el-form-item label="设备密码：" prop="devicePassword">
          <el-input v-model.trim="data.devicePassword" placeholder="请输入设备密码"></el-input>
        </el-form-item>
        <el-form-item label="预览通道：" prop="previewChannel">
          <el-input v-model.trim="data.previewChannel" placeholder="请输入预览通道"></el-input>
        </el-form-item>
        <el-form-item label="地理位置：" prop="address">
          <select-position v-model="data.address"></select-position>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="operate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import Service from '../../../services/camera'
    import CommonConstant from "../../../constants/common";
    import operMixin from "../oper-mixin"
    export default {
        name: 'operCameraComponent',
        mixins: [operMixin],
        data() {
            return {
                data: {},
                deviceModel: CommonConstant.doorModel,
                service: Service
            }
        },
        computed: {
            Rules: function () {
                let rules = {
                    deviceName: [
                        {required: true, message: '请输入名称'}
                    ],
                    compId: [
                        {required: true, message: '请选择企业'}
                    ],
                    serviceIp: [
                        {required: true, message: '请输入服务器IP'}
                    ],
                    servicePort: [
                        {required: true, message: '请输入服务器端口'}
                    ],
                    deviceUser: [
                        {required: true, message: '请输入设备用户名'}
                    ],
                    devicePassword: [
                        {required: true, message: '请输入设备密码'}
                    ],
                    previewChannel: [
                        {required: true, message: '请输入预览通道'}
                    ],
                };
                return rules
            }
        },
        methods: {

        }
    }
</script>