<template>
  <div class="map-right">
    <search-component @search="search" :moduleType="moduleType"></search-component>
    <ap-component v-if="currentModuleType == moduleType.station" @updateMarker="updateMarker" :moduleType="moduleType" :id="id"></ap-component>
    <light-component v-else-if="currentModuleType == moduleType.light" @updateMarker="updateMarker"  @hide="hide" :moduleType="moduleType" :id="id"></light-component>
    <loop-component v-else-if="currentModuleType == moduleType.loop" @updateMarker="updateMarker" @hide="hide" :moduleType="moduleType" :id="id"></loop-component>
    <terminal-panel-component v-else @updateMarker="updateMarker" @hide="hide" :moduleType="moduleType" :id="id" :currentModuleType="currentModuleType"></terminal-panel-component>
  </div>
</template>
<script>
  import searchComponent from './search-component.vue'
  import ApComponent from "./ap-component";
  import LightComponent from "./light-component";
  import LoopComponent from "./loop-component";
  import TerminalPanelComponent from "./terminal-panel/index";
  export default {
      name: 'rightComponent',
      components: {
          TerminalPanelComponent, LoopComponent, LightComponent, ApComponent, searchComponent,
      },
      data() {
          return{

          }
      },
      props: {
          currentModuleType: '',
          moduleType: {
              default: function () {
                  return {}
              }
          },
          id: ''
      },
      methods: {
          search(params) {
              this.$emit('search', params);
          },
          updateMarker(detail) {
              this.$emit('updateMarker', detail)
          },
          hide() {
              this.$emit('hide')
          }
      }
  }
</script>
<style lang="less" scoped>
 .map-right {
   position: absolute;
   right: 30px;
   top: 48px;
   text-align: right;
   .control-panel {
     margin-top: 10px;
     background: #fff;
     text-align: left;
     border-radius: 4px;
     box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
     padding: 17px 15px;
   }
 }
</style>
<style lang="less">
  .map-right {
    width: 300px;
    .control-panel {
      .control-panel-title {
        font-size: 16px;
        color: #333;
      }
      .control-panel-time {
        display: inline-block;
        font-size: 12px;
        color: #333;
        margin-right: 10px;
      }
      .control-panel-refresh {
        display: inline-block;
        font-size: 12px;
        color: #7ece26;
        cursor: pointer;
      }
      .control-panel-status {
        display: inline-block;
        font-size: 12px;
        color: #4689d7;
      }
      .control-panel-control {
        display: inline-block;
        cursor: pointer;
        font-size: 12px;
        color: #4689d7;
      }
      .control-panel-danger {
        display: inline-block;
        cursor: pointer;
        font-size: 12px;
        color: #F95555;
      }
    }
  }
</style>
<style src="./style.less" lang="less" scoped></style>