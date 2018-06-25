<template>
  <div class="control-items">
    <div class="control control-on">
      <el-button :disabled="!deviceIds.length" @click="generate(1)" class="control-btn">查询状态</el-button>
    </div>
    <div class="control control-status">
      <el-button :disabled="!deviceIds.length" @click="generate(2)" class="control-btn">告警归档</el-button>
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
      <p v-else-if="operData.operateType == 2" class="title">您确认要归档这些设备吗？</p>
      <p v-else-if="operData.operateType == 6" class="title">您确认要查询告警周期吗？</p>
      <p v-else-if="operData.operateType == 7" class="title">您确认要查询告警使能吗？</p>
      <p v-else-if="operData.operateType == 8" class="title">您确认要查询采集周期吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="控制" :visible.sync="setVisible" center width="400px">
      <el-form label-width="100px" :model="operData" ref="well-form" :rules="Rules" class="el-form-default" :validate-on-rule-change="false">
        <template v-if="operData.operateType == 3">
          <el-form-item label="设置告警周期：" prop="operateValue">
            <el-input type="text" v-model.trim="operData.operateValue"></el-input>
          </el-form-item>
        </template>
        <template v-if="operData.operateType == 4">
          <el-form-item label="设置告警使能：" prop="operateValue">
            <el-input type="text" v-model.trim="operData.operateValue"></el-input>
          </el-form-item>
        </template>
        <template v-if="operData.operateType == 5">
          <el-form-item label="设置采集周期：" prop="operateValue">
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
    import Service from "../../../services/inundate";
    import CommonContent from "../../../constants/common";
    import controlTimerMixin from '../../../mixins/control-timer-mixin'
    export default {
        name: 'controlInundateComponent',
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
                setItems: [
                    {value: 3, text: '设置告警周期'},
                    {value: 4, text: '设置告警使能'},
                    {value: 5, text: '设置采集周期'},
                ],
                searchItems: [
                    {value: 6, text: '告警周期'},
                    {value: 7, text: '告警使能'},
                    {value: 8, text: '采集周期'},
                ],
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
                if (this.operData.operateType == 3) {
                    rules.operateValue = [
                        {required: true, message: '请输入告警周期'},
                        {type: 'number', message: '范围0~330', min: 0, max: 330}
                    ]
                } else if (this.operData.operateType == 4) {
                    rules.operateValue = [
                        {required: true, message: '请输入告警使能'},
                        {type: 'number', message: '范围0~330', min: 0, max: 330}
                    ]
                } else if (this.operData.operateType == 5) {
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
