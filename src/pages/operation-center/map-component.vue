<template>
  <div class="map-center">
    <div class="map-glint item-one">
      <div class="glint-two">
        <div class="glint-three"></div>
      </div>
    </div>
    <div class="map-glint item-two">
      <div class="glint-two">
        <div class="glint-three"></div>
      </div>
    </div>
    <div class="map-glint item-three">
      <div class="glint-two">
        <div class="glint-three"></div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'mapComponent',
        data() {
            return {

            }
        },
        created() {

        },
        methods: {

        }
    }
</script>
<style lang="less" scoped>
  .map-center {
    position: relative;
    width: 100%;
    height: 150%;
    background: url("../../assets/echart/map.png") no-repeat;
    background-size: contain;
    .map-glint {
      position: relative;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(0,252,254, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      animation: bigger 2s infinite;
      .glint-two{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70%;
        height: 70%;
        border-radius: 50%;
        background: rgba(0,252,254, 0.5);
        .glint-three{
          width: 50%;
          height: 50%;
          border-radius: 50%;
          background: rgba(0,252,254, 1);
        }
      }

    }
    .item-one {
      left: 35%;
      top: 50%;
    }
    .item-two {
      left: 75%;
      top: 15%
    }
    .item-three {
      left: 45%;
      top: 50%;
    }
  }

  @keyframes bigger {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
</style>