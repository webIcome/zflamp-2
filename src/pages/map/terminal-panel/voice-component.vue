<template>
  <div class="control-panel">
    <div class="panel-title"><span class="title">声音识别ID:{{detail.sn}}</span></div>
    <div class="panel-control-body">
      <div class="panel-control-item clearfix">
        <div class="panel-img">
          <img src="../../../assets/map/voice-right.png">
        </div>
      </div>
    </div>
    <div class="panel-bottom">
      <div class="control-panel-time">更新时间：{{detail.uploadTime | formDate}}</div>
      <div class="control-panel-status">{{detail.statusName}}</div>
      <div @click="controlStatus" class="control-panel-control">获取状态</div>
    </div>
  </div>
</template>
<script>
    import Service from "../../../services/voice";
    import CommonConstant from "../../../constants/common";
    import panelMixin from "./panel-mixin"
    export default{
        name: 'voicePanelComponent',
        mixins: [panelMixin],
        data() {
            return {
                service: Service
            }
        },
        computed: {
            type: function() {
                return this.moduleType.voice
            }
        },
        methods: {

        }
    }
</script>
<style src="./style.less" lang="less" scoped></style>