<template>
  <div class="content-right">
    <single-control-page v-if="currentPage == pages.single"></single-control-page>
    <group-control-page v-else :moduletype="moduleType.loop"></group-control-page>
  </div>
</template>
<script>
    import singleControlPage from './single-control.vue'
    import groupControlPage from '../group/index.vue'
    import CommonConstant from "../../../constants/common";
    export default {
        components: {
            singleControlPage,
            groupControlPage
        },
        name: 'lightPage',
        data() {
            return {
                pages: {
                    single: 1,
                    group: 2
                },
                currentPage: 1,
                moduleType: {}
            }
        },
        created() {
            this.initCommonData();
        },
        methods: {
            initCommonData: function () {
                CommonConstant.deviceType.forEach(item => {
                    this.moduleType[item.name] = item.value;
                })
            },
            gotoPage(page) {
                this.currentPage = this.pages[page];
            }
        }
    }
</script>