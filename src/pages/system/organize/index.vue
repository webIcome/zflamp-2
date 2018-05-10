<template>
  <div class="content-right">
    <transition-group name="slide-fade">
      <company-component :key="1" v-model="currentCompany"></company-component>
      <post-component :key="2" v-show="currentCompanyId" :companyId="currentCompanyId" v-model="currentPost"></post-component>
      <limitComponent :key="3" v-show="currentPostId" :postId="currentPostId"></limitComponent>
    </transition-group>

  </div>
</template>
<script>

  import companyComponent from "./company.vue"
  import postComponent from "./post.vue"
  import limitComponent from "./limit.vue"
  export default {
      name: 'organizePage',
      components: {
          companyComponent,
          postComponent,
          limitComponent
      },
      data() {
          return {
              currentCompany: {},
              currentPost: {},
              list: [1,2,3,4,5,6,7,8,9],
              a: 1
          }
      },
      computed: {
          currentCompanyId: function () {
              return this.currentCompany.objectid;
          },
          currentPostId: function () {
              return this.currentPost.objectid;
          }
      },
      created() {},
      methods: {

      },
  }
</script>
<style lang="less" scoped>
  .slide-fade-enter-active {
    position: absolute;
    right: 0;
  }
  .slide-fade-leave-active {
    position: absolute;
    right: 0;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(100px);
    opacity: 0;
  }
  .slide-fade-move {
    transition: transform .5s;
  }
  .content-right {
    &>span {
      padding-top: 30px;
      display: flex;
      justify-content: space-between;
      .organize-content{
        flex: 1 1 auto;
        margin-right: 30px;
        height: 100%;
      }
    }
  }
</style>