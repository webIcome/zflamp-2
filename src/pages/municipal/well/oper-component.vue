<template>
  <div class="oper-component">
    <div v-if="edit" class="icon-item"><span class="edit-icon" @click="showModal">编辑</span></div>
    <div v-else class="add-btn" @click="showModal"><span class="add-icon default-icon"></span>创建</div>
    <el-dialog :title="title" :visible.sync="visible" center :width="'600px'">
      <el-form label-width="170px" :model="data" :rules="Rules" :ref="ref" class="el-form-default" :validate-on-rule-change="false">
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="edit" type="primary" @click="editDevice">确 定</el-button>
        <el-button v-else type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import Service from '../../../services/well'
    import CommonConstant from "../../../constants/common";
    export default {
        name: 'operWellComponent',
        data() {
            return {
                visible: false,
                data: {},
                ref: 'edit',
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
            Rules: function () {
                let rules = {
                    taskName: [
                        {required: true, message: '请输入任务名称'}
                    ],
                };
                return rules;
            }
        },
        methods: {
            initData() {
            },
            add() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        Service.add(this.getTransformDataToSend(this.data)).then(res => {
                            this.emitAddEvent();
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
            editDevice() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        Service.edit(this.getTransformDataToSend(this.data)).then(res => {
                            this.emitEditEvent();
                            this.hideModal();
                        });
                    }
                })
            },
            changeModuletype: function () {
                if (this.data.taskCmd) this.data.taskCmd = '';
            },
            addLoop: function () {
                this.selectedLoops.push({number: this.selectedLoops.length + 1});
                this.data.loop = this.selectedLoops.map(item => {
                    return item.number;
                }).join();
            },
            deleteLoop: function (index) {
                this.selectedLoops.splice(index, 1);
                this.data.loop = this.selectedLoops.map(item => {
                    return item.number;
                }).join();
            },
            getTransformDataToSend(data) {
                return data;
            },
            getTransformDataToUse(data) {
                return data;
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
                    if (this.edit) this.getDetail();
                    this.clearValidate();
                } else {
                    this.data = {}
                }
            }
        }
    }
</script>