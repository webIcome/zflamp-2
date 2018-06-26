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
          <el-form-item label="设置告警周期/分钟：" prop="operateValue">
            <el-input type="text" v-model.trim.number="operData.operateValue"></el-input>
          </el-form-item>
        </template>
        <template v-if="operData.operateType == 4">
          <el-form-item label="设置告警使能：" prop="operateValue">
            <el-radio v-model="operData.operateValue" :label='1'>开启告警</el-radio>
            <el-radio v-model="operData.operateValue" :label='0'>关闭告警</el-radio>
          </el-form-item>
        </template>
        <template v-if="operData.operateType == 5">
          <el-form-item label="设置采集周期/s：" prop="operateValue">
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
    import Service from "../../../../services/inundate";
    import controlSetMixin from "../../control-set-mixin"
    export default {
        mixins: [controlSetMixin],
        data() {
            return {
                setItems: [
                    {value: 3, text: '设置告警周期'},
                    {value: 4, text: '设置告警使能'},
                    {value: 5, text: '设置采集周期'},
                ],
            }
        },
        computed: {
            Rules: function () {
                let rules = {};
                if (this.operData.operateType == 3) {
                    rules.operateValue = [
                        {required: true, message: '请输入告警周期'},
                        {type: 'number', message: '范围0~255', min: 0, max: 255},
                        {pattern: /^[0-9]+$/, message: '必须为正整数'}
                    ]
                } else if (this.operData.operateType == 4) {
                    rules.operateValue = [
                        {required: true, message: '请输入告警使能'},
                    ]
                } else if (this.operData.operateType == 5) {
                    rules.operateValue = [
                        {required: true, message: '请输入采集周期'},
                        {type: 'number', message: '范围0~65535', min: 0, max: 65535},
                        {pattern: /^[0-9]+$/, message: '必须为正整数'}
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
                        fn = Service.controlSetAlarmPeriod;
                        break;
                    case 4:
                        fn = Service.controlSetAlarmEnabled;
                        break;
                    case 5:
                        fn = Service.controlSetGatherPeriod;
                        break;
                    case 6:
                        fn = Service.controlSearchAlarmPeriod;
                        break;
                    case 7:
                        fn = Service.controlSearchAlarmEnabled;
                        break;
                    case 8:
                        fn = Service.controlSearchGatherPeriod;
                        break;
                }
                return fn
            },
        },
    }
</script>
