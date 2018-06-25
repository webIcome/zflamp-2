<template>
    <well-component v-if="currentModuleType == moduleType.well" @updateMarker="updateMarker" @hide="hide" :moduleType="moduleType" :id="id"></well-component>
    <door-panel-component v-else-if="currentModuleType == moduleType.door" @updateMarker="updateMarker" @hide="hide" :moduleType="moduleType" :id="id"></door-panel-component>
    <illuminance-panel-component v-else-if="currentModuleType == moduleType.illuminance" @updateMarker="updateMarker" @hide="hide" :moduleType="moduleType" :id="id"></illuminance-panel-component>
    <inundate-panel-component v-else-if="currentModuleType == moduleType.inundate" @updateMarker="updateMarker" @hide="hide" :moduleType="moduleType" :id="id"></inundate-panel-component>
    <pose-panel-component v-else-if="currentModuleType == moduleType.pose" @updateMarker="updateMarker" @hide="hide" :moduleType="moduleType" :id="id"></pose-panel-component>
    <shake-panel-component v-else-if="currentModuleType == moduleType.shake" @updateMarker="updateMarker" @hide="hide" :moduleType="moduleType" :id="id"></shake-panel-component>
    <voice-panel-component v-else-if="currentModuleType == moduleType.voice" @updateMarker="updateMarker" @hide="hide" :moduleType="moduleType" :id="id"></voice-panel-component>
    <water-level-panel-component v-else-if="currentModuleType == moduleType.waterLevel" @updateMarker="updateMarker" @hide="hide" :moduleType="moduleType" :id="id"></water-level-panel-component>
    <weather-panel-component v-else-if="currentModuleType == moduleType.weather" @updateMarker="updateMarker" @hide="hide" :moduleType="moduleType" :id="id"></weather-panel-component>
</template>
<script>
  import WellComponent from "./well-component.vue"
  import DoorPanelComponent from "./door-component";
  import IlluminancePanelComponent from "./illuminance-component";
  import InundatePanelComponent from "./inundate-component";
  import PosePanelComponent from "./pose-component";
  import ShakePanelComponent from "./shake-component";
  import VoicePanelComponent from "./voice-component";
  import WaterLevelPanelComponent from "./water-level-component";
  import WeatherPanelComponent from "./weather-component";
  export default {
      name: 'terminalPanelComponent',
      components: {
          WeatherPanelComponent, WaterLevelPanelComponent, VoicePanelComponent, ShakePanelComponent,
          PosePanelComponent, InundatePanelComponent, IlluminancePanelComponent, DoorPanelComponent, WellComponent,
      },
      data() {
          return {
          }
      },
      created(){
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
          updateMarker(detail) {
              this.$emit('updateMarker', detail)
          },
          hide() {
              this.$emit('hide')
          }
      }
  }
</script>