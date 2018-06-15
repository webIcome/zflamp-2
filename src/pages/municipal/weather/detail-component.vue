<template>
  <div class="form-horizontal detail">
    <div class="form-group">
      <label class="col-md-2 control-label">设备名称：</label>
      <div class="col-md-2 form-control-static">{{device.deviceName}}</div>
      <label class="col-md-2 control-label">设备ID：</label>
      <div class="col-md-2 form-control-static">{{device.sn}}</div>
      <label class="col-md-2 control-label">设备型号：</label>
      <div class="col-md-2 form-control-static">{{device.deviceModel}}</div>
      <label class="col-md-2 control-label">运行状态：</label>
      <div class="col-md-2 form-control-static">{{device.statusName}}</div>
      <label class="col-md-2 control-label">风向：</label>
      <div class="col-md-2 form-control-static">{{device.direction}}</div>
      <label class="col-md-2 control-label">风速 m/s：</label>
      <div class="col-md-2 form-control-static">{{device.velocity}}</div>
      <label class="col-md-2 control-label">温度/℃：</label>
      <div class="col-md-2 form-control-static">{{device.temperature}}</div>
      <label class="col-md-2 control-label">湿度/%RH：</label>
      <div class="col-md-2 form-control-static">{{device.humidity}}</div>
      <label class="col-md-2 control-label">气压/hPa：</label>
      <div class="col-md-2 form-control-static">{{device.pressure}}</div>
      <label class="col-md-2 control-label">雨量/mm：</label>
      <div class="col-md-2 form-control-static">{{device.rainfall}}</div>
      <label class="col-md-2 control-label">总辐射 W/㎡：</label>
      <div class="col-md-2 form-control-static">{{device.totalRadiation}}</div>
      <label class="col-md-2 control-label">紫外强度/级：</label>
      <div class="col-md-2 form-control-static">{{device.ultravioletIntensity}}</div>
      <label class="col-md-2 control-label">噪声/dB：</label>
      <div class="col-md-2 form-control-static">{{device.noise}}</div>
      <label class="col-md-2 control-label">PM2.5 ug/m³：</label>
      <div class="col-md-2 form-control-static">{{device.pm25}}</div>
      <label class="col-md-2 control-label">PM10 ug/m³：</label>
      <div class="col-md-2 form-control-static">{{device.pm10}}</div>
      <label class="col-md-2 control-label">电压/V：</label>
      <div class="col-md-2 form-control-static">{{device.voltage}}</div>
      <label class="col-md-2 control-label">归属项目：</label>
      <div class="col-md-2 form-control-static">{{device.compName}}</div>
      <label class="col-md-2 control-label">归属灯：</label>
      <div class="col-md-2 form-control-static">{{device.belongLightId}}</div>
      <label class="col-md-2 control-label">归属基站：</label>
      <div class="col-md-2 form-control-static">{{device.belongApId}}</div>
      <label class="col-md-2 control-label">地理位置：</label>
      <div class="col-md-2 form-control-static">{{device.adress}}</div>
      <label class="col-md-2 control-label">上报日期：</label>
      <div class="col-md-2 form-control-static">{{device.uploadTime | formDate}}</div>
    </div>
  </div>
</template>

<script>
    import Service from '../../../services/weather'
    export default {
        name: 'detailWeather',
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
