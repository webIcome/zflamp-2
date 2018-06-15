<template>
  <well-component v-if="currentModuleType == moduleType.well" @updateMarker="updateMarker" @hide="hide" :moduleType="moduleType" :id="id"></well-component>
</template>
<script>
  import WellComponent from "./well-component.vue"
  export default {
      name: 'terminalPanelComponent',
      components: {
          WellComponent,
      },
      data() {
          return {

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
          updateMarker(detail) {
              this.$emit('updateMarker', detail)
          },
          hide() {
              this.$emit('hide')
          }
      }
  }
</script>