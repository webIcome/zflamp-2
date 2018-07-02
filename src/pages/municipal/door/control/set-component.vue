<template>
  <div>
    <div class="control control-set">
      <span class="control-text">设置</span>
      <el-select :disabled="!deviceIds.length" v-model='operData.operateType' placeholder="请选择"
                 @visible-change="showModal" clearable>
        <el-option v-for="item in setItems"
                   :label="item.text"
                   :value="item.value"
                   :key="item.value"></el-option>
      </el-select>
    </div>
    <el-dialog title="控制" :visible.sync="visible" center width="400px">
      <el-form label-width="140px" :model="operData" :ref="ref" :rules="Rules" class="el-form-default"
               :validate-on-rule-change="false">
        <el-form-item label="告警基数/分钟：" prop="baseValue">
          <el-input type="text" v-model.trim.number="operData.baseValue"></el-input>
        </el-form-item>
        <el-form-item label="告警倍数：" prop="multipleValue">
          <el-input type="text" v-model.trim.number="operData.multipleValue"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlSetDevice()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import Service from "../../../../services/door";
    import controlSetMixin from "../../control-set-mixin"
    export default {
        mixins: [controlSetMixin],
        data() {
            return {
                setItems: [
                    {value: 1, text: '告警阈值'},
                ],
            }
        },
        computed: {
            Rules: function () {
                let rules = {
                    baseValue: [
                        {required: true, message: '请输入一级告警基数'},
                        {type: 'number', message: '范围0~255', min: 0, max: 255},
                        {pattern: /^[0-9]+$/, message: '必须为正整数'}
                    ],
                    multipleValue: [
                        {required: true, message: '请输入二级告警倍数'},
                        {type: 'number', message: '范围0~255', min: 0, max: 255},
                        {pattern: /^[0-9]+$/, message: '必须为正整数'}
                    ]
                };
                return rules
            }
        },
        methods: {
            getControlFn(operateType) {
                let fn = '';
                switch (operateType) {
                    case 1:
                        fn = Service.controlSetAlarmValue;
                        break;
                }
                return fn
            },
        },
    }
</script>
