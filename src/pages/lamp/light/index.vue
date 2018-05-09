<template>
  <div class="content-right">
    <div class="control-btns">
      <div @click="gotoPage('single')" :class="{active: currentPage == pages.single}" class="control-single">单控</div>
      <div @click="gotoPage('group')" :class="{active: currentPage == pages.group}" class="control-group">组控</div>
      <div @click="gotoPage('area')" :class="{active: currentPage == pages.area}" class="control-area">群控</div>
    </div>
    <single-control-page v-if="currentPage == pages.single"></single-control-page>
    <group-control-page v-else-if="currentPage == pages.group" :moduletype="moduleType.light"></group-control-page>
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
                    group: 2,
                    area: 3
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
<style scoped lang="less">
  .control-btns {
    margin-bottom: 28px;
    .control-single,
    .control-group,
    .control-area {
      display: inline-block;
      margin-right: 30px;
      text-align: center;
      cursor: pointer;
      border: 1px solid #3f6ca6;
      border-radius: 4px;
      width: 94px;
      height: 42px;
      line-height: 42px;
      color: #80b5f9;
      &.active,
      &:hover {
        background: #317bd3;
        color: #fff;
      }
    }
  }
</style>