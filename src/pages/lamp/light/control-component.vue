<template>
  <div class="control-items">
    <div class="control control-on">
      <el-button :disabled="!ids.length" @click="generate(1)" class="control-btn">开灯</el-button>
    </div>
    <div class="control control-off">
      <el-button :disabled="!ids.length" @click="generate(2)" class="control-btn">关灯</el-button>
    </div>
    <div class="control control-brightness">
      <span>调节亮度</span>
      <el-slider :disabled="!ids.length" @change="generate(3)" v-model="brightness" :step="5"></el-slider>
    </div>
    <div class="control control-status">
      <el-button :disabled="!ids.length" @click="generate(4)" class="control-btn">获取状态<span class="control-icon"></span></el-button>
    </div>
    <template v-if="isSingle">
      <div class="control control-set">
        <span class="control-text">设置</span>
        <control-dialog-component :ids="ids" :items="setItems" :isGroup="isGroup" @initPaging="initPaging"></control-dialog-component>
      </div>
      <div class="control control-search">
        <span class="control-text">查询</span>
        <control-dialog-component :ids="ids" :items="searchItems" :isGroup="isGroup" @initPaging="initPaging"></control-dialog-component>
      </div>
    </template>

    <el-dialog title="确定操作" :visible.sync="visible" center width="600px">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p v-if="operData.controltype == 1" class="title">您确认要开灯吗？</p>
      <p v-else-if="operData.controltype == 2" class="title">您确认要关灯吗？</p>
      <p v-else-if="operData.controltype == 3" class="title">您确认要将亮度调到{{brightness}}%亮度吗？</p>
      <p v-else-if="operData.controltype == 4" class="title">您确认要获取状态吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
    import LightService from "../../../services/light";
    import GroupService from "../../../services/group"
    import CommonContent from "../../../constants/common";
    import controlDialogComponent from "./control-dialog-component.vue"
    import AreaService from "../../../services/area";
    import controlTimerMixin from '../../../mixins/control-timer-mixin'
    export default {
        name: 'controlLightComponent',
        components: {
            controlDialogComponent,
        },
        mixins: [controlTimerMixin],
        data() {
            return {
                moduleType: {},
                brightness: 0,
                visible: false,
                operData: {},
            }
        },
        props: {
            isGroup: {
                default: false
            },
            isSingle: {
                default: false
            },
            isArea: {
                default: false
            },
            ids: {
                default: []
            },
            timedtasktotal: {
                default: 0
            }
        },
        computed: {
            setItems: function () {
                let items = [
//                    {value: 8, text: '故障阈值设置'},
//                    {value: 10, text: '故障使能设置'},
//                    {value: 12, text: '电参数上报周期设置'},
//                    {value: 15, text: '传感器使能设置'},
//                    {value: 16, text: '感应亮度设置'},
//                    {value: 13, text: '电能累计清零'},
//                    {value: 14, text: '亮灯时长累计清零'},
                ]
                if (!this.isGroup) {
                    items.push({value: 5, text: '下发任务'});
                }
                return items;
            },
            searchItems: function () {
                let items = [
//                    {value: 9, text: '故障阈值查询'},
//                    {value: 11, text: '故障使能查询'},

                ];
                if (!this.isGroup) {
                    items.push({value: 7, text: '查询定时任务'})
                }
                return items;
            }
        },
        created: function () {
            this.initData()
        },
        methods: {
            initData: function () {
                CommonContent.deviceType.forEach(item => {
                    this.moduleType[item.name] = item.value;
                })
            },
            generate(controltype) {
                if (controltype == 3) {
                    this.operData.brightness = this.brightness;
                }
                this.operData.controltype = controltype;
                this.showModal();
            },
            controlDevice: function () {
                let data = this.transformData(this.operData);
                if (this.isGroup) {
                    data.groupids = this.ids.join(',');
                    GroupService.controlLight(data).then(res => {
                        this.hideModal();
                        this.initPaging()
                        this.resetData()
                    })
                } else if(this.isArea) {
                    data.deviceIds = this.ids.join(',');
                    AreaService.controlStation(data).then(res => {
                        this.hideModal();
                        this.initPaging()
                        this.resetData()
                    })
                } else {
                    data.deviceIds = this.ids.join(',');
                    LightService.controlLights(data).then(res => {
                        this.hideModal();
                        this.initPaging();
                        this.resetData()
                    });
                }
            },
            transformData: function (data) {
                if (data.controltype == 16) {
                    if (this.noinducedbrightness == 0) {
                        data.noinducedbrightness = 255
                    }
                }
                return data
            },
            showModal() {
                this.visible = true;
            },
            hideModal: function () {
                this.visible = false;
            },
            resetData: function () {
                this.operData = {};
                this.brightness = 0;
            }
        },
    }
</script>

<style scoped lang="less">
  .control-on {
    .control-icon {
      /*background: url("../../../assets/control/light-on.png") no-repeat;*/
      /*background-size: contain;*/
    }
  }

  .control-brightness {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    .el-slider {
      flex: 1;
      margin-left: 20px;
    }
  }

  .control-status {
    .control-icon {
      background: url("../../../assets/control/reflesh.png") no-repeat;
      background-size: contain;
    }
  }

  .control-search,
  .control-set {
    display: flex;
    align-items: center;
  }

</style>
