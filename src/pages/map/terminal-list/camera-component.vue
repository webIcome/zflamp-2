<template>
  <el-badge class="device-item" :hidden="true">
    <div class="device-title" :class="{active: active}" @click="getList"><span class="icon"></span>摄像头</div>
  </el-badge>
</template>
<script>
    import Service from "../../../services/camera"
    import mixin from "./mixin"
    export default {
        mixins: [mixin],
        name: 'cameraListComponent',
        data() {
            return {
                service: Service,
            }
        },
        created() {
            this.type = this.moduleType.camera
        },
        methods: {

        }
    }
</script>
<style scoped lang="less">
  .device-item{
    position: relative;
    user-select: none;
  }
  .device-title{
    position: relative;
    display: flex;
    align-items: center;
    width: 128px;
    height: 60px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
    margin-bottom: 10px;
    text-align: center;
    line-height: 60px;
    background: #fff;
    color: #7c8196;
    border-radius: 2px;
    cursor: pointer;
    &.active {
      color: #4689d7;
      .icon{
        background: url("../../../assets/map/camera-active.png") no-repeat center;
        background-size: contain;
      }
    }
    &:hover,
    &:active{
      transform: scale(1.02);
      /*!*color: #4689d7;*!
      .icon{
        !*background: url("../../../assets/map/door-active.png") no-repeat center;*!
        !*background-size: contain;*!
      }*/
    }
    .icon {
      display: inline-block;
      width: 30px;
      height: 100%;
      margin-left: 14px;
      margin-right: 7px;
      background: url("../../../assets/map/camera-off.png") no-repeat center;
      background-size: contain;
    }
  }
</style>