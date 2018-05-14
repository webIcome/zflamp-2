<template>
  <div class="map-right">
    <search-component @search="search"></search-component>
    <ap-component v-if="apPanel" :detail="detail"></ap-component>
    <light-component v-if="lightPanel" :detail="detail" @updateDetail="updateDetail"  @hide="hide"></light-component>
    <well-component v-if="wellPanel" :detail="detail" @updateDetail="updateDetail" @hide="hide"></well-component>
    <loop-component v-if="loopPanel" :detail="detail" @updateDetail="updateDetail" @hide="hide"></loop-component>
  </div>
</template>
<script>
  import searchComponent from './search-component.vue'
  import ApComponent from "./ap-component";
  import LightComponent from "./light-component";
  import WellComponent from "./well-component";
  import LoopComponent from "./loop-component";
  export default {
      name: 'rightComponent',
      components: {
          LoopComponent, WellComponent, LightComponent, ApComponent, searchComponent,
      },
      data() {
          return{

          }
      },
      props: {
          lightPanel: false,
          loopPanel: false,
          apPanel: false,
          wellPanel: false,
          detail: {}
      },
      methods: {
          search(params) {
              this.$emit('search', params);
          },
          updateDetail(params) {
              this.$emit('updateDetail', params)
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