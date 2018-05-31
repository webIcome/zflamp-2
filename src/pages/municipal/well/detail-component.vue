<template>
  <div class="form-horizontal detail">
    <div class="form-group">
      <label class="col-md-2 control-label">设备名称：</label>
      <div class="col-md-2 form-control-static">{{device.deviceName}}</div>
      <label class="col-md-2 control-label">设备ID：</label>
      <div class="col-md-2 form-control-static">{{device.sn}}</div>
      <label class="col-md-2 control-label">归属项目：</label>
      <div class="col-md-2 form-control-static">{{device.compName}}</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">归属基站ID：</label>
      <div class="col-md-2 form-control-static">{{device.belongApId}}</div>
      <label class="col-md-2 control-label">归属灯控器ID：</label>
      <div class="col-md-2 form-control-static">{{device.belongLightId}}</div>
      <label class="col-md-2 control-label">地理位置：</label>
      <div class="col-md-2 form-control-static">{{device.address}}</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">告警阀值：</label>
      <div class="col-md-2 form-control-static">{{device.alarmThreshold}}</div>
      <label class="col-md-2 control-label">当前倾角：</label>
      <div class="col-md-2 form-control-static">{{device.currentObliquity}}</div>
      <label class="col-md-2 control-label">状态：</label>
      <div class="col-md-2 form-control-static">{{device.statusName}}</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">电压：</label>
      <div class="col-md-2 form-control-static">{{device.voltage}} V</div>
      <label class="col-md-2 control-label">上报日期：</label>
      <div class="col-md-2 form-control-static">{{device.uploadTime | formDate}}</div>
    </div>
  </div>
</template>

<script>
    import Service from '../../../services/well'
    export default {
        name: 'detailWell',
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
