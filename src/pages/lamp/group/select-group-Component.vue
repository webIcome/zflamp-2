<template>
  <el-row type="flex" justify="space-between">
    <el-col :span="18">{{deviceNumber}}个组</el-col>
    <el-input v-model="value" v-show="false"></el-input>
    <el-button :disabled="!editable" :span="6" type="primary" icon="el-icon-edit-outline" @click="dialogEditDevice">编辑</el-button>
    <el-dialog title="选择" :visible.sync="dialogVisible" center :width="'550px'"  append-to-body>
      <el-transfer v-model="selectedList"
                   :titles="titles"
                   :data="list"
                   :props="props"
                   :format="format">
        <el-pagination style="margin-top: 5px" class="transfer-footer" slot="left-footer" @current-change="pagingEvent"
                       small
                       :total="total"
                       next-text="下一页"
                       prev-text="上一页"
                       :page-size="searchParams.pageSize"
                       layout="prev, next"></el-pagination>
      </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="selectDevice">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
    import groupService from "../../../services/group";
    import Config from "../../../config";
    export default{
        name: 'selectGroupComponent',
        data(){
            return {
                dialogVisible: false,
                searchParams: {
                },
                list: [],
                titles: ['组列表', '已选择组'],
                format: {
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}'
                },
                props: {
                    key: 'objectid',
                    label: 'groupname'
                },
                selectedList: [],
                selectDataList: [],
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
                total: 0,
            }
        },
        props: {
            companyid: {
                default: '',
            },
            moduletype: {
                default: ''
            },
            value: {
                default: ''
            },
            run: {
                default: false
            },
            groupname: {
                default: ''
            },
            max: {
                default: 5
            }
        },
        computed: {
            editable: function () {
                return this.moduletype && this.companyid
            },
            deviceNumber: function () {
                if (this.value) {
                    return this.value.split(',').length;
                } else {
                    return 0;
                }
            }
        },
        watch: {
            value: function (newVal) {
                if (newVal && this.run) this.getSelectedList();
            },
            companyid: function (newVal, oldVal) {
                if (this.run && oldVal) this.initSelectedDataList();
            }
        },
        methods: {
            dialogEditDevice: function () {
                this.resetData();
                this.searchParams.companyid = this.companyid;
                this.searchParams.moduletype = this.moduletype;
                this.dialogVisible = true;
                this.initSelectedList();
                this.findList(this.searchParams)
            },
            pagingEvent: function (pageNumber) {
                this.searchParams.pageNum = pageNumber;
                this.findList(this.searchParams);
            },
            findList: function (params) {
                groupService.findList(params).then(data => {
                    this.searchParams.pageNum = data.pageNum;
                    this.searchParams.pages = data.pages;
                    this.searchParams.pageSize = data.pageSize;
                    this.list = this.concatList(data.list);
                    this.total = data.total;
                });
            },
            concatList: function (list) {
                list = list.filter(item => {
                    let filter = true;
                    this.selectDataList.forEach(selectItem => {
                        if (selectItem.objectid == item.objectid) {
                            filter = false
                        }
                    });
                    return filter;
                });
                return list.concat(this.selectDataList);
            },
            getSelectedList: function () {
                this.initSelectedList();
                this.$emit('input', this.selectedList.join());
            },
            initSelectedList: function () {
                this.selectedList = [];
                if (!this.value) return;
                this.selectDataList = this.getGroups(this.value, this.groupname);
                this.selectDataList.forEach(item => {
                    this.selectedList.push(item.objectid);
                });
            },
            initSelectedDataList: function () {
                this.selectDataList = [];
                this.selectedList = [];
                this.selectDataList.forEach(item => {
                    this.selectedList.push(item.objectid);
                });
                this.selectDevice();
            },
            getGroups: function (id, name) {
                let ids = id.split(',');
                let names = name.split(',');
                let groups = [];
                ids.forEach((item,index) => {
                    let group = {};
                    group.objectid = item;
                    group.groupname = names[index];
                    groups.push(group)
                });
                return groups;
            },
            selectDevice: function () {
                if (this.selectedList.length > this.max) {
                    this.$message({
                        message: '最多归属'+ this.max + '个组',
                        type: 'warning',
                        duration: 1000
                    });
                    return;
                }
                this.name(this.selectedList);
                this.$emit('input', this.selectedList.join());
                this.dialogVisible = false;
            },
            name: function (selectedList) {
                let names = [];
                this.list.forEach(item => {
                    if (selectedList.indexOf(item.objectid) != -1) {
                        names.push(item.groupname);
                    }
                });
                this.$emit('name', names.join())
            },
            resetData: function () {

            }
        }
    }
</script>