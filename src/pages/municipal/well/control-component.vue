<template>
  <div class="control-items">
    <div class="control control-on">
      <el-button :disabled="!ids.length" @click="generate(1)" class="control-btn">查询状态</el-button>
    </div>
    <div class="control control-off">
      <el-button :disabled="!ids.length" @click="generate(2)" class="control-btn">设置告警角度</el-button>
    </div>
    <div class="control control-status">
      <el-button :disabled="!ids.length" @click="generate(3)" class="control-btn">校准角度</el-button>
    </div>
    <div class="control control-status">
      <el-button :disabled="!ids.length" @click="generate(4)" class="control-btn">告警归档</el-button>
    </div>

    <el-dialog title="确定操作" :visible.sync="visible" center width="600px">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p v-if="operateType == 1" class="title">您确认要查询状态吗？</p>
      <p v-else-if="operateType == 3" class="title">您确认要校准角度吗？</p>
      <p v-else-if="operateType == 4" class="title">您确认要归档这些设备吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="控制井盖" :visible.sync="setVisible" center width="400px">
      <el-form label-width="100px" :model="operData" ref="well-form" :rules="Rules" class="el-form-default" :validate-on-rule-change="false">
        <el-form-item label="告警角度：" prop="operateValue" required>
          <el-input type="text" v-model.trim="operData.operateValue"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlSetDevice('well-form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
    import Service from "../../../services/well";
    import CommonContent from "../../../constants/common";
    import Config from "../../../config";
    export default {
        name: 'controlWellComponent',
        components: {},
        data() {
            let validateAngle = (rule, value, callback) => {
               if (!value) {
                    callback(new Error('请输入告警角度'))
               } else if (!/^[0-9]+\d*$/.test(value)) {
                    callback(new Error('只能输入正整数'))
               }else if (value > 35 || value < 0) {
                    callback(new Error('范围0~35'))
               } else {
                   callback();
               }
            };
            return {
                moduleType: {},
                brightness: 0,
                visible: false,
                setVisible: false,
                operData: {},
                operateType: '',
                Rules: {
                    operateValue: [
                        {validator: validateAngle, trigger:  ['blur', 'change']},
                    ]
                },
                refreshTimes: Config.REFRESH_TIMES,
                timer: '',
                time: Config.REFRESH_INTERVAL
            }
        },
        props: {
            ids: {
                default: function () {
                    return []
                }
            },
            deviceIds: {
                default: function () {
                    return []
                }
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
            generate(operateType) {
                if (operateType) this.operateType = operateType;
                if (operateType == 2) {
                    this.showSetModal()
                } else {
                    this.showModal();
                }
            },
            controlDevice: function () {
                let data = {};
                if (this.operateType == 4) {
                    Service.pigeonholeWell(this.ids.join(',')).then(res => {
                        this.hideModal();
                        this.initPaging();
                        this.resetData();
                    })
                    return;
                }
                data.operateType = this.operateType;
                data.deviceIds = this.deviceIds.join(',');
                Service.control(data).then(res => {
                    this.hideModal();
                    this.initPaging();
                    this.resetData();
                });
            },
            controlSetDevice(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let data = this.operData;
                        data.operateType = this.operateType;
                        data.deviceIds = this.deviceIds.join(',');
                        Service.control(data).then(res => {
                            this.hideModal();
                            this.initPaging();
                            this.resetData();
                        });
                    }
                })
            },
            showModal() {
                this.visible = true;
            },
            showSetModal() {
                this.setVisible = true;
            },
            hideModal: function () {
                this.visible = false;
                this.setVisible = false;
            },
            initPaging() {
                this.refreshTimes = Config.REFRESH_TIMES;
                this.refreshPage();
            },
            refreshPage() {
                this.timer = setTimeout(() => {
                    if (this.refreshTimes) {
                        this.$emit('initCurrentPaging');
                        this.refreshTimes --;
                        this.refreshPage();
                    }
                }, this.time)
            },
            resetData: function () {
                this.operData = {}
            }
        },
        destroyed() {
            clearInterval(this.timer);
        }
    }
</script>

<style scoped lang="less">

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
