<template>
  <div class="control-items">
    <div class="control control-on">
      <el-button :disabled="!deviceIds.length" @click="generate(1)" class="control-btn">查询状态</el-button>
    </div>
    <div class="control control-off">
      <el-button :disabled="!deviceIds.length" @click="generate(3)" class="control-btn">设置告警角度</el-button>
    </div>
    <div class="control control-status">
      <el-button :disabled="!deviceIds.length" @click="generate(4)" class="control-btn">校准角度</el-button>
    </div>
    <div class="control control-status">
      <el-button :disabled="!deviceIds.length" @click="generate(2)" class="control-btn">告警归档</el-button>
    </div>

    <el-dialog title="确定操作" :visible.sync="visible" center width="600px">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p v-if="operData.operateType == 1" class="title">您确认要查询状态吗？</p>
      <p v-else-if="operData.operateType == 3" class="title">您确认要校准角度吗？</p>
      <p v-else-if="operData.operateType == 4" class="title">您确认要归档这些设备吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="控制井盖" :visible.sync="setVisible" center width="400px">
      <el-form label-width="100px" :model="operData" ref="well-form" :rules="Rules" class="el-form-default" :validate-on-rule-change="false">
        <el-form-item label="告警角度：" prop="operateValue" required>
          <el-input type="text" v-model.trim="operData.operateValue"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlSetDevice('well-form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
    import Service from "../../../services/well";
    import CommonContent from "../../../constants/common";
    import controlTimerMixin from '../../../mixins/control-timer-mixin'
    export default {
        name: 'controlWellComponent',
        components: {},
        mixins: [controlTimerMixin],
        data() {
            let validateAngle = (rule, value, callback) => {
               if (!value) {
                    callback(new Error('请输入告警角度'))
               } else if (!/^[0-9]+\d*$/.test(value)) {
                    callback(new Error('只能输入正整数'))
               }else if (value > 35 || value < 0) {
                    callback(new Error('范围0~35'))
               } else {
                   callback();
               }
            };
            return {
                brightness: 0,
                visible: false,
                setVisible: false,
                operData: {},
                Rules: {
                    operateValue: [
                        {validator: validateAngle, trigger:  ['blur', 'change']},
                    ]
                },
            }
        },
        props: {
            deviceIds: {
                default: function () {
                    return []
                }
            }
        },
        computed: {},
        created: function () {
            this.initData()
        },
        methods: {
            initData: function () {
            },
            generate(operateType) {
                if (operateType) this.operData.operateType = operateType;
                if (operateType == 3) {
                    this.showSetModal()
                } else {
                    this.showModal();
                }
            },
            controlDevice: function () {
                let ids = this.deviceIds.join(',');
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
                        fn = Service.controlSetThreshold;
                        break;
                    case 4:
                        fn = Service.controlAdjust;
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
<style src="../control.less" lang="less" scoped></style>
