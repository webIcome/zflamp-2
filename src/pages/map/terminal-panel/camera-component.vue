<template>
  <div class="control-panel">
    <div class="panel-title"><span class="title">摄像头名称：{{detail.deviceName}}</span></div>
    <div class="panel-table">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th>设备用户名</th>
          <th>服务器IP</th>
          <th>服务器端口</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{detail.deviceUser}}</td>
          <td>{{detail.serviceIp}}</td>
          <td>{{detail.servicePort}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="panel-bottom">
      <control-component :devices="[detail]"></control-component>
    </div>
  </div>

</template>
<script>
    import Service from "../../../services/camera";
    import ControlComponent from "../../municipal/camera/control-component.vue"
    export default{
        components: {
            ControlComponent
        },
        name: 'cameraPanelComponent',
        data() {
            return {
                detail: {}
            }
        },
        props: {
            id: '',
        },
        computed: {

        },
        created() {
            this.getDetail();
        },
        methods: {
            getDetail() {
                Service.getDetail(this.id).then(detail => {
                    this.detail = detail;
                });
            },
        },
        watch: {
            id: function (newVal) {
                this.getDetail();
            }
        }
    }
</script>
<style src="./style.less" lang="less" scoped></style>