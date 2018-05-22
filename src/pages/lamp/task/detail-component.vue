<template>
  <div class="form-horizontal detail">
    <div class="form-group">
      <label class="col-md-2 control-label">任务名称：</label>
      <div class="col-md-2 form-control-static">{{device.taskName}}</div>
      <label class="col-md-2 control-label">任务类型：</label>
      <div class="col-md-2 form-control-static">{{device.moduleType | deviceTypeNameConverter}}</div>
      <label class="col-md-2 control-label">操作命令：</label>
      <div class="col-md-2 form-control-static">{{device.taskCmd | taskCmdNameConverter}}</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">周期类型：</label>
      <div class="col-md-2 form-control-static">{{device.periodType | taskPeriodTypeNameConverter}}</div>
      <label class="col-md-2 control-label">任务执行时间：</label>
      <div class="col-md-2 form-control-static">{{device.executeHour}}点{{device.executeMinute}}分</div>
      <label class="col-md-2 control-label">亮度：</label>
      <div class="col-md-2 form-control-static">{{device.lightValue}} %</div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label">归属项目：</label>
      <div class="col-md-2 form-control-static">{{device.compName}}</div>
      <label class="col-md-2 control-label">创建日期：</label>
      <div class="col-md-2 form-control-static">{{device.createtime | formDate}}</div>
      <label class="col-md-2 control-label">修改日期：</label>
      <div class="col-md-2 form-control-static">{{device.modifytime | formDate}}</div>
    </div>
  </div>
</template>

<script>
    import TaskService from '../../../services/task'
    export default {
        name: 'detailTask',
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
                TaskService.getDetail(this.id).then(data => {
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
