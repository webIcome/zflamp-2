<template>
  <div style="margin-left: 10px">
    <el-select :disabled="!ids.length" v-model='operData.controltype' placeholder="请选择" @visible-change="showModel" clearable>
      <el-option v-for="item in items"
                 :label="item.text"
                 :value="item.value"
                 :key="item.value"></el-option>
    </el-select>
    <el-dialog title="控制回路控制器" :visible.sync="visible" center :width="'800px'" @close="clearValidate('controlDevice')">
      <el-form label-width="170px" :model="operData" :rules="Rules"  ref="controlDevice" class="el-form-default" :validate-on-rule-change="false">
        <el-form-item v-if="operData.controltype == 5" prop="taskid">
          <select-tasks-component v-model="operData.taskid"
                                  :moduletype="moduleType.light"
                                  :ids="ids"></select-tasks-component>
        </el-form-item>
        <el-form-item v-show="operData.controltype == 6" label="输入心跳包周期" prop="heartperiod">
          <el-input style="width: 200px" type="text" v-model.trim.number="operData.heartperiod"></el-input> 分钟
            </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice('controlDevice')">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
    import LoopService from "../../../services/loop";
    import GroupService from "../../../services/group"
    import CommonContent from "../../../constants/common";
    import selectTasksComponent from "../task/select-component.vue"
    import cancelTasksComponent from "../task/cancel-component.vue"
    export default {
        name: 'controlLoopDialogComponent',
        components: {
            selectTasksComponent,
            cancelTasksComponent
        },
        data() {
            return {
                visible: false,
                operData: {},
                selectedLoops: [],
                moduleType: {}
            }
        },
        props: {
            ids: {
                default: []
            },
            items: {
                default: []
            },
            isGroup: {
                default: false
            }
        },
        computed: {
            Rules: function () {
                let rules = {
                    controltype: [
                        {required: true, message: '请选择指令'}
                    ]
                };
                if (this.operData.controltype ==5) {
                    rules.taskid = [
                        {required: true, message: '请选择任务'}
                    ];
                }
                if (this.operData.controltype ==7) {
                    rules.cancelTaskid = [
                        {required: true, message: '请选择任务'}
                    ];
                }
                if (this.operData.controltype ==6) {
                    rules.heartperiod = [
                        {required: true, message: '请输入周期'},
                        {type:'number',min: 0,max: 65535, message: '范围0~65535'}
                    ];
                }
                return rules;
            }
        },
        created: function () {
            this.initData()
        },
        methods: {
            initData: function () {
                CommonContent.deviceType.forEach(item => {
                    this.moduleType[item.name] = item.value;
                })
            },
            controlDevice: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let data = {};
                        data.controltype = this.operData.controltype;
                        if (data.controltype == 5) {
                            data.taskid = this.operData.taskid;
                        } else if (data.controltype == 7) {
                            data.taskid = this.operData.cancelTaskid;
                        } else if (data.controltype == 6) {
                            data.heartperiod = this.operData.heartperiod;
                        }
                        if (this.isGroup) {
                            GroupService.controlLoop(this.device.objectid, data).then(res => {
                                this.hideModal();
                                this.initPaging();
                            })
                        } else {
                            LoopService.control(this.device.deviceid, data).then(res => {
                                this.hideModal();
                                this.initPaging();
                            })
                        }
                    }
                })
            },
            initPaging() {
                this.$emit('initCurrentPaging')
            },
            resetData: function () {
                this.operData = {
                    controltype: 1,
                };
            },
            clearValidate: function (formName) {
                if (this.$refs[formName]) this.$refs[formName].clearValidate();
            },
            showModel(show) {
                if (!show && this.operData.controltype && this.ids.length) {
                    this.visible = true;
                }
            },
            hideModal() {
                this.visible = false;
            },

        }
    }
</script>

<style scoped lang="less">

</style>
