<template>
    <div :ref="contentRef" class="fault-rate-content">
      <pie-echart-component v-if="visible" :data="data" :option="option"></pie-echart-component>
      <pie-echart-component v-if="visible" :data="data" :option="option"></pie-echart-component>
      <pie-echart-component v-if="visible" :data="data" :option="option"></pie-echart-component>
    </div>
</template>
<script>
    export default {
        name: 'centerRateComponent',
        data() {
            return {
                contentRef: 'contetn-ref',
                data: [],
                option: {},
                test: 'test',
                visible: false
            }
        },
        created() {
            this.generateHeight();
        },
        mounted() {
            this.visible = true;
        },
        methods: {
            generateHeight() {
                this.data = [
                    {value: 111, name: 'ddd'},
                    {value: 111, name: 'ss'},
                ]
                this.option = {
                    name: 'test',
                    color: ['#5282E6', '#999'],
                }
            },
        }
    }
</script>
<style lang="less" scoped>
  .fault-rate-content {
    /*align-self: flex-start;*/
    width: 100%;
    height: 45%;
    display: flex;
    justify-content: space-around;
  }
</style>