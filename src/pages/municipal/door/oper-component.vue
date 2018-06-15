<template>
  <div class="oper-component">
    <div v-if="edit" class="icon-item"><span class="edit-icon" @click="showModal">编辑</span></div>
    <div v-else class="add-btn" @click="showModal"><span class="add-icon default-icon"></span>创建</div>
    <el-dialog :title="title" :visible.sync="visible" center :width="'600px'">
      <el-form label-width="170px" :model="data" :rules="Rules" :ref="ref" class="el-form-default" :validate-on-rule-change="false">
        <el-form-item label="设备名称：" prop="deviceName">
          <el-input v-model.trim="data.deviceName" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="设备ID：" prop="sn">
          <el-input v-if="!edit" type="text" v-model.trim="data.sn" placeholder="请输入设备ID"/>
          <div v-else>{{data.sn}}</div>
        </el-form-item>
        <el-form-item label="设备型号：" prop="deviceModel">
          <el-select v-model="data.deviceModel" placeholder="选择设备型号" clearable style="width: 100%;">
            <el-option v-for="type in deviceModel" :value="type.value" :key="type.value" :label="type.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属项目：" prop="compId">
          <tree-select-component v-model="data.compId" :list="companies"></tree-select-component>
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
    import Service from '../../../services/door'
    import CommonConstant from "../../../constants/common";
    import operMixin from "../oper-mixin"
    export default {
        name: 'operDoorComponent',
        mixins: [operMixin],
        data() {
            return {
                data: {
                    deviceModel: 'DMZ1ZT'
                },
                deviceModel: CommonConstant.doorModel,
            }
        },
        methods: {
            resetData() {
                this.data = {
                    deviceModel: 'DMZ1ZT'
                }
            }
        }
    }
</script>