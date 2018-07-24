<template>
  <div class="terminal-class">
    <div class="device-parent" :class="{active: active}" @click="showChild"><span class="icon"></span>终端</div>
    <div class="device-child" v-show="isChildShow">
      <door-component v-if="showLimits('TERMINALDOOR')" :currentList="currentList" :isListShow="isListShow" :moduleType="moduleType" :companyid="companyid" @updateList="getDoorList" @show="showList" @hidden="hiddenList" @active="generateActive"></door-component>
      <illuminance-component v-if="showLimits('TERMINALILLUMIDETE')" :currentList="currentList" :isListShow="isListShow" :moduleType="moduleType" :companyid="companyid" @updateList="getIlluminanceList" @show="showList" @hidden="hiddenList" @active="generateActive"></illuminance-component>
      <inundate-component v-if="showLimits('TERMINALIMMERSION')" :currentList="currentList" :isListShow="isListShow" :moduleType="moduleType" :companyid="companyid" @updateList="getInundateList" @show="showList" @hidden="hiddenList" @active="generateActive"></inundate-component>
      <pose-component v-if="showLimits('TERMINALGESTURE')" :currentList="currentList" :isListShow="isListShow" :moduleType="moduleType" :companyid="companyid" @updateList="getPoseList" @show="showList" @hidden="hiddenList" @active="generateActive"></pose-component>
      <shake-component v-if="showLimits('TERMINALSHOCK')" :currentList="currentList" :isListShow="isListShow" :moduleType="moduleType" :companyid="companyid" @updateList="getShakeList" @show="showList" @hidden="hiddenList" @active="generateActive"></shake-component>
      <voice-component v-if="showLimits('TERMINALVOICE')" :currentList="currentList" :isListShow="isListShow" :moduleType="moduleType" :companyid="companyid" @updateList="getVoiceList" @show="showList" @hidden="hiddenList" @active="generateActive"></voice-component>
      <weather-component v-if="showLimits('TERMINALMETEMONITOR')" :currentList="currentList" :isListShow="isListShow" :moduleType="moduleType" :companyid="companyid" @updateList="getWeatherList" @show="showList" @hidden="hiddenList" @active="generateActive"></weather-component>
      <water-level-component v-if="showLimits('TERMINALWATERLEVEL')" :currentList="currentList" :isListShow="isListShow" :moduleType="moduleType" :companyid="companyid" @updateList="getWaterLevelList" @show="showList" @hidden="hiddenList" @active="generateActive"></water-level-component>
      <well-component v-if="showLimits('TERMINALCOVER')" :currentList="currentList" :isListShow="isListShow" :moduleType="moduleType" :companyid="companyid" @updateList="getWellList" @show="showList" @hidden="hiddenList" @active="generateActive"></well-component>
      <camera-list-component v-if="showLimits('CAMERA')" :currentList="currentList" :isListShow="isListShow" :moduleType="moduleType" @updateList="getCameraList" @show="showList" @hidden="hiddenList" @active="generateActive"></camera-list-component>
      <device-alarm-list-component v-if="isListShow" :currentList="currentList" :list="currentList" @hide="hiddenList"></device-alarm-list-component>
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
    import CameraListComponent from "./camera-component";
    export default {
        components: {
            CameraListComponent, DeviceAlarmListComponent, WellComponent, WaterLevelComponent,
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
                cameraList: [],
                isChildShow: false,
                isListShow: false,
                doorActive: false,
                illuminanceActive: false,
                inundateActive: false,
                poseActive: false,
                shakeActive: false,
                voiceActive: false,
                waterLevelActive: false,
                weatherActive: false,
                wellActive: false,
                cameraActive: false,
            }
        },
        props: {
            moduleType: {
                default: function () {
                    return {}
                }
            },
            companyid: '',
            limits: {
                default: function () {
                    return []
                }
            }
        },
        computed: {
            active: function () {
                return this.cameraActive || this.doorActive || this.illuminanceActive || this.inundateActive || this.poseActive || this.shakeActive || this.voiceActive || this.waterLevelActive || this.weatherActive || this.wellActive
            },
        },
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
            getCameraList(list) {
                this.cameraList = list
                this.updateList()
            },
            updateList() {
                this.$emit('updateList', this.getAllList())
            },
            getAllList() {
                return this.doorList.concat(this.illuminanceList, this.inundateList, this.poseList, this.shakeList, this.voiceList, this.waterLevelList, this.weatherList, this.wellList, this.cameraList)
            },
            showList(list) {
                this.currentList = list;
                this.isListShow = true;
            },
            hiddenList() {
                this.isListShow = false
            },
            generateActive(obj) {
                switch (obj.type) {
                    case this.moduleType.door:
                        this.doorActive = obj.active;
                        break;
                    case this.moduleType.illuminance:
                        this.illuminanceActive = obj.active;
                        break;
                    case this.moduleType.inundate:
                        this.inundateActive = obj.active;
                        break;
                    case this.moduleType.pose:
                        this.poseActive = obj.active;
                        break;
                    case this.moduleType.shake:
                        this.shakeActive = obj.active;
                        break;
                    case this.moduleType.voice:
                        this.voiceActive = obj.active;
                        break;
                    case this.moduleType.waterLevel:
                        this.waterLevelActive = obj.active;
                        break;
                    case this.moduleType.weather:
                        this.weatherActive = obj.active;
                        break;
                    case this.moduleType.well:
                        this.wellActive = obj.active;
                        break;
                    case this.moduleType.camera:
                        this.cameraActive = obj.active;
                        break;
                }
            },
            showLimits(type) {
                return this.limits.some(item => {
                    if (item.modulecode == 'TERMINAL') {
                        return item.children.some(device => {
                            return device.modulecode == type;
                        })
                    }
                })
            },
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
    color: #7c8196;
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
      background: url("../../../assets/map/terminal-off.png") no-repeat center;
      background-size: contain;
    }
    &.active{
      .icon {
        background: url("../../../assets/map/terminal-active.png") no-repeat center;
        background-size: contain;
      }
      color: #4689d7;
    }
  }
  .device-child {
    position: absolute;
    left: 150px;
    top: 0;
  }
</style>