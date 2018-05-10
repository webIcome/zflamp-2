<template>
  <div class="organize-content">
    <div class="organize-title">项目管理 </div>
    <div class="organize-btns">
      <oper-company-component></oper-company-component>
      <oper-company-component :edit="true" :company="currentRow"></oper-company-component>
      <div class="default-btn">冻结</div>
    </div>
    <div class="table-div">
      <div class="table-thead">
        <div class="table-th">项目名称</div>
        <div class="table-th">上级项目</div>
        <div class="table-th">激活状态</div>
        <div class="table-th">项目位置</div>
      </div>
      <div class="table-body"  style="max-height: 600px;overflow: auto;">
        <div class="table-tr" v-for="item in list" @click="handleCurrentChange(item)"
             :class="{'current-row': item.objectid == currentRow.objectid}">
          <div class="table-td">{{item.companyname}}</div>
          <div class="table-td">{{item.loginname}}</div>
          <div class="table-td">{{item.username}}</div>
          <div class="table-td">{{item.operation}}</div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import Service from "../../../services/system"
  import operCompanyComponent from "./oper-company.vue"
    export default {
        name: 'companyComponent',
        components: {
            operCompanyComponent,
        },
        data() {
            return {
                list: [],
                currentRow: {},
                tableRef: 'my-table'
            }
        },
        created() {
            this.initList();
            this.initCompanies();
        },
        methods: {
            initList() {
                Service.getCompanyList().then(list => {
                    this.list = list;
                })
            },

            handleCurrentChange(val) {
                this.currentRow = val;
                this.$emit('input', val);
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