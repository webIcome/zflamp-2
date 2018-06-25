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
            <el-input type="text" v-model.trim.number="operData.operateValue" clearable></el-input>
          </el-form-item>
        </template>
        <template v-else-if="operData.operateType == 4">
          <el-form-item label="告警周期/分钟：" prop="operateValue">
            <el-input type="text" v-model.trim.number="operData.operateValue" clearable></el-input>
          </el-form-item>
        </template>
        <template v-else-if="operData.operateType ==5">
          <el-form-item label="告警阈值上限/0.1lux：" prop="operateValueMin">
            <el-input type="text" v-model.trim.number="operData.operateValueMin" clearable></el-input>
          </el-form-item>
          <el-form-item label="告警阈值上限/0.1lux：" prop="operateValueMax">
            <el-input type="text" v-model.trim.number="operData.operateValueMax" clearable></el-input>
          </el-form-item>
        </template>
        <template v-else-if="operData.operateType == 6">
          <el-form-item label="解除告警阈值/0.1lux：" prop="operateValue">
            <el-input type="text" v-model.trim.number="operData.operateValue" clearable></el-input>
          </el-form-item>
        </template>
        <template v-else-if="operData.operateType == 7">
          <el-form-item label="告警使能：" prop="operateValue">
            <el-radio v-model="operData.operateValue" :label='1'>开启</el-radio>
            <el-radio v-model="operData.operateValue" :label='0'>关闭</el-radio>
          </el-form-item>
        </template>
        <template v-else-if="operData.operateType == 8">
          <el-form-item label="采集周期/s：" prop="operateValue">
            <el-input type="text" v-model.trim.number="operData.operateValue" clearable></el-input>
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
    import Service from "../../../../services/illuminance";
    import controlSetMixin from "../../control-set-mixin"
    export default {
        mixins: [controlSetMixin],
        data() {
            return {
                setItems: [
                    {value: 3, text: '设置心跳包周期'},
                    {value: 4, text: '设置告警周期'},
                    {value: 5, text: '设置告警阈值'},
                    {value: 6, text: '设置解除告警阈值'},
                    {value: 7, text: '设置告警使能'},
                    {value: 8, text: '设置采集周期'},
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
                    rules.operateValueMin = [
                        {required: true, message: '请输入告警阈值下限'},
                        {type: 'number', message: '范围0~告警阈值上限', min: 0, max: this.operData.operateValueMax},
                        {pattern: /^[0-9]+$/, message: '必须为正整数'}
                    ]
                    rules.operateValueMax = [
                        {required: true, message: '请输入告警阈值上限'},
                        {type: 'number', message: '范围 告警阈值下限~16777215', min: this.operData.operateValueMin, max: 16777215},
                        {pattern: /^[0-9]+$/, message: '必须为正整数'}
                    ]
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
                        {type: 'number', message: '范围0~65536', min: 0, max: 65536},
                        {pattern: /^[0-9]+$/, message: '必须为正整数'}
                    ]
                }
                return rules
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
        },
    }
</script>
