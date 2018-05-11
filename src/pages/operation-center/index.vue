<template>
  <div :ref="test" class="operation-center">
    <div class="operation-top">
      <div class="operation-left"></div>
      <div class="operation-middle">路灯物联网运营指挥中心</div>
      <div class="operation-right"></div>
    </div>
    <div class="operation-item">
      <div class="operation-left"></div>
      <div class="operation-middle"></div>
      <div class="operation-right"></div>
    </div>
    <div class="operation-empty"></div>
    <div class="operation-item operation-bottom">
      <div class="operation-left"></div>
      <div class="operation-middle"></div>
      <div class="operation-right"></div>
    </div>
    <div class="operation-empty"></div>
  </div>
</template>
<script>
  export default {
      name: 'operationCenterPage',
      components: {

      },
      data() {
          return {
              test: 'test',
              visible: false,
          }
      },
      mounted() {
          this.generateHeight();
          this.visible = true;
      },
      methods: {
          generateHeight() {
              this.$refs[this.test].style.height = document.body.clientWidth * 1080/1500 + 'px';
              console.log( this.$refs[this.test].style.height)
          }
      }
  }
</script>
<style lang="less" scoped>
  .operation-center {
    display: flex;
    flex-direction: column;
    background: url("../../assets/login/bg.png") no-repeat;
    background-size: contain;
    /*height: 100%;*/
    .operation-top {
      flex: 3 1 auto;
      font-size: 48.56px;
      text-align: center;
      display: flex;
      flex-direction: row;


    }
    .operation-item {
      flex: 6 1 auto;
      display: flex;
    }
    .operation-right,
    .operation-left {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .operation-middle {
      flex: 1.614 1 auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .operation-empty {
      flex: 1 1 auto;
    }
  }
</style>