<template>
  <div>
    <div class="control control-set">
      <span class="control-text">设置</span>
      <el-select :disabled="!deviceIds.length" v-model='operData.operateType' placeholder="请选择" @visible-change="showModal" clearable>
        <el-option v-for="item in setItems"
                   :label="item.text"
                   :value="item.value"
                   :key="item.value"></el-option>
      </el-select>
    </div>
    <el-dialog title="控制" :visible.sync="visible" center width="500px">
      <el-form label-width="170px" :model="operData" :ref="ref" :rules="Rules" class="el-form-default" :validate-on-rule-change="false">
        <template v-if="operData.operateType == 3">
          <el-form-item label="心跳包周期/h：" prop="operateValue">
            <el-input type="text" v-model.trim.number="operData.operateValue"></el-input>
          </el-form-item>
        </template>
        <template v-if="operData.operateType == 4">
          <el-form-item label="告警周期/分钟：" prop="operateValue">
            <el-input type="text" v-model.trim.number="operData.operateValue"></el-input>
          </el-form-item>
        </template>
        <template v-if="operData.operateType == 5">
          <el-form-item label="告警阈值下限/cm：" prop="operateValueMin">
            <el-radio v-model="operData.min" :label='1'>设置值</el-radio>
            <el-radio v-model="operData.min" :label='0'>无</el-radio>
            <el-input v-if="operData.min == 1" type="text" v-model.trim.number="operData.operateValueMin" clearable></el-input>
          </el-form-item>
          <el-form-item label="告警阈值上限/cm：" prop="operateValueMax">
            <el-radio v-model="operData.max" :label='1'>设置值</el-radio>
            <el-radio v-model="operData.max" :label='0'>无</el-radio>
            <el-input v-if="operData.max == 1" type="text" v-model.trim.number="operData.operateValueMax" clearable></el-input>
          </el-form-item>
        </template>
        <template v-if="operData.operateType == 6">
          <el-form-item label="解除告警阈值/cm：" prop="operateValue">
            <el-input type="text" v-model.trim.number="operData.operateValue"></el-input>
          </el-form-item>
        </template>
        <template v-if="operData.operateType == 7">
          <el-form-item label="告警使能：" prop="operateValue">
            <el-radio v-model="operData.operateValue" :label='1'>开启</el-radio>
            <el-radio v-model="operData.operateValue" :label='0'>关闭</el-radio>
          </el-form-item>
        </template>
        <template v-if="operData.operateType == 8">
          <el-form-item label="采集周期/s：" prop="operateValue">
            <el-input type="text" v-model.trim.number="operData.operateValue"></el-input>
          </el-form-item>
        </template>
        <template v-if="operData.operateType == 9">
          <el-form-item label="量程/m：" prop="operateValue">
            <el-input type="text" v-model.trim.number="operData.operateValue"></el-input>
          </el-form-item>
        </template>
        <template v-if="operData.operateType == 10">
          <el-form-item label="设置初始化标准：" prop="operateValue">
            <el-input type="text" v-model.trim.number="operData.operateValue"></el-input>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlSetDevice()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import Service from "../../../../services/water-level";
    import controlSetMixin from "../../control-set-mixin"
    export default {
        mixins: [controlSetMixin],
        data() {
            return {
                setItems: [
                    {value: 3, text: '心跳包周期'},
                    {value: 4, text: '告警周期'},
                    {value: 5, text: '告警阈值'},
                    {value: 6, text: '解除告警阈值'},
                    {value: 7, text: '告警使能'},
                    {value: 8, text: '采集周期'},
                    {value: 9, text: '量程'},
                    {value: 10, text: '初始化标准'},
                ],
            }
        },
        computed: {
            Rules: function () {
                let rules = {};
                if (this.operData.operateType == 3) {
                    rules.operateValue = [
                        {required: true, message: '请输入心跳包周期'},
                        {type: 'number', message: '范围1~24', min: 1, max: 24},
                        {pattern: /^[0-9]+$/, message: '必须为正整数'}
                    ]
                } else if (this.operData.operateType == 4) {
                    rules.operateValue = [
                        {required: true, message: '请输入告警周期'},
                        {type: 'number', message: '范围0~255', min: 0, max: 255},
                        {pattern: /^[0-9]+$/, message: '必须为正整数'}
                    ]
                } else if (this.operData.operateType == 5) {
                 /*   rules.operateValueMin = [
                        {required: true, message: '请选择告警阈值下限选项'},
                    ];
                    rules.operateValueMax = [
                        {required: true, message: '请选择告警阈值上限选项'},
                    ];*/
                    if (this.operData.min == 1) {
                        rules.operateValueMin = [
                            {required: true, message: '请输入告警阈值下限'},
                            {type: 'number', message: '范围0~告警阈值上限', min: 0, max: this.operData.operateValueMax},
                            {pattern: /^[0-9]+$/, message: '必须为正整数'}
                        ]
                    }
                    if (this.operData.max == 1) {
                        rules.operateValueMax = [
                            {required: true, message: '请输入告警阈值上限'},
                            {type: 'number', message: '范围 告警阈值下限~65535', min: this.operData.operateValueMin, max: 65535},
                            {pattern: /^[0-9]+$/, message: '必须为正整数'}
                        ]
                    }
                } else if (this.operData.operateType == 6) {
                    rules.operateValue = [
                        {required: true, message: '请输入解除告警阈值'},
                        {type: 'number', message: '范围0~255', min: 0, max: 255},
                        {pattern: /^[0-9]+$/, message: '必须为正整数'}
                    ]
                } else if (this.operData.operateType == 7) {
                    rules.operateValue = [
                        {required: true, message: '请选择告警使能'},
                    ]
                } else if (this.operData.operateType == 8) {
                    rules.operateValue = [
                        {required: true, message: '请输入采集周期'},
                        {type: 'number', message: '范围0~65535', min: 0, max: 65535},
                        {pattern: /^[0-9]+$/, message: '必须为正整数'}
                    ]
                }
                else if (this.operData.operateType == 9) {
                    rules.operateValue = [
                        {required: true, message: '请输入量程'},
                        {type: 'number', message: '范围0~255', min: 0, max: 255},
                        {pattern: /^[0-9]+$/, message: '必须为正整数'}
                    ]
                } else if (this.operData.operateType == 10) {
                    rules.operateValue = [
                        {required: true, message: '请输入初始化标准'},
                        {type: 'number', message: '范围-127~127', min: -127, max: 127},
                        {pattern: /^[-+]?[0-9]+$/, message: '必须为整数'}
                    ]
                }
                return rules;
            }
        },
        methods: {
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
                        fn = Service.controlSetRange;
                        break;
                    case 10:
                        fn = Service.controlSetResetData;
                        break;
                }
                return fn
            },
            validateField(prop) {
                this.$refs[this.ref].validateField(prop, (errorMessage) => {

                })
            }
        },
        watch: {
            ['operData.min'](newVal, oldVal) {
                if (newVal) {
                    this.operData.operateValueMin = ''
                } else {
                    this.operData.operateValueMin = 65535;
                    this.validateField('operateValueMin')
                }
            },
            ['operData.max'](newVal, oldVal) {
                if (newVal) {
                    this.operData.operateValueMax = ''
                } else {
                    this.operData.operateValueMax = 65535;
                    this.validateField('operateValueMax')
                }
            },
            ['operData.operateType'](newVal) {
                if (newVal == 5){
                    this.$set(this.operData, 'min', 1)
                    this.$set(this.operData, 'max', 1)
                }
            }
        }

    }
</script>
