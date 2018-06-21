<template>
  <div class="control-items">
    <div class="control">
      <el-button :disabled="!deviceIds.length" @click="generate(1)" class="control-btn">查询状态</el-button>
    </div>
    <div class="control">
      <el-button :disabled="!deviceIds.length" @click="generate(2)" class="control-btn">设置静态值</el-button>
    </div>
    <div class="control">
      <el-button :disabled="!deviceIds.length" @click="generate(3)" class="control-btn">设置上报心跳周期</el-button>
    </div>

    <el-dialog title="确定操作" :visible.sync="visible" center width="600px">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p v-if="operData.operateType == 1" class="title">您确认要查询状态吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="控制井盖" :visible.sync="setVisible" center width="600px">
      <el-form label-width="100px" :model="operData" ref="well-form" :rules="Rules" class="el-form-default" :validate-on-rule-change="false">
        <template v-if="operData.operateType == 2">
          <el-form-item label="设置静态值/0.001g：" prop="operateValue">
            <el-input type="text" v-model.trim.number="operData.operateValue"></el-input>
          </el-form-item>
        </template>
        <template v-else-if="operData.operateType == 3">
          <el-form-item label="设置心跳周期/分钟：" prop="operateValue">
            <el-input type="text" v-model.trim.number="operData.operateValue"></el-input>
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
    import Service from "../../../services/shake";
    import CommonContent from "../../../constants/common";
    import controlTimerMixin from '../../../mixins/control-timer-mixin'
    export default {
        name: 'controlShakeComponent',
        components: {},
        mixins: [controlTimerMixin],
        data() {
            return {
                visible: false,
                setVisible: false,
                operData: {},
            }
        },
        props: {
            deviceIds: {
                default: function () {
                    return []
                }
            }
        },
        computed: {
            Rules: function () {
                let rules = {};
                if (this.operData.operateType == 2) {
                    rules.operateValue = [
                        {required: true, message: '请输入静态值'},
                        {type: 'number', message: '范围0~330', min: 0, max: 330}
                    ]
                } else if (this.operData.operateType == 3) {
                    rules.operateValue = [
                        {required: true, message: '请输入上报心跳周期'},
                        {type: 'number', message: '范围0~65536', min: 0, max: 65536},
                        {pattern: /^[0-9]+$/, message: '必须为正整数'}
                    ]
                }
            }
        },
        created: function () {
            this.initData()
        },
        methods: {
            initData: function () {

            },
            generate(operateType) {
                if (operateType) this.operData.operateType = operateType;
                if (operateType != 1) {
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
                        fn = Service.controlSetValue;
                        break;
                    case 3:
                        fn = Service.controlSetHeartPeriod;
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