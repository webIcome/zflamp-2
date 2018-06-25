<template>
  <div>
    <div class="control control-search">
      <span class="control-text">查询</span>
      <el-select :disabled="!deviceIds.length" v-model='operateType' placeholder="请选择" @visible-change="showModal" clearable>
        <el-option v-for="item in searchItems"
                   :label="item.text"
                   :value="item.value"
                   :key="item.value"></el-option>
      </el-select>
    </div>
    <el-dialog title="控制" :visible.sync="visible" center width="600px">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p v-if="operateType == 10" class="title">您确认要查询心跳包周期吗？</p>
      <p v-else-if="operateType == 11" class="title">您确认要查询告警周期吗？</p>
      <p v-else-if="operateType == 12" class="title">您确认要查询告警阈值吗？</p>
      <p v-else-if="operateType == 13" class="title">您确认要解除告警阈值吗？</p>
      <p v-else-if="operateType == 14" class="title">您确认要查询告警使能吗？</p>
      <p v-else-if="operateType == 15" class="title">您确认要查询采集周期吗？</p>
      <p v-else-if="operateType == 16" class="title">您确认要查询量程吗？</p>
      <p v-else-if="operateType == 17" class="title">您确认要初始化校准吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
    import Service from "../../../../services/water-level";
    export default {
        name: 'searchComponent',
        components: {},
        data() {
            return {
                visible: false,
                operateType: '',
                searchItems: [
                    {value: 10, text: '心跳包周期'},
                    {value: 11, text: '告警周期'},
                    {value: 12, text: '告警阈值'},
                    {value: 13, text: '解除告警阈值'},
                    {value: 14, text: '告警使能'},
                    {value: 15, text: '采集周期'},
                    {value: 16, text: '量程'},
                    {value: 17, text: '初始化校准'},
                ],
            }
        },
        props: {
            deviceIds: {
                default: function () {
                    return []
                }
            },
        },
        methods: {
            controlDevice: function () {
                this.getControlFn(this.operateType)(this.deviceIds.join(',')).then(res => {
                    this.hideModal();
                    this.initPaging();
                });
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
            showModal(show) {
                if (!show && this.operateType && this.deviceIds.length) {
                    this.visible = true;
                }
            },
            hideModal: function () {
                this.visible = false;
            },
            initPaging() {
                this.$emit('initPaging')
            }
        }
    }
</script>
