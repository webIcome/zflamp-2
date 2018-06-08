<template>
  <div class="control-items">
    <div class="control control-on">
      <el-button :disabled="!ids.length" @click="generate(1)" class="control-btn">开关线路</el-button>
    </div>
    <div class="control control-status">
      <el-button :disabled="!ids.length" @click="generate(2)" class="control-btn">获取状态<span class="control-icon"></span></el-button>
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
    <el-dialog title="确定操作" :visible.sync="visible" center width="450px">
      <template v-if="operData.controltype == 2">
        <div class="text-center">
          <div class="dialog-warning"></div>
        </div>
        <p class="title">您确认要获取所有线路状态吗？</p>
      </template>
      <template v-else-if="operData.controltype == 1">
        <el-form label-width="120px" :model="operData" :rules="Rules"  :ref="loopRef" class="el-form-default" >
          <el-form-item v-show="operData.controltype == 1" label="控制回路：" prop="loop">
            <template v-for="(item,index) in selectedLoops" >
              <div style="margin-bottom: 10px">
                <el-select style="width: 100px;margin-right: 10px"  v-model="item.number" clearable placeholder="请选择某一线路">
                  <el-option v-for="item in loopnum" :value="item" :label="item + ' 线路'" :key="item"></el-option>
                </el-select>
                <!--<el-input v-else type="number" style="width: 100px; margin-right: 10px" v-model="item.number"></el-input>-->
                <div style="display: inline-block;">
                  <el-radio v-model="item.switchtype" :label='1'>开</el-radio>
                  <el-radio v-model="item.switchtype" :label='2'>关</el-radio>
                </div>
                <i title="删除回路" class="el-icon-remove-outline" style="vertical-align: middle;margin-left: 20px;cursor: pointer" @click="deleteLoop(index)"></i>
              </div>
            </template>
            <div style="margin-top: 20px">
              <el-button type="primary" @click="addLoop">添加回路</el-button>
            </div>
          </el-form-item>
        </el-form>
      </template>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
    import LoopService from "../../../services/loop";
    import GroupService from "../../../services/group"
    import CommonContent from "../../../constants/common";
    import controlDialogComponent from "./control-dialog-component.vue"
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
                loopnum: 4,
                Rules: {
                    controltype: [
                        {required: true, message: '请选择指令'},
                    ],
                    loop: [
                        {required: true, message: '添加回路', trigger: 'change'}
                    ]
                },
                loopRef: 'loop-ref',
                selectedLoops: [],
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
                    {value: 6, text: '设置心跳包周期'},
                ]
                if (!this.isGroup) {
                    items.push({value: 5, text: '下发任务'});
                }
                return items;
            },
            searchItems: function () {
                let items = [
                    {value: 3, text: '读取电流'},
                    {value: 4, text: '抄表'},
                ]
                if (!this.isGroup) {
                    items.push({value: 8, text: '查询定时任务'});
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
                this.operData.controltype = controltype;
                this.showModal();
            },
            controlDevice: function () {
                if (this.operData.controltype == 1) {
                    let filter;
                    this.$refs[this.loopRef].validate(valid => {
                            filter = valid;
                    })
                    if (!filter) return
                }
                let data = this.transformData(this.operData);
                if (this.isGroup) {
                    data.groupids = this.ids.join(',');
                    GroupService.controlLoop(data).then(res => {
                        this.hideModal();
                        this.initPaging();
                        this.resetData();
                    })
                } else {
                    data.deviceIds = this.ids.join(',');
                    LoopService.controlLoops(data).then(res => {
                        this.hideModal();
                        this.initPaging();
                        this.resetData();
                    });
                }
            },
            transformData: function (data) {
                if (data.controltype == 1) {
                    data.switchtype = this.selectedLoops.map(item => {
                        return item.switchtype
                    }).join();
                    data.loop = this.selectedLoops.map(item => {
                        return item.number;
                    }).join();
                }
                return data
            },
            addLoop: function () {
                if (this.selectedLoops.length == 4) {
                    this.showMessage();
                    return;
                }
                this.selectedLoops.push({switchtype: 1, number: this.selectedLoops.length + 1});
                this.operData.loop = this.selectedLoops.map(item => {
                    return item.number;
                }).join();
            },
            deleteLoop: function (index) {
                this.selectedLoops.splice(index, 1);
                this.operData.loop = this.selectedLoops.map(item => {
                    return item.number;
                }).join();
            },
            showMessage() {
                this.$message({
                    message: '该回路最多有'+ this.loopnum + '个回路数',
                    type: 'warning',
                    duration: 1500
                })
            },
            showModal() {
                this.visible = true;
            },
            hideModal: function () {
                this.visible = false;
            },
            resetData: function () {
                this.operData = {};
                this.selectedLoops = []
            }
        },
    }
</script>

<style scoped lang="less">

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
