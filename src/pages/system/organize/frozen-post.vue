<template>
  <div style="margin-right: 25px;">
    <el-button :disabled="!post.objectid" v-if="!isFrozen" @click="frozen(1)" class="default-btn">冻结</el-button>
    <el-button v-else @click="frozen(0)" class="default-btn">激活</el-button>
  </div>
</template>
<script>
    import Service from '../../../services/system'
    import CommonConstant from "../../../constants/common";
    export default {
        name: 'frozenPostComponent',
        data() {
            return {
                data: {},
                ref: 'edit',
            }
        },
        props: {
            post: {
                default: function () {
                    return {}
                }
            },
        },
        created() {
            this.initData();
        },
        computed: {
            isFrozen: function () {
                return this.post.flag == 1 ? true : false;
            },
        },
        methods: {
            initData() {
            },
            frozen(flag) {
                Service.frozenPost({objectid: this.post.objectid, opt: flag}).then(res => {
                    this.emitAddEvent();
                })
            },
            emitAddEvent() {
                this.$emit('initPaging')
            },
        },
    }
</script>