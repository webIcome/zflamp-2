<template>
  <div class="oper-component">
    <div v-if="edit" class="icon-item"><span class="edit-icon" @click="showModal">编辑</span></div>
    <div v-else class="add-btn" @click="showModal"><span class="add-icon default-icon"></span>创建</div>
    <el-dialog :title="title" :visible.sync="visible" center :width="'500px'">
      <el-form label-width="150px" :model="data" :rules="Rules" :ref="ref" class="el-form-default">
        <el-form-item label="设备名称：" prop="devicename">
          <el-input v-model.trim="data.devicename" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="设备ID：" prop="sn">
          <el-input v-if="!edit" type="text" v-model.trim="data.sn" placeholder="请输入设备ID"/>
          <div v-else>{{data.sn}}</div>
        </el-form-item>
        <el-form-item label="归属厂商：" prop="vendor">
          <el-select v-model="data.vendor" placeholder="选择归属厂商" clearable style="width: 100%;">
            <el-option v-for="type in vendor" :value="type.value" :key="type.value" :label="type.text"></el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="归属项目：" prop="companyid">
          <tree-select-component v-model="data.companyid" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="设备类型：" prop="loopcontrollerType">
          <el-select v-model="data.loopcontrollerType" placeholder="选择设备类型" clearable style="width: 100%;">
            <el-option v-for="type in loopControllerType" :value="type.value" :key="type.value"
                       :label="type.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回路数：" prop="loopnum">
          <el-select v-model="data.loopnum" placeholder="选择回路数" clearable style="width: 100%;">
            <el-option v-for="type in loopnum" :value="type.value" :key="type.value"
                       :label="type.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属组：">
          <select-group-component v-model="data.groupid"
                                  :companyid="data.companyid"
                                  :groupname="data.groupname"
                                  @name="data.groupname = arguments[0]"
                                  :run="visible"
                                  :apId="data.apuid"
                                  :moduletype="moduleType.loop"></select-group-component>
        </el-form-item>
        <el-form-item label="地理位置：" prop="position">
          <select-position v-model="data.position"></select-position>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="edit" type="primary" @click="editDevice">确 定</el-button>
        <el-button v-else type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import LoopService from '../../../services/loop'
    import CommonConstant from "../../../constants/common";
    import selectGroupComponent from '../group/select-group-component.vue'
    export default {
        components: {
            selectGroupComponent,
        },
        name: 'operComponent',
        data() {
            return {
                Rules: {
                    devicename: [
                        {required: true, message: '请输入名称'}
                    ],
                    sn: [
                        {required: true, message: '请输入设备ID'}
                    ],
                    loopnum: [
                        {required: true, message: '请输入回路数'}
                    ],
                    companyid: [
                        {required: true, message: '请选择企业'}
                    ],
                    vendor: [
                        {required: true, message: '请选择厂商'}
                    ],
                    loopcontrollerType: [
                        {required: true, message: '请选择设备类型'}
                    ]
                },
                visible: false,
                data: {
                    vendor: 1
                },
                ref: 'edit',
                vendor: CommonConstant.vendor,
                moduleType: {},
                loopControllerType: CommonConstant.loopControllerType,
                loopnum: CommonConstant.loopnum
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
                    return '编辑回路控制器';
                } else {
                    return '创建回路控制器'
                }
            }
        },
        methods: {
            initData() {
                CommonConstant.deviceType.forEach(item => {
                    this.moduleType[item.name] = item.value
                })
            },
            add() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        LoopService.add(this.getTransformDataToSend(this.data)).then(res => {
                            this.emitAddEvent();
                            this.hideModal();
                        });
                    }
                })
            },
            getDetail() {
                LoopService.getDetail(this.id).then(data => {
                    this.data = this.getTransformDataToUse(data);
                })
            },
            editDevice() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        LoopService.edit(this.id, this.getTransformDataToSend(this.data)).then(res => {
                            this.emitEditEvent();
                            this.hideModal();
                        });
                    }
                })
            },
            clearValidate() {
                if (this.$refs[this.ref]) this.$refs[this.ref].clearValidate();
            },
            getTransformDataToSend(data) {
                data = this.$common.copyObj(data);
                let position = data.position;
                delete data.position;
                data = Object.assign(data, position)
                data.longitude = data.lng;
                data.latitude = data.lat;
                delete data.lng;
                delete data.lat;
                return data;
            },
            getTransformDataToUse(data) {
                data.position = this.getPosition(data);
                return data;
            },
            getPosition(position){
                return {
                    position: position.position,
                    lng: position.longitude,
                    lat: position.latitude,
                    province: position.province,
                    city: position.city,
                    district: position.district
                };
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
                    this.data = {
                        vendor: 1
                    };
                }
            }
        }
    }
</script>