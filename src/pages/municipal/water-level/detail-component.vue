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
      <div class="col-md-2 form-control-static">{{device.belongApId}}</div>
      <label class="col-md-2 control-label">运行状态：</label>
      <div class="col-md-2 form-control-static">{{device.belongLightId}}</div>
      <label class="col-md-2 control-label">当前水位：</label>
      <div class="col-md-2 form-control-static">{{device.address}} cm</div>
      <label class="col-md-2 control-label">告警阀值：</label>
      <div class="col-md-2 form-control-static">{{device.alarmThreshold}}</div>
      <label class="col-md-2 control-label">电压：</label>
      <div class="col-md-2 form-control-static">{{device.currentObliquity}} V</div>
      <label class="col-md-2 control-label">归属灯：</label>
      <div class="col-md-2 form-control-static">{{device.statusName}}</div>
      <label class="col-md-2 control-label">归属基站：</label>
      <div class="col-md-2 form-control-static">{{device.voltage}} V</div>
      <label class="col-md-2 control-label">上报时间：</label>
      <div class="col-md-2 form-control-static">{{device.uploadTime | formDate}}</div>
      <label class="col-md-2 control-label">地理位置：</label>
      <div class="col-md-2 form-control-static">{{device.adress}}</div>
      <label class="col-md-2 control-label">量程：</label>
      <div class="col-md-2 form-control-static">{{device.adress}} m</div>
      <label class="col-md-2 control-label">校准值：</label>
      <div class="col-md-2 form-control-static">{{device.adress}} cm</div>
      <label class="col-md-2 control-label">心跳包周期：</label>
      <div class="col-md-2 form-control-static">{{device.adress}} H</div>
      <label class="col-md-2 control-label">告警周期：</label>
      <div class="col-md-2 form-control-static">{{device.adress}} min</div>
      <label class="col-md-2 control-label">告警解除阈值：</label>
      <div class="col-md-2 form-control-static">{{device.adress}} cm</div>
      <label class="col-md-2 control-label">采集周期：</label>
      <div class="col-md-2 form-control-static">{{device.adress}} s</div>
      <label class="col-md-2 control-label">告警使能：</label>
      <div class="col-md-2 form-control-static">{{device.adress}}</div>
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
