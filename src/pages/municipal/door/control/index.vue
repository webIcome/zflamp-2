<template>
  <div class="control-items">
    <search-status-component :deviceIds="deviceIds" @initPaging="initPaging"></search-status-component>
    <alarm-reset-component :deviceIds="deviceIds" @initPaging="initPaging"></alarm-reset-component>
    <set-component :deviceIds="deviceIds" @initPaging="initPaging"></set-component>
  </div>
</template>

<script>
    import controlTimerMixin from '../../../../mixins/control-timer-mixin'
    import SearchStatusComponent from "./search-status-component";
    import AlarmResetComponent from "./alarm-reset-component";
    import SetComponent from "./set-component";

    export default {
        name: 'controlComponent',
        components: {SetComponent, AlarmResetComponent, SearchStatusComponent},
        mixins: [controlTimerMixin],
        props: {
            deviceIds: {
                default: function () {
                    return []
                }
            }
        },
        created: function () {
        },
        methods: {

        }
    }
</script>

