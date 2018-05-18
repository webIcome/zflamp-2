<template>
  <div>
    <div>已选择{{selectedList.length}}个定时任务，还可以下发{{allowNumber}}个定时任务</div>
    <el-transfer v-model="selectedList"
                 :titles="titles"
                 :data="list"
                 :props="props"
                 @change="selectDevice"
                 :format="format">
      <el-pagination style="margin-top: 5px" class="transfer-footer" slot="left-footer" @current-change="pagingEvent"
                     small
                     :total="total"
                     next-text="下一页"
                     prev-text="上一页"
                     :page-size="searchParams.pageSize"
                     layout="prev, next"></el-pagination>
    </el-transfer>
  </div>
</template>
<script>
    import TaskService from "../../../services/task";
    import Config from "../../../config";
    import CommonConstant from "../../../constants/common";
    export default{
        name: 'selectTasksComponent',
        data(){
            return {
                searchParams: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
                list: [],
                titles: ['任务列表', '已选择任务列表'],
                format: {
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}'
                },
                props: {
                    key: 'id',
                    label: 'taskName'
                },
                selectedList: [],
                selectDataList: [],
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
                total: 0,
                deviceType: {},
            }
        },
        props: {
            moduletype: {
                default: ''
            },
            value: {
                default: ''
            },
        },
        computed: {
            allowNumber: function () {
                return 6 - this.selectedList.length;
            }
        },
        watch: {
            selectedList: function (newVal, oldVal) {
                if (newVal.length > 6) {
                    this.selectedList = oldVal;
                }
            }
        },
        created: function () {
            this.initData();
        },
        methods: {
            initData: function () {
                this.resetData();
                this.searchParams.moduleType = this.moduletype;
                this.findList(this.searchParams)
            },
            pagingEvent: function (pageNumber) {
                this.initSelectDataList();
                this.searchParams.pageNum = pageNumber;
                this.findList(this.searchParams);
            },
            findList: function (params) {
                TaskService.findList(params).then(data => {
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
                        if (selectItem.id == item.id) {
                            filter = false
                        }
                    });
                    return filter;
                });
                return list.concat(this.selectDataList);
            },
            initSelectList: function () {
                this.selectedList = [];
                this.$emit('input', this.selectedList.join());
            },

            initSelectDataList() {
                this.selectDataList = this.list.filter(item => {
                    let filter = false;
                    this.selectedList.forEach(objectid => {
                        if (objectid == item.id) {
                            filter = true;
                        }
                    });
                    return filter;
                })
            },
            selectDevice: function () {
                this.$emit('input', this.selectedList.join());
            },
            resetData: function () {
                this.selectedList = [];
                this.selectDataList = [];
            }
        }
    }
</script>
<style lang="less" scoped>
  .show-text {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    color: #1789e1;
    &:hover {
      color: #2b71b8;
    }
  }

  .clear {
    display: inline-block;
    user-select: none;
    margin-top: -13px;
    cursor: pointer;
    font-size: 21px;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .2;
    &:hover {
      color: #000;
      text-decoration: none;
      cursor: pointer;
      opacity: .5;
    }
  }
</style>