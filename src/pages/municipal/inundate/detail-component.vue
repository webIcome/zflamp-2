<template>
  <div class="form-horizontal detail">
    <div class="form-group">
      <label class="col-md-2 control-label">设备名称：</label>
      <div class="col-md-2 form-control-static">{{device.deviceName}}</div>
      <label class="col-md-2 control-label">设备ID：</label>
      <div class="col-md-2 form-control-static">{{device.sn}}</div>
      <label class="col-md-2 control-label">设备型号：</label>
      <div class="col-md-2 form-control-static">{{device.sn}}</div>
      <label class="col-md-2 control-label">归属项目：</label>
      <div class="col-md-2 form-control-static">{{device.compName}}</div>
      <label class="col-md-2 control-label">归属基站：</label>
      <div class="col-md-2 form-control-static">{{device.belongApId}}</div>
      <label class="col-md-2 control-label">归属灯：</label>
      <div class="col-md-2 form-control-static">{{device.belongLightId}}</div>
      <label class="col-md-2 control-label">地理位置：</label>
      <div class="col-md-2 form-control-static">{{device.address}}</div>
      <label class="col-md-2 control-label">当前倾角：</label>
      <div class="col-md-2 form-control-static">{{device.currentObliquity}}</div>
      <label class="col-md-2 control-label">状态：</label>
      <div class="col-md-2 form-control-static">{{device.statusName}}</div>
      <label class="col-md-2 control-label">电压/V：</label>
      <div class="col-md-2 form-control-static">{{device.voltage}}</div>
      <label class="col-md-2 control-label">上报日期：</label>
      <div class="col-md-2 form-control-static">{{device.uploadTime | formDate}}</div>
      <label class="col-md-2 control-label">心跳包周期/h：</label>
      <div class="col-md-2 form-control-static">{{device.alarmThreshold}}</div>
      <label class="col-md-2 control-label">告警周期/min：</label>
      <div class="col-md-2 form-control-static">{{device.alarmThreshold}}</div>
      <label class="col-md-2 control-label">采集周期/s：</label>
      <div class="col-md-2 form-control-static">{{device.alarmThreshold}}</div>
      <label class="col-md-2 control-label">告警使能：</label>
      <div class="col-md-2 form-control-static">{{device.alarmThreshold}}</div>
    </div>
  </div>
</template>

<script>
    import Service from '../../../services/inundate'
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
