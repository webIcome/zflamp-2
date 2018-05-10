<template>
  <div class="form-horizontal detail">
    <div class="form-group">
      <label class="col-md-2 control-label">灯具型号：</label>
      <div class="col-md-2 form-control-static">{{device.modelnum}}</div>
      <label class="col-md-2 control-label">所属企业：</label>
      <div class="col-md-2 form-control-static">{{device.companyname}}</div>
      <label class="col-md-2 control-label">灯具类型：</label>
      <div class="col-md-2 form-control-static">{{device.lamptype | lampTypeNameConverter}}</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">灯具寿命：</label>
      <div class="col-md-2 form-control-static">{{device.lifetime}} H</div>
      <label class="col-md-2 control-label">灯具功率：</label>
      <div class="col-md-2 form-control-static">{{device.power}} W</div>
      <label class="col-md-2 control-label">灯具额定电流：</label>
      <div class="col-md-2 form-control-static">{{device.lampcurrent}} A</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">灯具额定电压：</label>
      <div class="col-md-2 form-control-static">{{device.lampvol}} V</div>
      <label class="col-md-2 control-label">电源额定电流：</label>
      <div class="col-md-2 form-control-static">{{device.supplycurrent}} A</div>
      <label class="col-md-2 control-label">电源功率因素：</label>
      <div class="col-md-2 form-control-static">{{device.powerfactor}}</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">电压转化倍率：</label>
      <div class="col-md-2 form-control-static">{{device.voltageratio}}</div>
      <label class="col-md-2 control-label">电压异常比例：</label>
      <div class="col-md-2 form-control-static">{{device.volabratio}}</div>
      <label class="col-md-2 control-label">电流转化倍率：</label>
      <div class="col-md-2 form-control-static">{{device.curratio}}</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">电流异常比例：</label>
      <div class="col-md-2 form-control-static">{{device.curabratio}}</div>
      <label class="col-md-2 control-label">电源温度告警阈值：</label>
      <div class="col-md-2 form-control-static">{{device.tempthres}} ℃</div>
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
