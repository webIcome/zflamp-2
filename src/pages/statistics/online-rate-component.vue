<template>
  <div :ref="contentRef" class="fault-rate-content">
    <pie-echart-component v-if="visible" :data="apUseData" :option="apOption"></pie-echart-component>
    <pie-echart-component v-if="visible" :data="lightUseData" :option="lightOption"></pie-echart-component>
    <pie-echart-component v-if="visible" :data="wellUseData" :option="wellOption"></pie-echart-component>
  </div>
</template>
<script>
    export default {
        name: 'onlineRateComponent',
        data() {
            return {
                contentRef: 'contetn-ref',
                test: 'test',
                visible: false,
                title: {
                    text:'',
                    left:'center',
                    top:'45%',
                    textStyle:{
                        color:'#fff',
                        fontSize:20,
                        align:'center'
                    }
                }
            }
        },
        props: {
            apData: {
                default: function () {
                    return [
                        {value: 111, name: 'ddd'},
                        {value: 111, name: 'ss'},
                    ]
                }
            },
            lightData: {
                default: function () {
                    return [
                        {value: 111, name: 'ddd'},
                        {value: 111, name: 'ss'},
                    ]
                }
            },
            wellData: {
                default: function () {
                    return [
                        {value: 111, name: 'ddd'},
                        {value: 111, name: 'ss'},
                    ]
                }
            },
        },
        computed: {
            apUseData: function () {
                return this.apData;
            },
            lightUseData: function () {
                return this.lightData;
            },
            wellUseData: function () {
                return this.wellData;
            },
            apOption: function () {
                let option ={
                    name: 'test',
                    color: ['#5282E6', '#999'],
                    title: this.getTitle('a\n\n基站在线率')
                };
                return option;
            },
            lightOption: function () {
                let option ={
                    name: 'test',
                    color: ['#5282E6', '#999'],
                    title: this.getTitle('灯控器在线率')
                };
                return option;
            },
            wellOption: function () {
                let option ={
                    name: 'test',
                    color: ['#5282E6', '#999'],
                    title: this.getTitle('终端在线率')
                };
                return option;
            },
        },
        created() {
        },
        mounted() {
            this.visible = true;
        },
        methods: {
            getTitle(title) {
                this.title.text = title;
                return this.title;
            }
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