<template>
  <div class="form-horizontal detail">
    <div class="form-group">
      <label class="col-md-2 control-label">灯具型号：</label>
      <div class="col-md-2 form-control-static">{{device.modelnum}}</div>
      <label class="col-md-2 control-label">所属企业：</label>
      <div class="col-md-2 form-control-static">{{device.companyname}}</div>
      <label class="col-md-2 control-label">灯具类型：</label>
      <div class="col-md-2 form-control-static">{{device.lamptype | lampTypeNameConverter}}</div>
      <label class="col-md-2 control-label">灯具寿命：</label>
      <div class="col-md-2 form-control-static">{{device.lifetime}} H</div>
      <label class="col-md-2 control-label">灯具功率：</label>
      <div class="col-md-2 form-control-static">{{device.power}} W</div>
      <label class="col-md-2 control-label">灯控器类型：</label>
      <div class="col-md-2 form-control-static">{{device.lightType | lightControllerTypeNameConverter}}</div>
      <template v-if="device.lightType == 1">
        <label class="col-md-2 control-label">灯具额定电流：</label>
        <div class="col-md-2 form-control-static">{{device.lampcurrent}} A</div>
        <label class="col-md-2 control-label">灯具额定电压：</label>
        <div class="col-md-2 form-control-static">{{device.lampvol}} V</div>
        <label class="col-md-2 control-label">电源额定电流：</label>
        <div class="col-md-2 form-control-static">{{device.supplycurrent}} A</div>
        <label class="col-md-2 control-label">电源功率因素：</label>
        <div class="col-md-2 form-control-static">{{device.powerfactor}}</div>
        <label class="col-md-2 control-label">电压转化倍率：</label>
        <div class="col-md-2 form-control-static">{{device.voltageratio}}</div>
        <label class="col-md-2 control-label">电压异常比例：</label>
        <div class="col-md-2 form-control-static">{{device.volabratio}} %</div>
        <label class="col-md-2 control-label">电流转化倍率：</label>
        <div class="col-md-2 form-control-static">{{device.curratio}}</div>
        <label class="col-md-2 control-label">电流异常比例：</label>
        <div class="col-md-2 form-control-static">{{device.curabratio}} %</div>
        <label class="col-md-2 control-label">电源温度告警阈值：</label>
        <div class="col-md-2 form-control-static">{{device.tempthres}} ℃</div>
      </template>
      <template v-else>
        <label class="col-md-2 control-label"> 电容故障PFC ：</label>
        <div class="col-md-2 form-control-static">{{device.capacityFaultPfc}} W</div>
        <label class="col-md-2 control-label">电容故障PFC上限：</label>
        <div class="col-md-2 form-control-static">{{device.capacityFaultPfcMax}}</div>
        <label class="col-md-2 control-label">电容故障PFC下限：</label>
        <div class="col-md-2 form-control-static">{{device.capacityFaultPfcMin}}</div>
        <label class="col-md-2 control-label">灯具故障PFC ：</label>
        <div class="col-md-2 form-control-static">{{device.lightFaultPfc}}</div>
        <label class="col-md-2 control-label">灯具故障功率：</label>
        <div class="col-md-2 form-control-static">{{device.lightFaultPower}} W</div>
        <label class="col-md-2 control-label">电源故障电流：</label>
        <div class="col-md-2 form-control-static">{{device.powerFaultCurrents}} A</div>
        <label class="col-md-2 control-label">电源故障功率：</label>
        <div class="col-md-2 form-control-static">{{device.powerFaultPower}}W</div>
      </template>
      <label class="col-md-2 control-label">备注：</label>
      <div class="col-md-2 form-control-static">{{device.notes}}</div>
    </div>
  </div>
</template>

<script>
    import Service from '../../../services/lamps'
    export default {
        name: 'detailLamps',
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
