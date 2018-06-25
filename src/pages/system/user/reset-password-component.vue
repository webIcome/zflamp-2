<template>
  <div class="oper-component" @click.stop="">
    <div class="icon-item"><span class="delete-icon" @click="showModal">重置密码</span></div>
    <el-dialog title="重置密码" :visible.sync="visible" center :width="'600px'">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p class="title">您确认要重置此账号密码吗？</p>
      <p class="title">您的密码将通过邮箱发送</p>
      <p class="text-center">请慎重操作，您的操作一旦确认，将无法恢复，并被系统记录在日志当中！</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteDevice">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import Service from '../../../services/system'
    export default {
        name: 'resetPasswordComponent',
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
                Service.resetPassword({objectid: this.id}).then(res => {
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