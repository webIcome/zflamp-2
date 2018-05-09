<template>
  <div style="margin-left: 10px">
    <el-select v-model='operData.controltype' placeholder="请选择" @visible-change="showModel" clearable>
      <el-option v-for="item in items"
                 :label="item.text"
                 :value="item.value"
                 :key="item.value"></el-option>
    </el-select>
    <el-dialog title="控制灯控器" :visible.sync="visible" center width="900px">
      <el-form label-width="220px" :model="operData" ref="controlDevice" :rules="Rules" class="el-form-default"
               :validate-on-rule-change="false">
        <el-form-item v-if="operData.controltype == 5" label="任务：" prop="taskid">
          <select-tasks-component v-model="operData.taskid"
                                  :moduletype="moduleType.light"
                                  :timedtasktotal="timedtasktotal"
                                  :ids="ids"></select-tasks-component>
        </el-form-item>
        <el-form-item v-if="operData.controltype == 6" label="取消定时任务：" prop="taskid">
          <cancel-tasks-component v-model="operData.taskid"
                                  :moduletype="moduleType.light"
                                  :deviceid="device.deviceid"></cancel-tasks-component>
        </el-form-item>
        <template v-if="operData.controltype == 8">
          <el-row>
            <el-col :span="12">
              <el-form-item label="电源额定电流：" prop="supplycurrent">
                <el-input type="text" v-model.number="operData.supplycurrent"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="灯具额定电流：" prop="lampcurrent">
                <el-input type="text" v-model.number="operData.lampcurrent"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="灯具额定电压：" prop="lampvol">
                <el-input type="text" v-model.number="operData.lampvol"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电源功率因素：" prop="powerfactor">
                <el-input type="text" v-model.number="operData.powerfactor"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="电压转化倍率：" prop="voltageratio">
                <el-input type="text" v-model.number="operData.voltageratio"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电压异常比例：" prop="volabratio">
                <el-input type="text" v-model.number="operData.volabratio"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="电流转化倍率：" prop="curratio">
                <el-input type="text" v-model.number="operData.curratio"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电流异常比例：" prop="curabratio">
                <el-input type="text" v-model.number="operData.curabratio"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="温度告警阈值：" prop="tempthres">
                <el-input type="text" v-model.number="operData.tempthres"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <template v-if="operData.controltype == 10">
          <el-row>
            <el-col :span="12">
              <el-form-item label="灯具故障检测开启标志：" prop="lampfault">
                <el-radio v-model="operData.lampfault" :label='1'>开启</el-radio>
                <el-radio v-model="operData.lampfault" :label='2'>关闭</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电源故障检测开启标志：" prop="supplyfault">
                <el-radio v-model="operData.supplyfault" :label='1'>开启</el-radio>
                <el-radio v-model="operData.supplyfault" :label='2'>关闭</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="功率故障检测开启标志：" prop="powerfactorfault">
                <el-radio v-model="operData.powerfactorfault" :label='1'>开启</el-radio>
                <el-radio v-model="operData.powerfactorfault" :label='2'>关闭</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="过压检测开启标志：" prop="overvoltage">
                <el-radio v-model="operData.overvoltage" :label='1'>开启</el-radio>
                <el-radio v-model="operData.overvoltage" :label='2'>关闭</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="欠压检测开启标志：" prop="undervoltage">
                <el-radio v-model="operData.undervoltage" :label='1'>开启</el-radio>
                <el-radio v-model="operData.undervoltage" :label='2'>关闭</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="过流检测开启标志：" prop="overcurrent">
                <el-radio v-model="operData.overcurrent" :label='1'>开启</el-radio>
                <el-radio v-model="operData.overcurrent" :label='2'>关闭</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="欠流检测开启标志：" prop="undercurrent">
                <el-radio v-model="operData.undercurrent" :label='1'>开启</el-radio>
                <el-radio v-model="operData.undercurrent" :label='2'>关闭</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="温度异常检测开启标志：" prop="tempfault">
                <el-radio v-model="operData.tempfault" :label='1'>开启</el-radio>
                <el-radio v-model="operData.tempfault" :label='2'>关闭</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <el-form-item v-show="operData.controltype == 12" label="电参数上报周期：" prop="elecuploadperiod">
          <el-input style="width: 200px" type="text" v-model.number="operData.elecuploadperiod"></el-input>
          H


        </el-form-item>
        <el-form-item v-show="operData.controltype == 15" label="传感器使能：" prop="enablesensor">
          <el-radio v-model="operData.enablesensor" :label='1'>有效</el-radio>
          <el-radio v-model="operData.enablesensor" :label='2'>无效</el-radio>
        </el-form-item>
        <el-form-item v-show="operData.controltype == 15 && operData.enablesensor == 1" label="感应保持状态时间："
                      prop="inducedkeeptime">
          <el-input type="text" v-model.trim.number="operData.inducedkeeptime"></el-input>
        </el-form-item>
        <template v-if="operData.controltype == 16">
          <el-form-item label="有感应亮度：" prop="inducedbrightness">
            <el-slider v-model="operData.inducedbrightness">
            </el-slider>
          </el-form-item>
          <el-form-item label="无感应亮度：" prop="noinducedbrightness">
            <div>
              <el-radio v-model="noinducedbrightness" :label='0'>关灯</el-radio>
            </div>
            <div>
              <el-radio v-model="noinducedbrightness" :label='1'>亮度</el-radio>
              <el-slider v-if="noinducedbrightness == 1" v-model="operData.noinducedbrightness"></el-slider>
            </div>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice('controlDevice')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import Service from "../../../services/light"
    import selectTaskComponent from "../task/select-component.vue"
    import CommonContent from "../../../constants/common"
    export default {
        name: 'controlLightSetComponent',
        components: {
            selectTaskComponent
        },
        data() {
            return {
                noinducedbrightness: 0,
                operData: {},
                visible: false,
                moduleType: {},
            }
        },
        props: {
            ids: {
                default: []
            },
            items: {
                default: []
            },
            timedtasktotal: {
                defalult: 0
            }
        },
        computed: {
            Rules: function () {
                let rules = {
                    controltype: [
                        {required: true, message: '请选择指令'}
                    ],
                };
                switch (this.operData.controltype) {
                    case 5:
                    case 6:
                        rules.taskid = [
                            {required: true, message: '请选择任务'}
                        ];
                        break;
                    case 7:
                        rules.rgb = [
                            {required: true, message: '请选择颜色'}
                        ];
                        break;
                    case 8:
                        rules.supplycurrent = [
                            {required: true, message: '请输入电源额定电流'},
                            {type: 'number', message: '范围0~25.5', min: 0, max: 25.5}
                        ];
                        rules.lampcurrent = [
                            {required: true, message: '请输入灯具额定电流'},
                            {type: 'number', message: '范围0~25.5', min: 0, max: 25.5}
                        ];
                        rules.lampvol = [
                            {required: true, message: '请输入灯具额定电压'},
                            {type: 'number', message: '范围0~330', min: 0, max: 330}
                        ];
                        rules.powerfactor = [
                            {required: true, message: '请输入电源功率因素'},
                            {type: 'number', message: '范围0.1~1', min: 0.1, max: 1}
                        ];
                        rules.voltageratio = [
                            {required: true, message: '请输入电压转化倍率'},
                            {type: 'number', message: '范围0~25.5', min: 0, max: 25.5}
                        ];
                        rules.volabratio = [
                            {required: true, message: '请输入电压异常比例'},
                            {type: 'number', message: '范围0~255', min: 0, max: 255}
                        ];
                        rules.curratio = [
                            {required: true, message: '请输入电流转化倍率'},
                            {type: 'number', message: '范围0~25.5', min: 0, max: 25.5}
                        ];
                        rules.curabratio = [
                            {required: true, message: '请输入电流异常比例'},
                            {type: 'number', message: '范围0~255', min: 0, max: 255}
                        ];
                        rules.tempthres = [
                            {required: true, message: '请输入温度告警阀值'},
                            {type: 'number', message: '范围0~255', min: 0, max: 255}
                        ];
                        break;
                    case 10:
                        rules.lampfault = [
                            {required: true, message: '请选择灯具故障检测开启标志', trigger: 'change'}
                        ];
                        rules.supplyfault = [
                            {required: true, message: '请选择电源故障检测开启标志'}
                        ];
                        rules.powerfactorfault = [
                            {required: true, message: '请选择电源功率故障检测开启标志'}
                        ];
                        rules.overvoltage = [
                            {required: true, message: '请选择过压检测开启标志'}
                        ];
                        rules.undervoltage = [
                            {required: true, message: '请选择欠压检测开启标志'}
                        ];
                        rules.overcurrent = [
                            {required: true, message: '请选择过流检测开启标志'}
                        ];
                        rules.undercurrent = [
                            {required: true, message: '请选择欠流检测开启标志'}
                        ];
                        rules.tempfault = [
                            {required: true, message: '请选择温度异常检测开启标志'}
                        ];
                        break;
                    case 12:
                        rules.elecuploadperiod = [
                            {required: true, message: '请输入电参数上报周期'},
                            {type: 'number', message: '范围0~255', min: 0, max: 255}
                        ];
                        break;
                    case 15:
                        rules.enablesensor = [
                            {required: true, message: '请选择传感器使能'}
                        ];
                        if (this.operData.enablesensor == 1) {
                            rules.inducedkeeptime = [
                                {required: true, message: '请输入感应保持状态时间'},
                                {type: 'number', message: '范围0~255', min: 0, max: 255}
                            ];
                        }
                        break;
                    case 16:
                        rules.inducedbrightness = [
                            {required: true, message: '有感应亮度不能为空'},
                        ];
                        break;
                    default:
                        break;
                }
                return rules;
            },
            isAllow: function () {
                return this.isGroup || this.device.timedtasktotal < 6
            }
        },
        created() {
            CommonContent.deviceType.forEach(item => {
                this.moduleType[item.name] = item.value;
            })
        },
        methods: {
            controlDevice(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let data = this.transformData(this.operData);
                        data.deviceIds = this.ids;
                        Service.controlLights(data).then(res => {
                            this.hideModal();
                        });
                    }
                })
            },
            transformData(data) {
                if (data.controltype == 16) {
                    if (this.noinducedbrightness == 0) {
                        data.noinducedbrightness = 255
                    }
                }
                return Object.assign({}, data)
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