<template>
  <div class="organize-content">
    <div class="organize-title">权限分配</div>
    <div class="organize-">

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
                tableRef: 'my-table'
            }
        },
        props: {
            postId: '',
        },
        created() {
        },
        methods: {


        },

    }
</script>
<style lang="less" scoped>
  .organize-title {
    font-size: 20px;
    color: #fff;
    margin-bottom: 118px;
  }
</style>