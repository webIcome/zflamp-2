<template>
  <div class="icon-item" @click.stop="">
    <span @click="showModal" class="delete-icon">删除</span>
    <el-dialog title="删除任务" :visible.sync="visible" center :width="'600px'">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p class="title">您确认要删除此振动检测吗？</p>
      <p class="text-center">请慎重操作，您的操作一旦确认，将无法恢复，并被系统记录在日志当中！</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteDevice">确认删除</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import Service from '../../../services/shake'
    export default {
        name: 'deleteShakeComponent',
        data() {
            return {
                visible: false
            }
        },
        props: {
            id: {
                default: ''
            }
        },
        methods: {
            deleteDevice() {
                Service.deleteDevice(this.id).then(res => {
                    this.hideModal();
                    this.$emit('initCurrentPaging')
                })
            },
            showModal() {
                this.visible = true;
            },
            hideModal() {
                this.visible = false;
            }
        }
    }
</script>