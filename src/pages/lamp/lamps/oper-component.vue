<template>
  <div class="oper-component">
    <div v-if="edit" class="icon-item"><span class="edit-icon" @click="showModal">编辑</span></div>
    <div v-else class="add-btn" @click="showModal"><span class="add-icon default-icon"></span>创建</div>
    <el-dialog :title="title" :visible.sync="visible" center :width="'1000px'">
      <el-form label-width="200px" :model="data" :rules="Rules" :ref="ref" class="el-form-default">
        <el-row>
          <el-col :span="12">
            <el-form-item label="灯具型号：" prop="modelnum">
              <el-input v-model.trim="data.modelnum" placeholder="请输入灯具型号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="灯具类型：" prop="lamptype">
              <el-select v-model="data.lamptype" placeholder="选择灯具类型" clearable style="width: 100%;">
                <el-option v-for="type in lamptype" :value="type.value" :key="type.value"
                           :label="type.text"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="灯具寿命/H：" prop="lifetime">
              <el-input type="number" v-model.trim.number="data.lifetime" placeholder="请输入灯具寿命"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="灯具功率/W：" prop="power">
              <el-input type="number" v-model.number.trim="data.power" placeholder="请输入灯具功率"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归属项目：" prop="companyid">
              <tree-select-component v-model="data.companyid" :list="companies"></tree-select-component>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="灯控器类型：" prop="lightType">
              <el-select v-model="data.lightType" placeholder="选择灯控器类型" style="width: 100%;">
                <el-option v-for="type in lightControllerType" :value="type.value" :key="type.value"
                           :label="type.text"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <template v-if="data.lightType == 1">
            <el-col :span="12">
              <el-form-item label="灯具额定电流/A：" prop="lampcurrent">
                <el-input type="text" v-model.number.trim="data.lampcurrent" placeholder="请输入灯具额定电流"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="灯具额定电压/V：" prop="lampvol">
                <el-input type="text" v-model.number.trim="data.lampvol" placeholder="请输入灯具额定电压"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电压转化倍率：" prop="voltageratio">
                <el-input type="text" v-model.number.trim="data.voltageratio" placeholder="请输入电压转化倍率"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电压异常比例/%：" prop="volabratio">
                <el-input type="text" v-model.number.trim="data.volabratio" placeholder="请输入电压异常比例"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电流转化倍率：" prop="curratio">
                <el-input type="text" v-model.number.trim="data.curratio" placeholder="请输入电流转化倍率"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电流异常比例/%：" prop="curabratio">
                <el-input type="text" v-model.number.trim="data.curabratio" placeholder="请输入电流异常比例"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电源功率因素：" prop="powerfactor">
                <el-input type="text" v-model.number.trim="data.powerfactor" placeholder="请输入电源功率因素"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电源额定电流/A：" prop="supplycurrent">
                <el-input type="text" v-model.number.trim="data.supplycurrent" placeholder="请输入电源额定电流"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电源温度告警阈值/℃：" prop="tempthres">
                <el-input type="text" v-model.number.trim="data.tempthres" placeholder="请输入电源温度告警阈值"/>
              </el-form-item>
            </el-col>
          </template>
          <template v-else>
            <el-col :span="12">
              <el-form-item label="电容故障PFC/W：" prop="capacityFaultPfc">
                <el-input type="number" v-model.number.trim="data.capacityFaultPfc" placeholder="请输入电容故障PFC"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电容故障PFC下限：" prop="capacityFaultPfcMin">
                <el-input type="number" v-model.number.trim="data.capacityFaultPfcMin" placeholder="请输入电容故障PFC下限"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电容故障PFC上限：" prop="capacityFaultPfcMax">
                <el-input type="number" v-model.number.trim="data.capacityFaultPfcMax" placeholder="请输入电容故障PFC上限"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="灯具故障PFC：" prop="lightFaultPfc">
                <el-input type="number" v-model.number.trim="data.lightFaultPfc" placeholder="请输入灯具故障PFC"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="灯具故障功率/W：" prop="lightFaultPower">
                <el-input type="number" v-model.number.trim="data.lightFaultPower" placeholder="请输入灯具故障功率"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电源故障电流/A：" prop="powerFaultCurrents">
                <el-input type="number" v-model.number.trim="data.powerFaultCurrents" placeholder="请输入电源故障电流"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电源故障功率/W：" prop="powerFaultPower">
                <el-input type="number" v-model.number.trim="data.powerFaultPower" placeholder="请输入电源故障功率"/>
              </el-form-item>
            </el-col>
          </template>
          <el-col :span="12">
            <el-form-item label="备注：" prop="notes">
              <el-input type="text" v-model.trim="data.notes" placeholder="请输入备注"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="edit" type="primary" @click="editDevice">确 定</el-button>
        <el-button v-else type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import LampsService from '../../../services/lamps'
    import CommonConstant from "../../../constants/common";
    export default {
        name: 'operLampsComponent',
        data() {
            return {
                visible: false,
                data: {
                    lamptype: 5,
                    lightType: 1,
                    lifetime: 30000,
                    power: 40,
                },
                fdData: {
                    capacityFaultPfc: 40,
                    capacityFaultPfcMin: 0.2,
                    capacityFaultPfcMax: 0.4,
                    lightFaultPfc: 0.1,
                    lightFaultPower: 40,
                    powerFaultCurrents: 0.4,
                    powerFaultPower: 40
                },
                zxData: {
                    lampcurrent: 1,
                    lampvol: 20,
                    voltageratio: 20,
                    volabratio: 20,
                    curratio: 1.2,
                    curabratio: 20,
                    powerfactor: 0.9,
                    supplycurrent: 1,
                    tempthres: 80
                },
                ref: 'edit',
                lamptype: CommonConstant.lampType,
                lightControllerType: CommonConstant.lightControllerType
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
                    return '编辑灯具';
                } else {
                    return '创建灯具'
                }
            },
            Rules: function () {
                let rules = {
                    modelnum: [
                        {required: true, message: '请输入灯具型号'}
                    ],
                    companyid: [
                        {required: true, message: '请选择企业'}
                    ],
                    lamptype: [
                        {required: true, message: '选择灯具类型'}
                    ],
                    lifetime: [
                        {required: true, message: '请输入灯具寿命'}
                    ],
                    power: [
                        {required: true, message: '请输入灯具功率'}
                    ],
                    lightType: [
                        {required: true, message: '选择灯控器类型'}
                    ]
                }
                if (this.data.lightType == 1) {
                    rules.lampcurrent = [
                        {required: true, message: '请输入灯具额定电流'},
                        {type: 'number', message: '范围0~25.5', min: 0, max: 25.5}
                    ];
                    rules.lampvol = [
                        {required: true, message: '请输入灯具额定电压'},
                        {type: 'number', message: '范围0~330', min: 0, max: 330}
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
                    rules.powerfactor = [
                        {required: true, message: '请输入电源功率因素'},
                        {type: 'number', message: '范围0.1~1', min: 0.1, max: 1}
                    ];
                    rules.supplycurrent = [
                        {required: true, message: '请输入电源额定电流'},
                        {type: 'number', message: '范围0~25.5', min: 0, max: 25.5}
                    ];
                    rules.tempthres = [
                        {required: true, message: '请输入电源温度告警阈值'},
                        {type: 'number', message: '范围0~255', min: 0, max: 255}
                    ]
                } else {
                    rules.capacityFaultPfc = [
                        {required: true, message: '请输入电容故障PFC'},
                    ];
                    rules.capacityFaultPfcMin = [
                        {required: true, message: '请输入电容故障PFC下限'},
                    ];
                    rules.capacityFaultPfcMax = [
                        {required: true, message: '请输入电容故障PFC上限'},
                    ];
                    rules.lightFaultPfc = [
                        {required: true, message: '请输入灯具故障PFC'},
                    ];
                    rules.lightFaultPower = [
                        {required: true, message: '请输入灯具故障功率'},
                    ];
                    rules.powerFaultCurrents = [
                        {required: true, message: '请输入电源故障电流'},
                    ];
                    rules.powerFaultPower = [
                        {required: true, message: '请输入电源故障功率'},
                    ];
                }
                return rules;
            }
        },
        methods: {
            initData() {
                if (this.data.lightType == 1) {
                    this.data = Object.assign(this.data, this.zxData)
                } else {
                    this.data = Object.assign(this.data, this.fdData)
                }
            },
            add() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        LampsService.add(this.data).then(res => {
                            this.emitAddEvent();
                            this.hideModal();
                        });
                    }
                })
            },
            getDetail() {
                LampsService.getDetail(this.id).then(data => {
                    this.data = data;
                })
            },
            editDevice() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        LampsService.edit(this.id, this.data).then(res => {
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
                    if (this.edit) this.getDetail();
                    this.clearValidate();
                } else {
                    this.initData()
                }
            },
            ['data.lightType']: function () {
                this.initData();
            }
        }
    }
</script>