<template>
    <div class="form-horizontal detail">
      <div class="form-group">
        <label class="col-md-2 control-label">设备名称：</label>
        <div class="col-md-2 form-control-static">{{device.devicename}}</div>
        <label class="col-md-2 control-label">设备ID：</label>
        <div class="col-md-2 form-control-static">{{device.sn}}</div>
        <label class="col-md-2 control-label">归属厂商：</label>
        <div class="col-md-2 form-control-static">{{device.vendor | vendorNameConverter}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-2 control-label">归属AP：</label>
        <div class="col-md-2 form-control-static">{{device.apuid}}</div>
        <label class="col-md-2 control-label">归属组：</label>
        <div class="col-md-2 form-control-static">{{device.groupname}}</div>
        <label class="col-md-2 control-label">回路数：</label>
        <div class="col-md-2 form-control-static">{{device.loopnum}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-2 control-label">归属项目：</label>
        <div class="col-md-2 form-control-static">{{device.companyname}}</div>
        <label class="col-md-2 control-label">地理位置：</label>
        <div class="col-md-2 form-control-static">{{device.position}}</div>
        <label class="col-md-2 control-label">已开线路：</label>
        <div class="col-md-2 form-control-static">{{transformLoopStatus(device.loopcontrol)}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-2 control-label">DI口状态：</label>
        <div class="col-md-2 form-control-static">{{device.diportstate | switchStateNameConverter}}</div>
        <label class="col-md-2 control-label">心跳包周期：</label>
        <div class="col-md-2 form-control-static">{{device.heartbeattime}} 分钟</div>
        <label class="col-md-2 control-label">电流：</label>
        <div class="col-md-2 form-control-static">{{device.current}} mA</div>
      </div>
      <div class="form-group">
        <label class="col-md-2 control-label">三相电压：</label>
        <div class="col-md-2 form-control-static">{{device.threevoltage}}</div>
        <label class="col-md-2 control-label">三相电流：</label>
        <div class="col-md-2 form-control-static">{{device.threecurrent}}</div>
        <label class="col-md-2 control-label">有功电能累加：</label>
        <div class="col-md-2 form-control-static">{{device.sumactivepower}} W·h</div>
      </div>
      <div class="form-group">
        <label class="col-md-2 control-label">无功电能累加：</label>
        <div class="col-md-2 form-control-static">{{device.sumreactivepower}} W·h</div>
        <label class="col-md-2 control-label">定时任务：</label>
        <div class="col-md-2 form-control-static">{{device.timedtask}}</div>
        <label class="col-md-2 control-label">定时任务个数：</label>
        <div class="col-md-2 form-control-static">{{device.timedtasktotal}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-2 control-label">上报时间：</label>
        <div class="col-md-2 form-control-static">{{device.uptime | formDate}}</div>
      </div>
    </div>
</template>

<script>
    import LoopService from '../../../services/loop'
    export default {
        name: 'detailLoop',
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
                LoopService.getDetail(this.id).then(data => {
                    this.device = data;
                })
            },
            transformLoopStatus(status) {
                if(!status) {
                    return '无'
                } else {
                    return status.split('.').map(item => {
                        return item + '线路';
                    }).join()
                }
            },
        },
        mounted(){
            this.initData();
        }
    }
</script>

<style scoped lang="less">

</style>
