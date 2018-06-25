<template>
  <div>
    <div class="control control-on">
      <el-button :disabled="!deviceIds.length" @click="showModal()" class="control-btn">告警归档</el-button>
    </div>
    <el-dialog title="控制" :visible.sync="visible" center width="600px">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p class="title">您确认要归档这些设备吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="control">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
    import Service from "../../../../services/illuminance";
    export default {
        name: 'alarmResetComponent',
        components: {},
        data() {
            return {
                visible: false,
            }
        },
        props: {
            deviceIds: {
                default: function () {
                    return []
                }
            }
        },
        methods: {
            control: function () {
                Service.pigeonhole(this.deviceIds.join(',')).then(res => {
                    this.hideModal();
                    this.initPaging();
                });
            },
            showModal() {
                this.visible = true;
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
