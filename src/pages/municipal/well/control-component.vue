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

    <el-dialog title="确定操作" :visible.sync="visible" center width="600px">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p v-if="operateType == 1" class="title">您确认要查询状态吗？</p>
      <p v-else-if="operateType == 3" class="title">您确认要校准角度吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="控制井盖" :visible.sync="setVisible" center width="400px">
      <el-form label-width="100px" :model="operData" ref="well-form" :rules="Rules" class="el-form-default" :validate-on-rule-change="false">
        <el-form-item label="告警角度：" prop="angle" required>
          <el-input type="text" v-model.trim="operData.angle"></el-input>
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
                    angle: [
                        { validator: validateAngle, trigger: 'change' },
                    ]
                }
            }
        },
        props: {
            ids: {
                default: []
            },
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
                this.resetData();
                this.operateType = operateType;
                if (operateType == 2) {
                    this.showSetModal()
                } else {
                    this.showModal();
                }
            },
            controlDevice: function () {
                let data = {};
                data.operateType = this.operateType;
                data.deviceIds = this.ids.join(',');
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
                        Service.control(data).then(res => {
                            this.hideModal();
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
                this.$emit('initCurrentPaging')
            },
            resetData: function () {
                this.operData = {}
            }
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
