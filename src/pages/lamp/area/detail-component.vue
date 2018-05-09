<template>
  <div class="form-horizontal detail">
    <div class="form-group">
      <label class="col-md-2 control-label">基站名称：</label>
      <div class="col-md-2 form-control-static">{{device.devicename}}</div>
      <label class="col-md-2 control-label">基站ID：</label>
      <div class="col-md-2 form-control-static">{{device.sn}}</div>
      <label class="col-md-2 control-label">运行状态：</label>
      <div class="col-md-2 form-control-static">{{device.runningstate | apStateNameConverter}}</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">企业名称：</label>
      <div class="col-md-2 form-control-static">{{device.companyname}}</div>
      <label class="col-md-2 control-label">地理位置：</label>
      <div class="col-md-2 form-control-static">{{device.position}}</div>
      <label class="col-md-2 control-label">归属组：</label>
      <div class="col-md-2 form-control-static">{{device.groupname}}</div>
    </div>
  </div>
</template>

<script>
    import Service from '../../../services/area'
    export default {
        name: 'detailArea',
        data() {
            return {
                device: {}
            }
        },
        props: {
            id: ''
        },
        methods: {
            initData() {
                this.getDetail()
            },
            getDetail() {
                Service.getDetail(this.id).then(data => {
                    this.device = data;
                })
            }
        },
        mounted(){
            this.initData();
        }
    }
</script>

<style scoped lang="less">

</style>
