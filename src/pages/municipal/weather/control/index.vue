<template>
  <div class="control-items">
    <search-status-component :deviceIds="deviceIds" @initPaging="initPaging"></search-status-component>
    <search-component :deviceIds="deviceIds" @initPaging="initPaging"></search-component>
    <set-component :deviceIds="deviceIds" @initPaging="initPaging"></set-component>
  </div>
</template>

<script>
    import controlTimerMixin from '../../../../mixins/control-timer-mixin'
    import SearchStatusComponent from "./search-status-component";
    import SearchComponent from "./search-component";
    import SetComponent from "./set-component";

    export default {
        name: 'controlComponent',
        components: {SetComponent, SearchComponent, SearchStatusComponent},
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

