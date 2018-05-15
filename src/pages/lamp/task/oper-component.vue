<template>
  <div class="oper-component">
    <div v-if="edit" class="icon-item"><span class="edit-icon" @click="showModal">编辑</span></div>
    <div v-else class="add-btn" @click="showModal"><span class="add-icon default-icon"></span>创建</div>
    <el-dialog :title="title" :visible.sync="visible" center :width="'600px'">
      <el-form label-width="170px" :model="data" :rules="Rules" :ref="ref" class="el-form-default" :validate-on-rule-change="false">
        <el-form-item label="任务名称：" prop="taskName">
          <el-input type="text" v-model.trim="data.taskName" placeholder="输入名称"></el-input>
        </el-form-item>
        <el-form-item label="归属企业：" prop="compId">
          <tree-select-component v-model="data.compId" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="任务类型：" prop="moduleType">
          <el-select v-model="data.moduleType" placeholder="选择类型" clearable @change="changeModuletype" style="width: 100%;">
            <el-option v-for="item in deviceType" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作命令：" prop="taskCmd" v-if="data.moduleType">
          <div style="white-space: normal">
            <el-row v-if="data.moduleType == 1">
              <template v-for="item in taskCmd.slice(0, 3)">
                <el-col :span="8"><el-radio v-model="data.taskCmd" :label='item.value'>{{item.text}}</el-radio></el-col>
              </template>
            </el-row>
            <el-row v-if="data.moduleType == 2">
              <template v-for="item in taskCmd.slice(3, 6)">
                <el-col :span="8"><el-radio v-model="data.taskCmd" :label='item.value'>{{item.text}}</el-radio></el-col>
              </template>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item v-show="data.taskCmd == 'circuitryOn' || data.taskCmd == 'circuitryOff'" label="控制回路：" prop="loop">
          <template v-for="(item,index) in selectedLoops" >
            <div style="margin-bottom: 10px">
              <el-input type="number" style="width: 100px; margin-right: 10px" v-model="item.number"></el-input>
              <i title="删除回路" class="el-icon-remove-outline" style="vertical-align: middle;margin-left: 20px;cursor: pointer" @click="deleteLoop(index)"></i>
            </div>
          </template>
          <div style="margin-top: 20px">
            <el-button type="primary" @click="addLoop">添加回路</el-button>
          </div>
        </el-form-item>
        <el-form-item label="任务状态：" prop="taskStatus">
          <el-radio-group v-model="data.taskStatus">
            <template v-for="item in taskStatus">
              <el-radio :label="item.value">{{item.text}}</el-radio>
            </template>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="周期类型：" prop="periodType">
          <div style="white-space: normal">
            <el-row>
              <template v-for="item in periodType.slice(0, 3)">
                <el-col :span="8"><el-radio v-model="data.periodType" :label='item.value'>{{item.text}}</el-radio></el-col>
              </template>
            </el-row>
            <el-row>
              <template v-for="item in periodType.slice(3, 6)">
                <el-col :span="8"><el-radio v-model="data.periodType" :label='item.value'>{{item.text}}</el-radio></el-col>
              </template>
            </el-row>
          </div>
        </el-form-item>
        <!--<el-form-item v-if="data.periodType == 'week'" label="星期：" prop="weekArray">
          <el-select v-model="data.weekArray" placeholder="请选择周几" clearable>
            <el-option v-for="item in week" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="任务执行时间：" prop="execute">
          <el-time-picker style="width: 250px" v-model="data.execute" placeholder="请选择时间" :value-format="'HH:mm'" :format="'HH:mm'"></el-time-picker>
        </el-form-item>
        <!--<el-form-item v-if="data.periodType == 'interval'" label="间隔时间：" prop="intervalTime">
          <el-input type="number" style="width: 200px" v-model.trim.number="data.intervalTime"></el-input>
          分钟
        </el-form-item>-->
        <el-form-item v-if="data.taskCmd == 'lightAdjust'" label="调节亮度：" prop="lightValue">
          <el-slider v-model="data.lightValue"></el-slider>
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
    import taskService from '../../../services/task'
    import CommonConstant from "../../../constants/common";
    export default {
        name: 'operTaskComponent',
        data() {
            return {
                visible: false,
                data: {
                    taskStatus: '',
                    taskCmd: 'lightOn',
                    periodType: 'day'
                },
                ref: 'edit',
                deviceType: [
                    {value: 1, text: '灯控器'},
                    {value: 2, text: '回路控制器'},
                ],
                selectedLoops: [],
                taskCmd: CommonConstant.taskCmd,
                taskStatus: CommonConstant.taskStatus,
                periodType: CommonConstant.taskPeriodType,
                week: CommonConstant.week
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
                    return '编辑任务';
                } else {
                    return '创建任务'
                }
            },
            Rules: function () {
                let rules = {
                    taskName: [
                        {required: true, message: '请输入任务名称'}
                    ],
                    compId: [
                        {required: true, message: '请选择企业'}
                    ],
                    moduleType: [
                        {required: true, message: '请选择任务类型'}
                    ],
                    taskCmd: [
                        {required: true, message: '请选择操作命令'}
                    ],
                    taskStatus: [
                        {required: true, message: '确定任务状态'}
                    ],
                    periodType: [
                        {required: true, message: '请选择周期类型'}
                    ],
                    execute: [
                        {required: true, message: '请选择时间'}
                    ],
                };
                if (this.data.periodType == 'week') {
                    rules.weekArray = [
                        {required: true, message: '请选择时间'}
                    ]
                }
                if (this.data.periodType == 'interval') {
                    rules.intervalTime = [
                        {required: true, message: '请输入间隔时间'},
                        {type: 'number', message: '范围0~4294967295', min: 0, max: 4294967295}
                    ]
                }
                if (this.data.taskCmd == 'lightAdjust') {
                    rules.lightValue = [
                        {required: true},
                    ]
                }
                if (this.data.taskCmd == 'circuitryOn' || this.data.taskCmd == 'circuitryOff' ) {
                    rules.loop = [
                        {required: true, message: '请添加回路数'},
                    ]
                }
                return rules;
            }
        },
        methods: {
            initData() {
            },
            add() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        taskService.add(this.getTransformDataToSend(this.data)).then(res => {
                            this.emitAddEvent();
                            this.hideModal();
                        });
                    }
                })
            },
            getDetail() {
                taskService.getDetail(this.id).then(data => {
                    this.data = this.getTransformDataToUse(data);
                })
            },
            editDevice() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        taskService.edit(this.getTransformDataToSend(this.data)).then(res => {
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
                data = Object.assign({}, data);
                let time = data.execute.split(":");
                data.executeHour = Number(time[0]);
                data.executeMinute = Number(time[1]);
                if (!data.startDayStr) data.startDayStr = '2018-4-24';
                if (!data.endDayStr) data.endDayStr = '2028-4-24';
                delete data.execute
                delete data.endDay
                delete data.startDay
                if (data.taskCmd == 'circuitryOn' || data.taskCmd == 'circuitryOff') {
                    data.loop = this.selectedLoops.map(item => {
                        return item.number;
                    }).join();
                }
                return data;
            },
            getTransformDataToUse(data) {
                data.execute = [data.executeHour,  data.executeMinute].join(':');
                data.endDayStr = data.endDay;
                data.startDayStr = data.startDay;
                if (data.loop) this.selectedLoops = data.loop.split(',').map(item => {
                    return {number: item}
                });
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
                    this.data = { taskStatus: '',
                        taskCmd: 'lightOn',
                        periodType: 'single'};
                }
            }
        }
    }
</script>