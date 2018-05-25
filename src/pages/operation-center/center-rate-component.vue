<template>
  <div style="width: 100%; height: 100%">
    <div :ref="contentRef" class="fault-rate-content">
      <pie-echart-component :data="apData" :option="apOption"></pie-echart-component>
      <pie-echart-component :data="lightData" :option="lightOption"></pie-echart-component>
      <pie-echart-component :data="wellData" :option="wellOption"></pie-echart-component>
    </div>
    <map-component></map-component>
  </div>
</template>
<script>
    import MapComponent from "./map-component";
    import Service from "../../services/operation-center";
    export default {
        components: {MapComponent},
        name: 'onlineRateComponent',
        data() {
            return {
                contentRef: 'contetn-ref',
                test: 'test',
                visible: true,
                title: {
                    text:'',
                    left:'center',
                    top: 'center',
                    textStyle:{
                        color:'#fff',
                        fontSize:14,
                        align:'center'
                    },
                }
            }
        },
        props: {
            apData: {
                default: function () {
                    return []
                }
            },
            lightData: {
                default: function () {
                    return []
                }
            },
            wellData: {
                default: function () {
                    return []
                }
            },
        },
        computed: {
            apOption: function () {
                let option ={
                    name: '基站',
                    color: ['#5282E6', '#999'],
                    title: this.getTitle(this.apData[0].value +'%\n\n基站在线率')
                };
                return option;
            },
            lightOption: function () {
                let option ={
                    name: '灯控器',
                    color: ['#5282E6', '#999'],
                    title: this.getTitle(this.lightData[0].value +'%\n\n灯控器在线率')
                };
                return option;
            },
            wellOption: function () {
                let option ={
                    name: '终端',
                    color: ['#5282E6', '#999'],
                    title: this.getTitle(this.wellData[0].value +'%\n\n终端在线率')
                };
                return option;
            },
        },
        created() {
        },
        methods: {
            getTitle(title) {
                return Object.assign({},this.title,{text: title});
            },
        },
    }
</script>
<style lang="less" scoped>
  .fault-rate-content {
    width: 100%;
    height: 45%;
    display: flex;
    justify-content: space-around;
  }
</style>