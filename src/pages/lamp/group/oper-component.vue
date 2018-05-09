<template>
  <div>
    <div v-if="edit" class="icon-item"><span class="edit-icon" @click="showModal"></span></div>
    <div v-else class="default-btn" @click="showModal"><span class="add-icon default-icon"></span>创建</div>
    <el-dialog :title="title" :visible.sync="visible" center :width="'600px'">
      <el-form label-width="170px" :model="data" :rules="Rules" :ref="ref" class="el-form-default">
        <el-form-item label="组名称：" prop="groupname">
          <el-input v-model.trim="data.groupname" placeholder="请输组名称"></el-input>
        </el-form-item>
        <el-form-item label="归属企业：" prop="companyid">
          <tree-select-component v-model="data.companyid" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="设备：" prop="deviceid">
          <select-devices-component v-model="data.deviceid"
                                    :run="visible"
                                    :moduletype="data.moduletype"
                                    :groupid="data.objectid"
                                    :companyid="data.companyid"></select-devices-component>
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
    import GroupService from '../../../services/group'
    import CommonConstant from "../../../constants/common";
    import selectDevicesComponent from "./select-devices-component.vue"
    export default {
        components: {
            selectDevicesComponent,
        },
        name: 'operGroupComponent',
        data() {
            return {
                Rules: {
                    groupname: [
                        {required: true, message: '请输入组名称'}
                    ],
                    companyid: [
                        {required: true, message: '选择企业'}
                    ],
                    deviceid: [
                        {required: true, message: '选择设备'}
                    ],
                },
                visible: false,
                data: {},
                ref: 'edit',
                deviceType: CommonConstant.deviceType
            }
        },
        props: {
            companies: {
                default: []
            },
            group: {
                default: function () {
                    return {}
                }
            },
            edit: {
                default: false
            },
            moduletype: {
                default: ''
            }
        },
        created() {
            this.initData()
        },
        computed: {
            title: function () {
                if (this.edit) {
                    return '编辑组';
                } else {
                    return '创建组'
                }
            }
        },
        methods: {
            initData() {
            },
            add() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        GroupService.add(this.data).then(res => {
                            this.emitAddEvent();
                            this.hideModal();
                        });
                    }
                })
            },
            editDevice() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        GroupService.edit(this.data.objectid, this.data).then(res => {
                            this.emitEditEvent();
                            this.hideModal();
                        });
                    }
                })
            },
            clearValidate() {
                if (this.$refs[this.ref]) this.$refs[this.ref].clearValidate();
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
                    if (this.edit) this.data = this.$common.copyObj(this.group);
                    this.clearValidate();
                } else {
                    this.data = {};
                }
            }
        }
    }
</script>