<template>
  <div class="control-items">
    <div class="control control-on">
      <div class="control-btn">开灯</div>
    </div>
    <div class="control control-off">
      <div class="control-btn">关灯</div>
    </div>
    <div class="control control-brightness">
      <span>调节亮度</span>
      <el-slider v-model="brightness" :step="5"></el-slider>
    </div>
    <div class="control control-status">
      <div class="control-btn"><span class="control-text">获取状态</span><span class="control-icon"></span></div>
    </div>
    <div class="control control-set">
      <span class="control-text">设置</span>
      <control-dialog-component :ids="ids" :items="setItems"></control-dialog-component>
    </div>
    <div class="control control-search">
      <span class="control-text">查询</span>
      <control-dialog-component :ids="ids" :items="searchItems"></control-dialog-component>
    </div>
    <el-dialog title="确定操作" :visible.sync="visible" center width="900px">

    </el-dialog>
  </div>

</template>

<script>
    import LightService from "../../../services/light";
    import GroupService from "../../../services/group"
    import CommonContent from "../../../constants/common";
    import controlDialogComponent from "./control-dialog-component.vue"
    export default {
        name: 'controlLightComponent',
        components: {
            controlDialogComponent,
        },
        data() {
            return {
                moduleType: {},
                brightness: 0,
                visible: false
            }
        },
        props: {
            isGroup: {
                default: false
            },
            isSingle: {
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
                    {value: 8, text: '故障阈值设置'},
                    {value: 10, text: '故障使能设置'},
                    {value: 12, text: '电参数上报周期设置'},
                    {value: 15, text: '传感器使能设置'},
                    {value: 16, text: '感应亮度设置'},
                    {value: 13, text: '电能累计清零'},
                    {value: 14, text: '亮灯时长累计清零'},
                ]
                if (!this.isGroup) {
                    items.push({value: 5, text: '下发任务'});
                    items.push({value: 6, text: '取消定时任务'})
                }
                return items;
            },
            searchItems: function () {
                let items = [
                    {value: 9, text: '故障阈值查询'},
                    {value: 11, text: '故障使能查询'},

                ];
                if (!this.isGroup) {
                    items.push({value: 5, text: '下发任务'});
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
            dialogControlDevice: function () {
                this.resetData();
                this.controlDeviceDialogVisible = true;
            },
            controlDevice: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let data = this.transformData(this.operData);
                        if(this.isGroup) {
                            data.groupids = this.ids;
                            GroupService.controlLight(data).then(res => {
                                this.hideModal();
//                                this.initPaging()
                            })
                        } else {
                            data.deviceids = this.ids.join(',');
                            LightService.controlLights(data).then(res => {
                                this.hideModal();
                                this.initPaging()
                            });
                        }
                    }
                })
            },
            transformData: function (data) {
                if (data.controltype == 16) {
                    if (this.noinducedbrightness == 0) {
                        data.noinducedbrightness = 255
                    }
                }
                return data
            },
            hideModal: function () {
                this.controlDeviceDialogVisible = false;
            },
            initPaging() {
                this.$emit('initCurrentPaging')
            },
            resetData: function () {
                this.operData = {
                    controltype: 1,
                };
            }

        }
    }
</script>

<style scoped lang="less">
  .control-on{
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
