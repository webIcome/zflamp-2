<template>
  <div>
    <div class="control control-on">
      <el-button :disabled="!deviceIds.length" @click="showModal" class="control-btn">查询状态</el-button>
    </div>
    <el-dialog title="控制" :visible.sync="visible" center width="600px">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p class="title">您确认要查询状态吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
    import Service from "../../../../services/weather";
    export default {
        name: 'searchStatusComponent',
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
            controlDevice: function () {
                Service.controlSearchStatus(this.deviceIds.join(',')).then(res => {
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
