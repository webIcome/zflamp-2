<template>
  <div class="control-items">
    <div class="control">
      <el-button :disabled="!ids.length" @click="generate(1)" class="control-btn">查询状态</el-button>
    </div>
    <div class="control">
      <el-button :disabled="!ids.length" @click="generate(4)" class="control-btn">告警归档</el-button>
    </div>
    <div class="control">
      <el-select :disabled="!ids.length" v-model='operData.operateType' placeholder="请选择" @visible-change="showSetModal" clearable>
        <el-option v-for="item in setItems"
                   :label="item.text"
                   :value="item.value"
                   :key="item.value"></el-option>
      </el-select>
    </div>
    <div class="control">
      <el-select :disabled="!ids.length" v-model='operData.operateType' placeholder="请选择" @visible-change="showModel" clearable>
        <el-option v-for="item in searchItems"
                   :label="item.text"
                   :value="item.value"
                   :key="item.value"></el-option>
      </el-select>
    </div>


    <el-dialog title="确定操作" :visible.sync="visible" center width="600px">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p v-if="operateType == 1" class="title">您确认要查询状态吗？</p>
      <p v-else-if="operateType == 3" class="title">您确认要告警归档吗？</p>
      <p v-else-if="operateType == 4" class="title">您确认要查询门开关状态吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="控制井盖" :visible.sync="setVisible" center width="600px">
      <el-form label-width="100px" :model="operData" ref="well-form" :rules="Rules" class="el-form-default" :validate-on-rule-change="false">
          <el-form-item label="告警阈值：" prop="operateValue">
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
    import Service from "../../../services/door";
    import CommonContent from "../../../constants/common";
    export default {
        name: 'controlWaterLevelComponent',
        components: {},
        data() {
            return {
                visible: false,
                setVisible: false,
                operData: {},
                operateType: '',
                setItems: [
                    {value: 9, text: '告警阈值'},
                ],
                searchItems: [
                    {value: 9, text: '门开关状态'},
                ],
                Rules: {
                    operateValue: [
                        {required: true, message: '请输入告警阈值'},
                        {type: 'number', message: '范围0~330', min: 0, max: 330}
                    ]
                }
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

            },
            generate(operateType) {
                if (operateType) this.operData.operateType = operateType;
                this.showModal();
            },
            controlDevice: function () {
                let data = {};
                if (this.operData.operateType == 4) {
                    Service.pigeonholeWell(this.ids.join(',')).then(res => {
                        this.hideModal();
                        this.initPaging();
                        this.resetData();
                    });
                    return;
                }
                data.operateType = this.operData.operateType;
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
                this.$emit('initCurrentPaging')
            },
            resetData: function () {
                this.operData = {}
            }
        }
    }
</script>

<style scoped lang="less">

  .control-status {
    .control-icon {
      background: url("../../../assets/control/reflesh.png") no-repeat;
      background-size: contain;
    }
  }

</style>
