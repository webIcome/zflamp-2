<template>
  <div class="control-items">
    <div class="control control-on">
      <el-button :disabled="!ids.length" @click="generate(1)" class="control-btn">查询状态</el-button>
    </div>
    <div class="control control-status">
      <el-button :disabled="!ids.length" @click="generate(2)" class="control-btn">告警归档</el-button>
    </div>
    <div class="control control-set">
      <span class="control-text">设置</span>
      <el-select :disabled="!ids.length" v-model='operData.operateType' placeholder="请选择" @visible-change="showSetModal" clearable>
        <el-option v-for="item in setItems"
                   :label="item.text"
                   :value="item.value"
                   :key="item.value"></el-option>
      </el-select>
    </div>
    <div class="control control-search">
      <span class="control-text">查询</span>
      <el-select :disabled="!ids.length" v-model='operData.operateType' placeholder="请选择" @visible-change="showModal" clearable>
        <el-option v-for="item in searchItems"
                   :label="item.text"
                   :value="item.value"
                   :key="item.value"></el-option>
      </el-select>
    </div>

    <el-dialog title="确定操作" :visible.sync="visible" center width="600px">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p v-if="operData.operateType == 1" class="title">您确认要查询状态吗？</p>
      <p v-else-if="operData.operateType == 2" class="title">您确认要归档这些设备吗？</p>
      <p v-else-if="operData.operateType == 9" class="title">您确认要查询心跳包周期吗？</p>
      <p v-else-if="operData.operateType == 10" class="title">您确认要查询告警周期吗？</p>
      <p v-else-if="operData.operateType == 11" class="title">您确认要查询告警阈值吗？</p>
      <p v-else-if="operData.operateType == 12" class="title">您确认要解除告警阈值吗？</p>
      <p v-else-if="operData.operateType == 13" class="title">您确认要查询告警使能吗？</p>
      <p v-else-if="operData.operateType == 14" class="title">您确认要查询采集周期吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="控制" :visible.sync="setVisible" center width="400px">
      <el-form label-width="100px" :model="operData" ref="well-form" :rules="Rules" class="el-form-default" :validate-on-rule-change="false">
        <template v-if="operData.operateType == 3">
          <el-form-item label="心跳包周期：" prop="operateValue">
            <el-input type="text" v-model.trim="operData.operateValue"></el-input>
          </el-form-item>
        </template>
        <template v-if="operData.operateType == 4">
          <el-form-item label="告警周期：" prop="operateValue">
            <el-input type="text" v-model.trim="operData.operateValue"></el-input>
          </el-form-item>
        </template>
        <template v-if="operData.operateType ==5">
          <el-form-item label="告警阈值：" prop="operateValue">
            <el-input type="text" v-model.trim="operData.operateValue"></el-input>
          </el-form-item>
        </template>
        <template v-if="operData.operateType == 6">
          <el-form-item label="解除告警阈值：" prop="operateValue">
            <el-input type="text" v-model.trim="operData.operateValue"></el-input>
          </el-form-item>
        </template>
        <template v-if="operData.operateType == 7">
          <el-form-item label="告警使能：" prop="operateValue">
            <el-input type="text" v-model.trim="operData.operateValue"></el-input>
          </el-form-item>
        </template>
        <template v-if="operData.operateType == 8">
          <el-form-item label="采集周期：" prop="operateValue">
            <el-input type="text" v-model.trim="operData.operateValue"></el-input>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlSetDevice('well-form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
    import Service from "../../../services/illuminance";
    import CommonContent from "../../../constants/common";
    import controlTimerMixin from '../../../mixins/control-timer-mixin'
    export default {
        name: 'controlIlluminanceComponent',
        components: {},
        mixins: [controlTimerMixin],
        data() {

            return {
                moduleType: {},
                brightness: 0,
                visible: false,
                setVisible: false,
                operData: {},
                operateType: '',
                Rules: {
                    operateValue: [
                        {required: true, trigger: 'change' },
                    ]
                },
                setItems: [
                    {value: 3, text: '设置心跳包周期'},
                    {value: 4, text: '设置告警周期'},
                    {value: 5, text: '设置告警阈值'},
                    {value: 6, text: '设置解除告警阈值'},
                    {value: 7, text: '设置告警使能'},
                    {value: 8, text: '设置采集周期'},
                ],
                searchItems: [
                    {value: 9, text: '心跳包周期'},
                    {value: 10, text: '告警周期'},
                    {value: 11, text: '告警阈值'},
                    {value: 12, text: '解除告警阈值'},
                    {value: 13, text: '告警使能'},
                    {value: 14, text: '采集周期'},
                ],
            }
        },
        props: {
            ids: {
                default: function () {
                    return []
                }
            },
            deviceIds: {
                default: function () {
                    return []
                }
            }
        },
        computed: {
            Rules: function () {
                let rules = {};
                if (this.operData.operateType == 3) {
                    rules.operateValue = [
                        {required: true, message: '请输入心跳包周期'},
                        {type: 'number', message: '范围0~330', min: 0, max: 330}
                    ]
                } else if (this.operData.operateType == 4) {
                    rules.operateValue = [
                        {required: true, message: '请输入告警周期'},
                        {type: 'number', message: '范围0~330', min: 0, max: 330}
                    ]
                } else if (this.operData.operateType == 5) {
                    rules.operateValue = [
                        {required: true, message: '请输入告警阈值'},
                        {type: 'number', message: '范围0~330', min: 0, max: 330}
                    ]
                } else if (this.operData.operateType == 6) {
                    rules.operateValue = [
                        {required: true, message: '请输入解除告警阈值'},
                        {type: 'number', message: '范围0~330', min: 0, max: 330}
                    ]
                } else if (this.operData.operateType == 7) {
                    rules.operateValue = [
                        {required: true, message: '请输入告警使能'},
                        {type: 'number', message: '范围0~330', min: 0, max: 330}
                    ]
                } else if (this.operData.operateType == 8) {
                    rules.operateValue = [
                        {required: true, message: '请输入采集周期'},
                        {type: 'number', message: '范围0~330', min: 0, max: 330}
                    ]
                }
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
            generate(operateType) {
                if (operateType) this.operData.operateType = operateType;
                this.showModal();
            },
            controlDevice: function () {
                let ids = this.deviceIds.join(',');
                if (this.operData.operateType == 2) {
                    ids = this.ids.join(',')
                }
                this.getControlFn(this.operData.operateType)(ids).then(res => {
                    this.hideModal();
                    this.initPaging();
                    this.resetData();
                });
            },
            controlSetDevice(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let data = this.operData;
                        data.deviceIds = this.deviceIds.join(',');
                        this.getControlFn(this.operData.operateType)(data).then(res => {
                            this.hideModal();
                            this.initPaging();
                            this.resetData();
                        });
                    }
                })
            },
            getControlFn(operateType) {
                let fn = '';
                switch (operateType) {
                    case 1:
                        fn = Service.controlSearchStatus;
                        break;
                    case 2:
                        fn = Service.pigeonhole;
                        break;
                    case 3:
                        fn = Service.controlSetHeartPeriod;
                        break;
                    case 4:
                        fn = Service.controlSetAlarmPeriod;
                        break;
                    case 5:
                        fn = Service.controlSetAlarmValue;
                        break;
                    case 6:
                        fn = Service.controlSetRelieveAlarmValue;
                        break;
                    case 7:
                        fn = Service.controlSetAlarmEnabled;
                        break;
                    case 8:
                        fn = Service.controlSetGatherPeriod;
                        break;
                    case 9:
                        fn = Service.controlSearchHeartPeriod;
                        break;
                    case 10:
                        fn = Service.controlSearchAlarmPeriod;
                        break;
                    case 11:
                        fn = Service.controlSearchAlarmValue;
                        break;
                    case 12:
                        fn = Service.controlSearchRelieveAlarmValue;
                        break;
                    case 13:
                        fn = Service.controlSearchAlarmEnabled;
                        break;
                    case 14:
                        fn = Service.controlSearchGatherPeriod;
                        break;
                }
                return fn
            },
            showModal() {
                this.visible = true;
            },
            showSetModal() {
                this.setVisible = true;
            },
            hideModal: function () {
                this.visible = false;
                this.setVisible = false;
            },
            resetData: function () {
                this.operData = {}
            }
        }
    }
</script>

<style scoped lang="less">

  .control-brightness {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    .el-slider {
      flex: 1;
      margin-left: 20px;
    }
  }

  .control-status {
    .control-icon {
      background: url("../../../assets/control/reflesh.png") no-repeat;
      background-size: contain;
    }
  }

  .control-search,
  .control-set {
    display: flex;
    align-items: center;
  }

</style>
