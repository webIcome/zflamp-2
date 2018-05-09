<template>
  <div class="form-horizontal detail">
    <div class="form-group">
      <label class="col-md-2 control-label">设备名称：</label>
      <div class="col-md-2 form-control-static">{{device.devicename}}</div>
      <label class="col-md-2 control-label">归属厂商：</label>
      <div class="col-md-2 form-control-static">{{device.vendor | vendorNameConverter}}</div>
      <label class="col-md-2 control-label">设备ID：</label>
      <div class="col-md-2 form-control-static">{{device.sn}}</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">归属组：</label>
      <div class="col-md-2 form-control-static">{{device.groupname}}</div>
      <label class="col-md-2 control-label">设备类型：</label>
      <div class="col-md-2 form-control-static">{{device.lightControllerType | lightControllerTypeNameConverter}}</div>
      <label class="col-md-2 control-label">归属AP：</label>
      <div class="col-md-2 form-control-static">{{device.apuid}}</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">归属回路控制器：</label>
      <div class="col-md-2 form-control-static"><template v-if="device.loopcontrollersn">{{device.loopcontrollersn}}-{{device.toloopnum}}</template></div>
      <label class="col-md-2 control-label">温度：</label>
      <div class="col-md-2 form-control-static">{{device.temp}} ℃</div>
      <label class="col-md-2 control-label">传感器类型：</label>
      <div class="col-md-2 form-control-static">{{device.sensortype | sensortypeNameConverter}}</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">亮度值：</label>
      <div class="col-md-2 form-control-static">{{device.brightness == 255 ? '控制异常' : device.brightness + '%'}}</div>
      <label class="col-md-2 control-label">亮灯时长：</label>
      <div class="col-md-2 form-control-static">{{device.sumlighttime || 0}} 分钟</div>
      <label class="col-md-2 control-label">开关状态：</label>
      <div class="col-md-2 form-control-static">{{device.switchstate | switchStateNameConverter}}</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">电压：</label>
      <div class="col-md-2 form-control-static">{{device.voltage}} V</div>
      <label class="col-md-2 control-label">电流：</label>
      <div class="col-md-2 form-control-static">{{device.current}} A</div>
      <label class="col-md-2 control-label">电能累计：</label>
      <div class="col-md-2 form-control-static">{{device.sumpower}} KW·h</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">传感器使能：</label>
      <div class="col-md-2 form-control-static">{{device.enablesensor | enableSensorNameConverter}}</div>
      <label class="col-md-2 control-label">电源额定电流：</label>
      <div class="col-md-2 form-control-static">{{device.supplycurrent}} A</div>
      <label class="col-md-2 control-label">电参数上报周期：</label>
      <div class="col-md-2 form-control-static">{{device.elecuploadperiod}} 小时</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">灯具额定电流：</label>
      <div class="col-md-2 form-control-static">{{device.lampcurrent}} A</div>
      <label class="col-md-2 control-label">灯具额定电压：</label>
      <div class="col-md-2 form-control-static">{{device.lampvol}} V</div>
      <label class="col-md-2 control-label">运行状态：</label>
      <div class="col-md-2 form-control-static">{{device.runningstate}}</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">电源功率因素：</label>
      <div class="col-md-2 form-control-static">{{device.powerfactor}}</div>
      <label class="col-md-2 control-label">电压转化倍率：</label>
      <div class="col-md-2 form-control-static">{{device.voltageratio}}</div>
      <label class="col-md-2 control-label">电压异常比例：</label>
      <div class="col-md-2 form-control-static">{{device.volabratio}} %</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">电流异常比例：</label>
      <div class="col-md-2 form-control-static">{{device.curabratio}} %</div>
      <label class="col-md-2 control-label">温度告警阈值：</label>
      <div class="col-md-2 form-control-static">{{device.tempthres}} ℃</div>
      <label class="col-md-2 control-label">电流转化倍率：</label>
      <div class="col-md-2 form-control-static">{{device.curratio}}</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">感应保持时间：</label>
      <div class="col-md-2 form-control-static">{{device.inducedkeeptime}} 秒</div>
      <label class="col-md-2 control-label">有感应亮度：</label>
      <div class="col-md-2 form-control-static">{{device.inducedbrightness}} %</div>
      <label class="col-md-2 control-label">地理位置：</label>
      <div class="col-md-2 form-control-static">{{device.position}}</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">无感应亮度：</label>
      <div class="col-md-2 form-control-static">{{device.noinducedbrightness}} %</div>
      <label class="col-md-2 control-label">上报时间：</label>
      <div class="col-md-2 form-control-static">{{device.uptime | formDate}}</div>
      <label class="col-md-2 control-label">归属企业：</label>
      <div class="col-md-2 form-control-static">{{device.companyname}}</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">灯具类型名：</label>
      <div class="col-md-2 form-control-static">{{device.lampType}}</div>
      <label class="col-md-2 control-label">定时任务：</label>
      <div class="col-md-2 form-control-static">{{device.timedtask}}</div>
      <label class="col-md-2 control-label">定时任务个数：</label>
      <div class="col-md-2 form-control-static">{{device.timedtasktotal}}</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">欠压检测开启标志：</label>
      <div class="col-md-2 form-control-static">{{device.undervoltage | switchStateNameConverter}}</div>
      <label class="col-md-2 control-label">过流检测开启标志：</label>
      <div class="col-md-2 form-control-static">{{device.overcurrent | switchStateNameConverter}}</div>
      <label class="col-md-2 control-label">电源功率故障检测开启标志：</label>
      <div class="col-md-2 form-control-static">{{device.powerfactorfault | switchStateNameConverter}}</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">欠流检测开启标志：</label>
      <div class="col-md-2 form-control-static">{{device.undercurrent | switchStateNameConverter}}</div>
      <label class="col-md-2 control-label">温度异常检测开启标志：</label>
      <div class="col-md-2 form-control-static">{{device.tempfault | switchStateNameConverter}}</div>
      <label class="col-md-2 control-label">过压检测开启标志：</label>
      <div class="col-md-2 form-control-static">{{device.overvoltage | switchStateNameConverter}}</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">灯具故障检测开启标志：</label>
      <div class="col-md-2 form-control-static">{{device.lampfault | switchStateNameConverter}}</div>
      <label class="col-md-2 control-label">电源故障检测开启标志：</label>
      <div class="col-md-2 form-control-static">{{device.supplyfault | switchStateNameConverter}}</div>
    </div>
  </div>
</template>

<script>
    import LightService from '../../../services/light'
    export default {
        name: 'detailLight',
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
                LightService.getDetail(this.id).then(data => {
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
