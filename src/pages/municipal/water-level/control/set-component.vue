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
    <el-dialog title="控制" :visible.sync="visible" center width="400px">
      <el-form label-width="140px" :model="operData" :ref="ref" :rules="Rules" class="el-form-default" :validate-on-rule-change="false">
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
        <template v-if="operData.operateType == 5">
          <el-form-item label="告警阈值：" prop="operateValue">
            <el-input type="text" v-model.trim="operData.operateValue"></el-input>
          </el-form-item>
        </template>
        <template v-if="operData.operateType == 8">
          <el-form-item label="解除告警阈值：" prop="operateValue">
            <el-input type="text" v-model.trim="operData.operateValue"></el-input>
          </el-form-item>
        </template>
        <template v-if="operData.operateType == 8">
          <el-form-item label="告警使能：" prop="operateValue">
            <el-input type="text" v-model.trim="operData.operateValue"></el-input>
          </el-form-item>
        </template>
        <template v-if="operData.operateType == 8">
          <el-form-item label="采集周期：" prop="operateValue">
            <el-input type="text" v-model.trim="operData.operateValue"></el-input>
          </el-form-item>
        </template>
        <template v-if="operData.operateType == 9">
          <el-form-item label="量程：" prop="operateValue">
            <el-input type="text" v-model.trim="operData.operateValue"></el-input>
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
                ],
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
                else if (this.operData.operateType == 9) {
                    rules.operateValue = [
                        {required: true, message: '请输入量程'},
                        {type: 'number', message: '范围0~330', min: 0, max: 330}
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
                        fn = Service.controlSearchHeartPeriod;
                        break;
                    case 11:
                        fn = Service.controlSearchAlarmPeriod;
                        break;
                    case 12:
                        fn = Service.controlSearchAlarmValue;
                        break;
                    case 13:
                        fn = Service.controlSearchRelieveAlarmValue;
                        break;
                    case 14:
                        fn = Service.controlSearchAlarmEnabled;
                        break;
                    case 15:
                        fn = Service.controlSearchGatherPeriod;
                        break;
                    case 16:
                        fn = Service.controlSearchRange;
                        break;
                    case 17:
                        fn = Service.controlSearchResetData;
                        break;
                }
                return fn
            },
        },
    }
</script>
