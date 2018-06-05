<template>
  <div class="oper-component">
    <div v-if="edit" class="icon-item"><span class="edit-icon" @click="showModal">编辑</span></div>
    <div v-else class="add-btn" @click="showModal"><span class="add-icon default-icon"></span>创建</div>
    <el-dialog :title="title" :visible.sync="visible" center :width="'600px'">
      <el-form label-width="170px" :model="data" :rules="Rules" :ref="ref" class="el-form-default" :validate-on-rule-change="false">
        <el-form-item label="设备名称：" prop="deviceName">
          <el-input v-model.trim="data.deviceName" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="设备ID：" prop="deviceName">
          <el-input v-if="!edit" type="text" v-model.trim="data.sn" placeholder="请输入设备ID"/>
          <div v-else>{{data.sn}}</div>
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
    import Service from '../../../services/water-level'
    import CommonConstant from "../../../constants/common";
    export default {
        name: 'operWaterLevelComponent',
        data() {
            return {
                visible: false,
                data: {},
                ref: 'edit',
                Rules: {
                    deviceName: [
                        {required: true, message: '请输入名称'}
                    ],
                    compId: [
                        {required: true, message: '请选择企业'}
                    ],
                    sn: [
                        {required: true, message: '请输入设备ID'}
                    ],
                }
            }
        },
        props: {
            companies: {
                default: []
            },
            id: {
                default: ''
            },
            edit: {
                default: false
            }
        },
        created() {
            this.initData()
        },
        computed: {
            title: function () {
                if (this.edit) {
                    return '编辑井盖';
                } else {
                    return '创建井盖'
                }
            },
        },
        methods: {
            initData() {
            },
            operate() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        Service.operate(this.getTransformDataToSend(this.data)).then(res => {
                            this.emitEvent();
                            this.hideModal();
                        });
                    }
                })
            },
            getDetail() {
                Service.getDetail(this.id).then(data => {
                    this.data = this.getTransformDataToUse(data);
                })
            },
            getTransformDataToSend(data) {
                data = this.$common.copyObj(data);
                let position = data.address;
                delete data.address;
                data = Object.assign(data, position)
                data.address = data.position;
                delete data.position;
                data.longitude = data.lng;
                data.latitude = data.lat;
                delete data.lng;
                delete data.lat;
                return data;
            },
            getTransformDataToUse(data) {
                data.address = this.getPosition(data);
                return data;
            },
            getPosition(position){
                return {
                    position: position.address,
                    lng: position.longitude,
                    lat: position.latitude,
                    province: position.province,
                    city: position.city,
                    district: position.district
                };
            },
            clearValidate() {
                if (this.$refs[this.ref]) this.$refs[this.ref].clearValidate();
            },
            emitEvent() {
                if (this.edit) {
                    this.emitEditEvent()
                } else {
                    this.emitAddEvent();
                }
            },
            emitAddEvent() {
                this.$emit('initPaging')
            },
            emitEditEvent() {
                this.$emit('initCurrentPaging')
            },
            showModal() {
                this.visible = true;
            },
            hideModal() {
                this.visible = false;
            }
        },
        watch: {
            visible: function (newValue, oldValue) {
                if (newValue) {
                    if (this.edit) this.getDetail();
                    this.clearValidate();
                } else {
                    this.data = {}
                }
            }
        }
    }
</script>