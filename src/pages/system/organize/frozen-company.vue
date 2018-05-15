<template>
  <div style="margin-right: 25px;">
    <el-button :disabled="!company.objectid" v-if="!isFrozen" @click="frozen(1)" class="default-btn">冻结</el-button>
    <el-button v-else @click="frozen(0)" class="default-btn">激活</el-button>
  </div>
</template>
<script>
    import Service from '../../../services/system'
    import CommonConstant from "../../../constants/common";
    export default {
        name: 'frozenCompanyComponent',
        data() {
            return {
                data: {},
                ref: 'edit',
            }
        },
        props: {
            company: {
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
               return this.company.flag == 1 ? true : false;
            },
        },
        methods: {
            initData() {
            },
            frozen(flag) {
                Service.frozenCompany({objectid: this.company.objectid, opt: flag}).then(res => {
                    this.emitAddEvent();
                })
            },
            emitAddEvent() {
                this.$emit('initPaging')
            },
        },
    }
</script>