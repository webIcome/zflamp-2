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
      <p class="title">您确认要查询心跳包周期吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
    import Service from "../../../../services/weather";
    export default {
        name: 'searchComponent',
        components: {},
        data() {
            return {
                visible: false,
                operateType: '',
                searchItems: [
                    {value: 3, text: '心跳包周期'},
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
                        fn = Service.controlSetHeartPeriod;
                        break;
                    case 3:
                        fn = Service.controlSearchHeartPeriod;
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
