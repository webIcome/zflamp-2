<template>
  <div class="terminal-class">
    <div class="device-parent" @click="showChild"><span class="icon"></span>终端</div>
    <div class="device-child" v-show="isChildShow">
      <door-component :currentList="currentList" :isListShow="isListShow" :moduleType="moduleType" :companyid="companyid" @updateList="getDoorList" @show="showList" @hidden="hiddenList"></door-component>
      <illuminance-component :currentList="currentList" :isListShow="isListShow" :moduleType="moduleType" :companyid="companyid" @updateList="getIlluminanceList" @show="showList" @hidden="hiddenList"></illuminance-component>
      <inundate-component :currentList="currentList" :isListShow="isListShow" :moduleType="moduleType" :companyid="companyid" @updateList="getInundateList" @show="showList" @hidden="hiddenList"></inundate-component>
      <pose-component :currentList="currentList" :isListShow="isListShow" :moduleType="moduleType" :companyid="companyid" @updateList="getPoseList" @show="showList" @hidden="hiddenList"></pose-component>
      <shake-component :currentList="currentList" :isListShow="isListShow" :moduleType="moduleType" :companyid="companyid" @updateList="getShakeList" @show="showList" @hidden="hiddenList"></shake-component>
      <voice-component :currentList="currentList" :isListShow="isListShow" :moduleType="moduleType" :companyid="companyid" @updateList="getVoiceList" @show="showList" @hidden="hiddenList"></voice-component>
      <weather-component :currentList="currentList" :isListShow="isListShow" :moduleType="moduleType" :companyid="companyid" @updateList="getWeatherList" @show="showList" @hidden="hiddenList"></weather-component>
      <water-level-component :currentList="currentList" :isListShow="isListShow" :moduleType="moduleType" :companyid="companyid" @updateList="getWaterLevelList" @show="showList" @hidden="hiddenList"></water-level-component>
      <well-component :currentList="currentList" :isListShow="isListShow" :moduleType="moduleType" :companyid="companyid" @updateList="getWellList" @show="showList" @hidden="hiddenList"></well-component>
      <device-alarm-list-component v-if="isListShow" :currentList="currentList" :list="currentList" :isShow="isListShow" @hide="hiddenList"></device-alarm-list-component>
    </div>
  </div>
</template>
<script>
    import DoorComponent from "./door-component";
    import IlluminanceComponent from "./illuminance-component";
    import InundateComponent from "./inundate-component";
    import PoseComponent from "./pose-component";
    import ShakeComponent from "./shake-component";
    import VoiceComponent from "./voice-component";
    import WeatherComponent from "./weather-component";
    import WaterLevelComponent from "./water-level-component";
    import WellComponent from "./well-component";
    import DeviceAlarmListComponent from "../device-alarm-list-component";
    export default {
        components: {
            DeviceAlarmListComponent, WellComponent, WaterLevelComponent,
            WeatherComponent, VoiceComponent,
            ShakeComponent, PoseComponent,
            InundateComponent, IlluminanceComponent,
            DoorComponent},
        name: 'terminalComponent',
        data() {
            return {
                doorList: [],
                illuminanceList: [],
                inundateList: [],
                poseList: [],
                shakeList: [],
                voiceList: [],
                waterLevelList: [],
                weatherList: [],
                wellList: [],
                currentList: [],
                isChildShow: false,
                isListShow: false,
            }
        },
        props: {
            moduleType: {
                default: function () {
                    return {}
                }
            },
            companyid: '',
        },
        computed: {},
        created() {
        },
        methods: {
            showChild() {
                this.isChildShow = !this.isChildShow;
                this.hiddenList();
                this.$emit('hide')
            },
            getDoorList(list) {
                this.doorList = list
                this.updateList()
            },
            getIlluminanceList(list) {
                this.illuminanceList = list
                this.updateList()
            },
            getInundateList(list) {
                this.inundateList = list
                this.updateList()
            },
            getPoseList(list) {
                this.poseList = list
                this.updateList()
            },
            getShakeList(list) {
                this.shakeList = list
                this.updateList()
            },
            getVoiceList(list) {
                this.voiceList = list
                this.updateList()
            },
            getWaterLevelList(list) {
                this.waterLevelList = list
                this.updateList()
            },
            getWeatherList(list) {
                this.weatherList = list
                this.updateList()
            },
            getWellList(list) {
                this.wellList = list
                this.updateList()
            },
            updateList() {
                this.$emit('updateList', this.getAllList())
            },
            getAllList() {
                return this.doorList.concat(this.illuminanceList, this.inundateList, this.poseList, this.shakeList, this.voiceList, this.waterLevelList, this.weatherList, this.wellList)
            },
            showList(list) {
                this.currentList = list;
                this.isListShow = true;
            },
            hiddenList() {
                this.isListShow = false
            }
        },
    }
</script>
<style scoped lang="less">
  .device-parent {
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
    color: #4689d7;
    border-radius: 2px;
    cursor: pointer;
    &:hover{
      transform: scale(1.02);
    }
    .icon {
      display: inline-block;
      width: 30px;
      height: 100%;
      margin-left: 14px;
      margin-right: 7px;
      background: url("../../../assets/map/ap-avtive.png") no-repeat center;
      background-size: contain;
    }
  }
  .device-child {
    position: absolute;
    left: 150px;
    top: 0;
  }
</style>