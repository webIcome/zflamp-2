<template>
  <div class="organize-content">
    <div class="organize-title">岗位信息 </div>
    <div class="organize-btns">
      <oper-post-component></oper-post-component>
      <oper-post-component :edit="true" :post="currentRow"></oper-post-component>
      <div class="default-btn">冻结</div>
    </div>
    <div class="table-div">
      <div class="table-thead">
        <div class="table-th">岗位名称</div>
        <div class="table-th">说明</div>
      </div>
      <div class="table-body">
        <div class="table-tr" v-for="item in list" @click="handleCurrentChange(item)"
             :class="{'current-row': item.objectid == currentRow.objectid}">
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
    export default {
        name: 'postComponent',
        components: {
            operPostComponent
        },
        data() {
            return {
                list: [],
                currentRow: {},
                tableRef: 'my-table'
            }
        },
        props: {
            companyId: '',
        },
        created() {
        },
        methods: {
            getPost(id) {
                Service.getPosts(id).then(list => {
                    this.list = list;
                })
            },
            handleCurrentChange(val) {
                this.currentRow = val;
//                this.$emit('input', val);
            }
        },
        watch: {
            companyId: function (newVal, oldVal) {
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