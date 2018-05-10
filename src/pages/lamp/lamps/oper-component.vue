<template>
  <div>
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
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="灯具额定电流：" prop="lampcurrent">
              <el-input type="text" v-model.number.trim="data.lampcurrent" placeholder="请输入灯具额定电流"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="灯具额定电压：" prop="lampvol">
              <el-input type="text" v-model.number.trim="data.lampvol" placeholder="请输入灯具额定电压"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="归属企业：" prop="companyid">
              <tree-select-component v-model="data.companyid" :list="companies"></tree-select-component>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电源额定电流：" prop="supplycurrent">
              <el-input type="text" v-model.number.trim="data.supplycurrent" placeholder="请输入电源额定电流"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电源功率因素：" prop="powerfactor">
              <el-input type="text" v-model.number.trim="data.powerfactor" placeholder="请输入电源功率因素"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电压转化倍率：" prop="voltageratio">
              <el-input type="text" v-model.number.trim="data.voltageratio" placeholder="请输入电压转化倍率"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电压异常比例：" prop="volabratio">
              <el-input type="text" v-model.number.trim="data.volabratio" placeholder="请输入电压异常比例"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电流转化倍率：" prop="curratio">
              <el-input type="text" v-model.number.trim="data.curratio" placeholder="请输入电流转化倍率"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电流异常比例：" prop="curabratio">
              <el-input type="text" v-model.number.trim="data.curabratio" placeholder="请输入电流异常比例"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电源温度告警阈值：" prop="tempthres">
              <el-input type="text" v-model.number.trim="data.tempthres" placeholder="请输入电源温度告警阈值"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="灯具寿命：" prop="lifetime">
              <el-input type="number" v-model.trim.number="data.lifetime" placeholder="请输入灯具寿命"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="灯具功率：" prop="power">
              <el-input type="number" v-model.number.trim="data.power" placeholder="请输入灯具功率"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注：" prop="notes">
              <el-input type="text" v-model.trim="data.notes" placeholder="请输入备注"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">

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
                Rules: {
                    modelnum: [
                        {required: true, message: '请输入灯具型号'}
                    ],
                    lampcurrent: [
                        {required: true, message: '请输入灯具额定电流'},
                        {type: 'number', message: '范围0~25.5', min: 0, max: 25.5}
                    ],
                    companyid: [
                        {required: true, message: '请选择企业'}
                    ],
                    lampvol: [
                        {required: true, message: '请输入灯具额定电压'},
                        {type: 'number', message: '范围0~330', min: 0, max: 330}
                    ],
                    lamptype: [
                        {required: true, message: '选择灯具类型'}
                    ],
                    supplycurrent: [
                        {required: true, message: '请输入电源额定电流'},
                        {type: 'number', message: '范围0~25.5', min: 0, max: 25.5}
                    ],
                    powerfactor: [
                        {required: true, message: '请输入电源功率因素'},
                        {type: 'number', message: '范围0.1~1', min: 0.1, max: 1}
                    ],
                    voltageratio: [
                        {required: true, message: '请输入电压转化倍率'},
                        {type: 'number', message: '范围0~25.5', min: 0, max: 25.5}
                    ],
                    volabratio: [
                        {required: true, message: '请输入电压异常比例'},
                        {type: 'number', message: '范围0~255', min: 0, max: 255}
                    ],
                    curratio: [
                        {required: true, message: '请输入电流转化倍率'},
                        {type: 'number', message: '范围0~25.5', min: 0, max: 25.5}
                    ],
                    curabratio: [
                        {required: true, message: '请输入电流异常比例'},
                        {type: 'number', message: '范围0~255', min: 0, max: 255}
                    ],
                    tempthres: [
                        {required: true, message: '请输入电源温度告警阈值'},
                        {type: 'number', message: '范围0~255', min: 0, max: 255}
                    ],
                },
                visible: false,
                data: {
                    lamptype: 5
                },
                ref: 'edit',
                lamptype: CommonConstant.lampType
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
            }
        },
        methods: {
            initData() {
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
                    this.data = {};
                }
            }
        }
    }
</script>