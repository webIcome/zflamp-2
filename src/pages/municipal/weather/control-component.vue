<template>
  <div class="control-items">
    <div class="control">
      <el-button :disabled="!deviceIds.length" @click="generate(1)" class="control-btn">查询状态</el-button>
    </div>
    <div class="control control-set">
      <span class="control-text">设置</span>
      <el-select :disabled="!deviceIds.length" v-model='operData.operateType' placeholder="请选择" @visible-change="showSetModal" clearable>
        <el-option v-for="item in setItems"
                   :label="item.text"
                   :value="item.value"
                   :key="item.value"></el-option>
      </el-select>
    </div>
    <div class="control control-search">
      <span class="control-text">查询</span>
      <el-select :disabled="!deviceIds.length" v-model='operData.operateType' placeholder="请选择" @visible-change="showModal" clearable>
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
      <p v-else-if="operData.operateType == 3" class="title">您确认要查询心跳包周期吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="控制" :visible.sync="setVisible" center width="600px">
      <el-form label-width="100px" :model="operData" ref="well-form" :rules="Rules" class="el-form-default"
               :validate-on-rule-change="false">
        <el-form-item label="设置心跳周期：" prop="operateValue">
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
    import Service from "../../../services/weather";
    import CommonContent from "../../../constants/common";
    import controlTimerMixin from '../../../mixins/control-timer-mixin'
    export default {
        name: 'controlVoiceComponent',
        components: {},
        mixins: [controlTimerMixin],
        data() {
            return {
                visible: false,
                setVisible: false,
                operData: {},
                setItems: [
                    {value: 2, text: '心跳包周期'},
                ],
                searchItems: [
                    {value: 3, text: '心跳包周期'},
                ],
                Rules: {
                    operateValue: [
                        {required: true, message: '请输入心跳周期'},
                        {type: 'number', message: '范围0~330', min: 0, max: 330}
                    ]
                }
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
                if (operateType == 2) {
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
                        fn = Service.controlSetHeartPeriod;
                        break;
                    case 3:
                        fn = Service.controlSearchHeartPeriod;
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