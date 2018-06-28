<template>
  <div class="organize-content">
    <div class="organize-title">权限分配</div>
    <div class="organize-btns">
      <el-button :disabled="!isEdit" @click="updateLimit" class="default-btn">修改</el-button>
    </div>
    <div class="organize-limit">
      <template v-for="limit in list">
        <div class="limits">
          <div class="limits-parent">
            <span @click="unSelectLimit(limit)" v-if="limit.checked" class="limits-input-checked"></span>
            <span @click="selectLimit(limit)" v-else class="limits-input"></span>
              {{limit.modulename}}</div>
          <div class="limits-children">
            <template v-for="item in limit.children">
              <div class="limits-children-item">
                <span @click="unSelectLimit(item, limit)" v-if="item.checked" class="limits-input-checked"></span>
                <span @click="selectLimit(item, limit)"v-else class="limits-input"></span>
                {{item.modulename}}</div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
    import Service from "../../../services/system"
    export default {
        name: 'limitComponent',
        components: {},
        data() {
            return {
                list: [],
                currentRow: {},
                tableRef: 'my-table',
                isEdit: false
            }
        },
        props: {
            postId: '',
        },
        created() {
        },
        methods: {
            getLimits(id) {
                Service.getLimits(id).then(data => {
                    this.list = this.getTransformChecked(data);
                })
            },
            getTransformChecked(array) {
                array.forEach(item => {
                    item.checked = JSON.parse(item.checked);
                    if (item.children.length) {
                        this.getTransformChecked(item.children);
                    } else {
                        return;
                    }

                });
                return array
            },
            selectLimit(item, parent) {
                this.isEdit = true;
                item.checked = true;
                if (parent) {
                    parent.checked = true;
                }
                function exec(list) {
                    if (list && list.length) {
                        list.forEach(item => {
                            item.checked = true;
                        })
                    } else {
                        return
                    }
                }
                exec(item.children);
            },
            unSelectLimit(item, parent) {
                this.isEdit = true;
                item.checked = false;
                function exec(list) {
                    if (list && list.length) {
                        list.forEach(item => {
                            item.checked = false;
                        })
                    } else {
                        return
                    }
                }
                exec(item.children);
                if (parent) {
                   let filter = parent.children.every(item => {
                        return !item.checked
                    })
                    if (filter) parent.checked = false;
                }
            },
            updateLimit: function () {
                let ids = this.getIds(this.list);
                Service.updateLimit({postid: this.postId, permissionlist: ids.join(',')}).then(res => {
                    this.getLimits(this.postId);
                });
            },
            getIds: function (list) {
                let ids = [];
                function getIds(list) {
                    if (list && list.length) {
                        list.forEach(item => {
                            if (item.checked) {
                                ids.push(item.objectid);
                                getIds(item.children);
                            }
                        })
                    } else {
                        return
                    }
                }
                getIds(list);
                return ids;
            },
        },
        watch: {
            postId: function (newVal, oldVal) {
                this.isEdit = false;
                if (newVal) this.getLimits(newVal)
            },
        }

    }
</script>
<style lang="less" scoped>
  .organize-content{
    flex-grow: 0!important;
  }
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
    margin-bottom: 75px;
  }
  .organize-limit {
    background: #25273e;
    border-radius: 4px;
    padding: 10px 9px 25px;
    font-size: 16px;
    max-width: 298px;
    /*min-width: 250px;*/
    .limits {
      /*display: flex;*/
      /*flex-direction: column;*/
      /*align-items: flex-start;*/
      .limits-parent {
        color: #8FABD2;
        display: flex;
        align-items: center;
      }
      .limits-children {
        color: #fff;
        display: flex;
        flex-wrap: wrap;
        padding-left: 20px;
        align-content: space-between;
        margin-bottom: 20px;
        .limits-children-item {
          margin: 20px 20px 0 0;
          white-space: nowrap;
          display: flex;
          align-items: center;
        }
      }
      .limits-input-checked,
      .limits-input{
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 7px;
        cursor: pointer;
      }
      .limits-input-checked {
        background: url("../../../assets/system/input-cheked.png") no-repeat center;
        background-size: contain;
      }
      .limits-input {
        background: url("../../../assets/system/input.png") no-repeat center;
        background-size: contain;
      }
    }
  }
</style>