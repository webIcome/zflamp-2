<template>
  <div class="content-right">
    <div class="echart-top">
      <line-echart-component :data="data" :option="option"></line-echart-component>
      <line-echart-component :data="data" :option="option"></line-echart-component>
      <pie-echart-component :data="pieData" :option="pieOption"></pie-echart-component>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'statisticsPage',
        data() {
            return {
                data: {},
                option: {},
                pieData: {},
                pieOption: {}
            }
        },
        created() {
            this.initData();
        },
        methods: {
            initData() {
                this.data = {title: [1, 1, 2, 3], value: [10, 12, 25, 5]};
                this.option = {startColor: '#ff854A', endColor: 'rgba(255,133,74,0.29)', xName: 'yue'}
                this.pieData = [
                    {value: 111, name: 'ddd'},
                    {value: 111, name: 'aaa'},
                    {value: 111, name: 'bbb'},
                    {value: 111, name: 'ccc'},
                ]
                this.pieOption = {
                    name: 'test'
                }
            }

        }
    }
</script>
<style lang="less" scoped>
  .echart-top {
    display: flex;
    height: 500px;
  }

</style>