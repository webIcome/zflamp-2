<template>
  <div style="width: 100%; height: 100%">
    <div :ref="contentRef" class="fault-rate-content">
      <pie-echart-component v-if="apVisible" :data="apData" :option="apOption"></pie-echart-component>
      <pie-echart-component v-if="lightVisible" :data="lightData" :option="lightOption"></pie-echart-component>
      <pie-echart-component v-if="wellVisible" :data="wellData" :option="wellOption"></pie-echart-component>
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
                apVisible: false,
                lightVisible: false,
                wellVisible: false,
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
        mounted() {
            this.apVisible = true;
            this.wellVisible = true;
            this.lightVisible = true;
        },
        methods: {
            getTitle(title) {
                return Object.assign({},this.title,{text: title});
            },
            initData() {
                Service.getApLineRate().then(data => {
                    this.apData = [
                        {value: data, name: '在线'},
                        {value: 100 - data, name: '离线'}
                    ]
                });
                Service.getLightLineRate().then(data => {
                    this.lightData = [
                        {value: data, name: '在线'},
                        {value: 100 - data, name: '离线'}
                    ]
                });
                Service.getWellLineRate().then(data => {
                    this.apData = [
                        {value: data, name: '在线'},
                        {value: 100 - data, name: '离线'}
                    ]
                });
            }
        },
        watch: {
            apData: function (newVal) {
                this.apVisible = false;
                setTimeout(() => {
                    this.apVisible = true;
                })
            },
            lightData: function (newVal) {
                this.lightVisible = false;
                setTimeout(() => {
                    this.lightVisible = true;
                })
            },
            wellData: function (newVal) {
                this.wellVisible = false;
                setTimeout(() => {
                    this.wellVisible = true;
                })
            }
        }
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