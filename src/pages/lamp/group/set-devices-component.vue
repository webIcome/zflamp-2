<template>
  <div>
    <div class="show-text" @click="showModal">{{showText}}</div>
    <el-dialog title="选择" :visible.sync="dialogVisible" center :width="'900px'"  append-to-body>
      <transfer-component v-if="dialogVisible" @moveItems="getMoveItems" v-model="selectedList" :data="list" :props="props" :groupid="group.objectid">
        <el-pagination style="margin-top: 5px" class="transfer-footer" slot="left-footer" @current-change="pagingEvent"
                       small
                       :total="total"
                       next-text="下一页"
                       prev-text="上一页"
                       :page-size="searchParams.pageSize"
                       layout="prev, next"></el-pagination>
      </transfer-component>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="selectDevice">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import LightService from "../../../services/light";
    import LoopService from "../../../services/loop";
    import GroupService from "../../../services/group"
    import Config from "../../../config";
    import CommonConstant from "../../../constants/common";
    import TransferComponent from "./transfer-component";
    export default{
        components: {TransferComponent},
        name: 'selectDevicesComponent',
        data(){
            return {
                dialogVisible: false,
                searchParams: {
                },
                list: [],
                titles: [],
                props: {key:'deviceid'},
                selectedList: [],
                selectDataList: [],
                moveItems: {},
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
                total: 0,
            }
        },
        props: {
            moduletype: {
                default: ''
            },
            moduleType: {
                default: function () {
                    return {}
                }
            },
            group: {
                default: function () {
                    return {}
                }
            }
        },
        computed: {
            showText: function () {
                if (this.selectDataList.length) {
                    return this.selectDataList.length + '个设备';
                } else {
                    return '0个设备';
                }
            },
        },
        created: function () {
            this.initData();
        },
        methods: {
            initData: function () {
                switch (this.moduletype) {
                    case this.moduleType.light:
                        this.titles = ['灯空器列表', '已选择灯空器'];
                        break;
                    case this.moduleType.loop:
                        this.titles = ['回路控制器列表', '已选择回路控制器'];
                        break;
                    case this.moduleType.station:
                        this.titles = ['基站', '已选择基站'];
                        break;
                    default:
                        break;
                }
                this.getSelectedList();
            },
            showModal: function () {
                this.resetData();
                this.dialogVisible = true;
                this.findList(this.searchParams)
            },
            pagingEvent: function (pageNumber) {
                this.searchParams.pageNum = pageNumber;
                this.findList(this.searchParams);
            },
            findList: function (params) {
                this.getModuleTypeFn()(params).then(data => {
                    this.searchParams.pageNum = data.pageNum;
                    this.searchParams.pages = data.pages;
                    this.searchParams.pageSize = data.pageSize;
                    this.list = this.selectDataList.concat(this.transformDataToUse(data.list));
                    this.total = data.total;
                });
            },
            transformDataToUse(list) {
                return list.map(item => {
                    let group = []
                    item.groupnameid.split(',').forEach(i => {
                        group.push({value: i.split(':')[1], text: i.split(':')[0]})
                    })
                    item.group = group;
                    return item;
                })
            },
            getSelectedList: function () {
                this.getModuleTypeFn()({groupid: this.group.objectid, apuid: this.group.apuid}).then(data => {
                    this.selectDataList = this.transformDataToUse(data.list);
                    this.initSelectDataList();
                })
            },
            getModuleTypeFn() {
                let fn;
                switch (this.moduletype) {
                    case this.moduleType.light:
                        fn = GroupService.findLights;
                        break;
                    case this.moduleType.loop:
                        fn = GroupService.findLoops;
                        break;
                    default:
                        break;
                }
                return fn;
            },
            initSelectDataList: function () {
                this.selectedList = [];
                this.selectDataList.forEach(item => {
                    this.selectedList.push(item.deviceid);
                });
            },
            getMoveItems(val) {
                this.moveItems = val;
            },
            selectDevice: function () {
                let fn;
                switch (this.moduletype) {
                    case this.moduleType.light:
                        fn = GroupService.updateLightDevices;
                        break;
                    case this.moduleType.loop:
                        fn = GroupService.updateLoopDevices;
                        break;
                    default:
                        break;
                }
                if (!Object.keys(this.moveItems).length) {
                    this.dialogVisible = false;
                    return;
                }
                fn({groupDeviceIds: this.transformDataToSend(this.moveItems)}).then(res => {
                    this.emitEditEvent();
                    this.dialogVisible = false;
                });
            },
            transformDataToSend(data){
                let items = [];
                Object.keys(data).forEach(key => {
                    items.push(key + ':' + data[key].join('_'));
                });
                return items.join(',');
            },
            resetData: function () {
                this.initSelectDataList();
                this.moveItems = {};
                this.searchParams.exceptgroupid = this.group.objectid;
                this.searchParams.apuid = this.group.apuid;
            },
            emitEditEvent() {
                this.$emit('initCurrentPaging')
            },
        },
        watch: {
            group: function () {
                this.getSelectedList()
            }
        }
    }
</script>
<style lang="less" scoped>
  .show-text {
    position: relative;
    cursor: pointer;
    color: #1789e1;
    &:hover {
      color: #2b71b8;
    }
  }
</style>