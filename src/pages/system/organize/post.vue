<template>
  <div class="organize-content">
    <div class="organize-title">岗位信息 </div>
    <div class="organize-btns">
      <oper-post-component @initPaging="refreshPost" :company="company"></oper-post-component>
      <copy-post-component @initPaging="refreshPost" :post="currentRow"></copy-post-component>
      <oper-post-component @initPaging="refreshPost" :edit="true" :post="currentRow"></oper-post-component>
      <frozen-post-component @initPaging="refreshPost" :post="currentRow"></frozen-post-component>
    </div>
    <div class="table-div">
      <div class="table-thead">
        <div class="table-th">岗位名称</div>
        <div class="table-th">说明</div>
      </div>
      <div class="table-body">
        <div class="table-tr" v-for="item in list" @click="handleCurrentChange(item)"
             :class="{'current-row': item.objectid == currentRow.objectid, 'frozen-row': item.flag == 1}">
          <div class="table-td">{{item.postname}}</div>
          <div class="table-td">{{item.description}}</div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
    import Service from "../../../services/system"
    import operPostComponent from "./oper-post.vue"
    import FrozenPostComponent from "./frozen-post";
    import CopyPostComponent from "./copy-post";
    export default {
        name: 'postComponent',
        components: {
            CopyPostComponent, FrozenPostComponent, operPostComponent
        },
        data() {
            return {
                list: [],
                currentRow: {},
                tableRef: 'my-table'
            }
        },
        props: {
            company: '',
        },
        created() {
        },
        methods: {
            refreshPost() {
                Service.getPosts(this.company.objectid).then(list => {
                    this.list = list;
                })
            },
            getPost(id) {
                Service.getPosts(id).then(list => {
                    this.list = list;
                })
            },
            handleCurrentChange(val) {
                this.currentRow = val;
            }
        },
        watch: {
            ['company.objectid']: function (newVal, oldVal) {
                if (newVal) this.getPost(newVal)
                this.currentRow = {}
            },
            currentRow: function (newVal) {
                this.$emit('input', newVal);
            }
        }
    }
</script>
<style lang="less" scoped>
  .organize-title {
    font-size: 20px;
    color: #fff;
    margin-bottom: 20px;
  }

  .organize-btns {
    display: flex;
    .default-btn {
      margin-right: 25px;
    }
    margin-bottom: 30px;
  }
</style>