<template>
  <div :ref="contentRef" class="fault-rate-content">
    <pie-echart-component :data="apData" :option="apOption"></pie-echart-component>
    <pie-echart-component :data="lightData" :option="lightOption"></pie-echart-component>
    <pie-echart-component :data="wellData" :option="wellOption"></pie-echart-component>
  </div>
</template>
<script>
    import Service from '../../services/operation-center'
    export default {
        name: 'onlineRateComponent',
        data() {
            return {
                contentRef: 'contetn-ref',
                test: 'test',
                title: {
                    text:'',
                    left:'center',
                    top: 'center',
                    textStyle:{
                        color:'#fff',
                        fontSize:14,
                        align:'center'
                    }
                },
                apData: [
                    {value: 0, name: '在线'},
                    {value: 100, name: '离线'}
                ],
                lightData: [
                    {value: 0, name: '在线'},
                    {value: 100, name: '离线'}
                ],
                wellData: [
                    {value: 0, name: '在线'},
                    {value: 100, name: '离线'}
                ],
                apOption: {},
                lightOption: {},
                wellOption: {}
            }
        },
        created() {

        },
        mounted() {
            this.initData();
        },
        methods: {
            getTitle(title) {
                return Object.assign({},this.title,{text: title});
            },
            initData() {
                Promise.all([Service.getApLineRate(), Service.getLightLineRate(), Service.getWellLineRate()])
                    .then(([apData, lightData, wellData]) => {
                    this.apData = [
                        {value: apData, name: '在线'},
                        {value: 100 - apData, name: '离线'}
                    ];
                    this.lightData = [
                        {value: lightData, name: '在线'},
                        {value: 100 - lightData, name: '离线'}
                    ];
                    this.wellData = [
                        {value: wellData, name: '在线'},
                        {value: 100 - wellData, name: '离线'}
                    ];
                    this.initOption(apData, lightData, wellData);
                })
            },
            initOption(apData, lightData, wellData) {
                this.apOption ={
                    name: '基站',
                    color: ['#5282E6', '#999'],
                    title: this.getTitle(apData +'%\n\n基站在线率')
                };
                this.lightOption ={
                    name: '灯控器',
                    color: ['#5282E6', '#999'],
                    title: this.getTitle(lightData +'%\n\n灯控器在线率')
                };
                this.wellOption ={
                    name: '终端',
                    color: ['#5282E6', '#999'],
                    title: this.getTitle(wellData +'%\n\n终端在线率')
                }
            }
        }
    }
</script>
<style lang="less" scoped>
  .fault-rate-content {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-around;
  }
</style>