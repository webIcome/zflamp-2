<template>
  <div class="control-items">
    <div class="control control-on">
      <el-button :disabled="!ids.length" @click="generate(1)" class="control-btn">查询状态</el-button>
    </div>
    <div class="control control-off">
      <el-button :disabled="!ids.length" @click="generate(2)" class="control-btn">设置告警角度</el-button>
    </div>
    <div class="control control-status">
      <el-button :disabled="!ids.length" @click="generate(4)" class="control-btn">校准角度</el-button>
    </div>

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
    import Service from "../../../services/well";
    import CommonContent from "../../../constants/common";
    export default {
        name: 'controlWellComponent',
        components: {},
        data() {
            return {
                moduleType: {},
                brightness: 0,
                visible: false,
                operData: {}
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
        computed: {},
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
                this.resetData();
                this.operData.controltype = controltype;
                this.showModal();
            },
            controlDevice: function () {
                let data = this.transformData(this.operData);
                data.deviceids = this.ids.join(',');
                Service.control(data).then(res => {
                    this.hideModal();
                    this.initPaging()
                });
            },
            transformData: function (data) {

                return data
            },
            showModal() {
                this.visible = true;
            },
            hideModal: function () {
                this.visible = false;
            },
            initPaging() {
                this.$emit('initCurrentPaging')
            },
            resetData: function () {
                this.operData = {}
            }

        }
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
