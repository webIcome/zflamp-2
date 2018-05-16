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
      <p v-if="controltype == 1" class="title">您确认要开灯吗？</p>
      <p v-else-if="controltype == 2" class="title">您确认要关灯吗？</p>
      <p v-else-if="controltype == 4" class="title">您确认要获取状态吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="控制井盖" :visible.sync="setVisible" center width="400px">
      <el-form label-width="100px" :model="operData" ref="controlDevice" :rules="Rules" class="el-form-default">
        <el-form-item label="告警角度：" prop="angle" required>
          <el-input type="text" v-model.trim="operData.angle"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlSetDevice('controlDevice')">确 定</el-button>
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
            let validateAngle = (rule, value, callback) => {
               if (!value) {
                   return callback(new Error('请输入告警角度'))
               }
               if (!/^[0-9]+\d*$/.test(value)) {
                   return callback(new Error('只能输入正整数'))
               }
               if (value > 35 || value < 0) {
                   return callback(new Error('范围0~35'))
               }
            }
            return {
                moduleType: {},
                brightness: 0,
                visible: false,
                setVisible: false,
                operData: {},
                controltype: '',
                Rules: {
                    angle: [
                        { validator: validateAngle, trigger: ['blur', 'change'] },
//                        {required: true, message: '请输入告警角度'},
//                        {type: 'number', message: '范围0~255',min: 0, max: 255}
                    ]
                }
            }
        },
        props: {
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
                this.controltype = controltype;
                this.showModal();
            },
            controlDevice: function () {
                let data = {};
                data.controltype = this.controltype;
                data.deviceids = this.ids.join(',');
                Service.control(data).then(res => {
                    this.hideModal();
                    this.initPaging()
                });
            },
            controlSetDevice(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let data = this.operData;
                        data.deviceIds = this.ids.join(',');
                        Service.controlLights(data).then(res => {
                            this.hideModal();
                        });
                    }
                })
            },
            transformData: function (data) {

                return data
            },
            showModal() {
                this.visible = true;
            },
            showSetModal() {
                this.setVisible = true;
            },
            hideModal: function () {
                this.visible = false;
            },
            hideSetModal() {
                this.setVisible = false;
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
