<template>
  <div class="form-horizontal detail">
    <div class="form-group">
      <label class="col-md-2 control-label">设备名称：</label>
      <div class="col-md-2 form-control-static">{{device.deviceName}}</div>
      <label class="col-md-2 control-label">设备ID：</label>
      <div class="col-md-2 form-control-static">{{device.sn}}</div>
      <label class="col-md-2 control-label">归属项目：</label>
      <div class="col-md-2 form-control-static">{{device.compName}}</div>
      <label class="col-md-2 control-label">设备型号：</label>
      <div class="col-md-2 form-control-static">{{device.deviceModel}}</div>
      <label class="col-md-2 control-label">运行状态：</label>
      <div class="col-md-2 form-control-static">{{device.statusName}}</div>
      <label class="col-md-2 control-label">当前水位/cm：</label>
      <div class="col-md-2 form-control-static">{{device.currentLevel}}</div>
      <label class="col-md-2 control-label">告警阀值：</label>
      <div class="col-md-2 form-control-static">{{device.alarmThreshold}}</div>
      <label class="col-md-2 control-label">电压/V：</label>
      <div class="col-md-2 form-control-static">{{device.voltage}}</div>
      <label class="col-md-2 control-label">归属灯：</label>
      <div class="col-md-2 form-control-static">{{device.belongLightId}}</div>
      <label class="col-md-2 control-label">归属基站：</label>
      <div class="col-md-2 form-control-static">{{device.belongApId}}</div>
      <label class="col-md-2 control-label">上报时间：</label>
      <div class="col-md-2 form-control-static">{{device.uploadTime | formDate}}</div>
      <label class="col-md-2 control-label">地理位置：</label>
      <div class="col-md-2 form-control-static">{{device.adress}}</div>
      <label class="col-md-2 control-label">量程/m：</label>
      <div class="col-md-2 form-control-static">{{device.range}}</div>
      <label class="col-md-2 control-label">校准值/cm：</label>
      <div class="col-md-2 form-control-static">{{device.standardValue}}</div>
      <label class="col-md-2 control-label">心跳包周期/H：</label>
      <div class="col-md-2 form-control-static">{{device.heartbeatCycle}}</div>
      <label class="col-md-2 control-label">告警周期/min：</label>
      <div class="col-md-2 form-control-static">{{device.alarmCycle}}</div>
      <label class="col-md-2 control-label">告警解除阈值/cm：</label>
      <div class="col-md-2 form-control-static">{{device.adress}}</div>
      <label class="col-md-2 control-label">采集周期/s：</label>
      <div class="col-md-2 form-control-static">{{device.collectCycle}}</div>
      <label class="col-md-2 control-label">告警使能：</label>
      <div class="col-md-2 form-control-static">{{device.alarmDuty | alarmDutyNameConverter}}</div>
    </div>
  </div>
</template>

<script>
    import Service from '../../../services/water-level'
    export default {
        name: 'detailWaterLevel',
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
