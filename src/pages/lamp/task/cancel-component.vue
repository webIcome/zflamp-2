<template>
    <el-transfer v-model="selectedList"
                 :titles="titles"
                 :data="list"
                 :props="props"
                 @change="selectDevice"
                 :format="format">
    </el-transfer>
</template>
<script>
    import TaskService from "../../../services/task";
    import CommonConstant from "../../../constants/common";
    export default{
        name: 'cancelTasksComponent',
        data(){
            return {
                list: [],
                titles: ['已下发任务列表', '取消任务列表'],
                format: {
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}'
                },
                props: {
                    key: 'objectid',
                    label: 'taskname'
                },
                selectedList: [],
                total: 0,
                deviceType: {},

            }
        },
        props: {
            deviceid: {
                default: '',
            },
            moduletype: {
                default: ''
            },
            value: {
                default: ''
            },
        },
        computed: {
            deviceNumber: function () {
                if (this.value) {
                    return this.value.split(',').length
                } else {
                    return 0
                }
            },
        },
        watch: {},
        created: function () {
            this.initData();
        },
        methods: {
            initData: function () {
                this.resetData();
                this.searchParams.deviceid = this.deviceid;
                this.searchParams.moduletype = this.moduletype;
                this.findList(this.searchParams)
            },
            findList: function (params) {
                TaskService.getSelectedList(params).then(data => {
                    this.list = data.list;
                    this.total = this.list.length;
                });
            },
            selectDevice: function () {
                this.$emit('input', this.selectedList.join());
            },
            resetData: function () {
                this.selectedList = [];
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