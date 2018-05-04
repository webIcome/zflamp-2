<template>
  <div class="tree-select">
    <el-input readonly :value="text" :placeholder="placeholder"/>
    <div class="tree-select-clear" @click.self="clear">&times;</div>
    <div class="tree-select-content" v-if="isShow">
      <tree-select-contents :items="items" v-on:input="chooseItem"></tree-select-contents>
    </div>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                isShow: false,
                disabled: true
            }
        },
        props: {
            list: {
                type: Array,
                default: [],
            },

            placeholder: {
                type: String,
                default: '选择归属企业'
            },
            value: ''
        },
        components: {
            'tree-select-contents': {
                name: 'tree-select-contents',
                template: `
<div class="tree-select-children">
<div class="tree-select-item " v-for="item in items">
<template v-if="item.children.length">
    <div class="tree-select-close" v-if="!item.close" @click.self="hide(item)"></div>
    <div class="tree-select-open" v-else @click.self="show(item)"></div>
</template>

    <div @click.self="chooseItem(item)" class="tree-select-name">{{item.companyname}}</div>
    <template v-if="!item.close">
            <tree-select-contents v-if="item.children" :items="item.children" v-on:input="chooseItem"></tree-select-contents>
</template>
  </div>
</div>

                `,
                props: {
                    items: {
                        type: Array,
                        default: []
                    }
                },
                methods: {
                    show: function (item) {
                        this.$set(item, 'close', false);
                    },
                    hide: function (item) {
                        this.$set(item, 'close', true);
                    },
                    chooseItem: function (item) {
                        this.$emit('input', item);
                    }
                }
            }

        },
        computed: {
            items: function () {
                return this.getItems()
            },
            text: function () {
                let text = ''
                let that = this;
                this.list.forEach(function exc(item) {
                    if (item.objectid == that.value) {
                        text = item.companyname;
                        return;
                    }
                    if (item.children.length <= 0) {
                        return ;
                    } else {
                        item.children.forEach(item => {
                            exc(item)
                        })
                    }
                })
                return text;
            }
        },
        methods: {
            getItems: function () {
                this.list.forEach(item => {
                    this.getChildren(item);
                    this.$set(item, 'close', false);
                });
                return this.list;
            },
            getChildren: function (item) {
                this.$set(item, 'close', true);
                let list = item.children;
                if (list.length <= 0) {
                    return item;
                } else {
                    list.forEach(child => {
                        this.getChildren(child);
                    })
                }
            },
            chooseItem: function (item) {
                this.$emit('input', item.objectid);
                this.disabled = false
            },
            clear: function () {
                this.chooseItem({})
            },
            dc (e) {
                this.isShow = this.$el.contains(e.target) && this.disabled;
                this.disabled = true;
            }
        },
        mounted () {
            document.addEventListener('click', this.dc)
        },
        beforeDestroy () {
            document.removeEventListener('click', this.dc)
        }
    }
</script>

<style lang="less">
  @size: 6px;
  .form-inline .tree-select {
    display: inline-block;
  }
  .el-form .tree-select {
    width: 100%;
  }
  .tree-select {
    position: relative;
    width: auto;
    vertical-align: middle;
    input {
      padding-right: 35px;
    }
    .tree-select-clear {
      position: absolute;
      right: 10px;
      top: 50%;
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
        filter: alpha(opacity=50);
        opacity: .5;
      }
    }
    .tree-select-content {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      float: left;
      min-width: 160px;
      padding: 5px 0;
      margin: 2px 0 0;
      font-size: 14px;
      text-align: left;
      list-style: none;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #ccc;
      border: 1px solid rgba(0, 0, 0, .15);
      border-radius: 4px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
    }
  }

  .tree-select-children {
    padding-left: 25px;
    padding-right: 10px;
    .tree-select-item {
      position: relative;
      white-space: nowrap;
      margin: 5px 0;
      font-size: 0px;
      .tree-select-close,
      .tree-select-open,
      .tree-select-name {
        display: inline-block;
        cursor: pointer;
        vertical-align: middle;
        user-select: none;
        font-size: 14px;
      }
      .tree-select-close {
        width: 0;
        height: 0;
        margin-left: 2px;
        margin-right: 10px;
        vertical-align: middle;
        border-top: @size dashed;
        border-right: @size solid transparent;
        border-left: @size solid transparent;
      }
      .tree-select-open {
        width: 0;
        height: 0;
        margin-left: 2px;
        margin-right: 10px;
        vertical-align: middle;
        border-left: @size dashed;
        border-top: @size solid transparent;
        border-bottom: @size solid transparent;
      }
    }
  }

</style>
