<template>
  <div @click.stop="">
    <div :title="showText" v-if="showText" class="show-text"><span @click="showModal">{{showText}}</span></div>
    <el-dialog :visible.sync="visible" center :width="'600px'" append-to-body>
      <div class="lat">纬度：{{device.latitude}}</div>
      ；
      <div class="lng">经度：{{device.longitude}}</div>；
      <div class="lng">位置：{{device.position || device.address}}</div>
      <div style=" width: 100%; height: 500px;" :ref="mapId"></div>
    </el-dialog>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                visible: false,
                map: '',
                mapId: 'my-map'
            }
        },
        props: {
            device: {
                default: function () {
                    return {}
                }
            }
        },
        computed: {
            showText: function () {
                if (this.device.position || this.device.address) {
                    return this.device.position || this.device.address;
                } else if (Number(this.device.longitude)) {
                    return this.device.longitude + '/' + this.device.latitude;
                } else {
                    return ''
                }
            }
        },
        updated() {
            if (this.visible) this.initMap();
        },
        methods: {
            initMap() {
                this.createMap();
                this.setMapEvent();
            },
            createMap() {
                this.map = new BMap.Map(this.$refs[this.mapId]);
                this.moveMap({lng: this.device.longitude, lat: this.device.latitude})
            },
            moveMap(pointer) {
                this.map.centerAndZoom((new BMap.Point(pointer.lng, pointer.lat)), 14);
                this.addMarker(pointer);
            },
            setMapEvent() {
                this.map.enableScrollWheelZoom();//启用地图滚轮放大缩小
                this.map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
                this.map.enableKeyboard();//启用键盘上下左右键移动地图
            },
            addMarker(point) {
                this.map.clearOverlays();
                let marker = new BMap.Marker(point);
                this.map.addOverlay(marker);
            },
            showModal() {
                if ((this.device.longitude == 0 && this.device.latitude == 0) || !this.device.longitude  ) return;
                this.visible = true;
            },
            hideModal() {
                this.visible = false;
            }
        },
    }
</script>
<style scoped lang="less">
  .lat, .lng {
    display: inline-block;
  }
  .show-text {
    position: relative;
    cursor: pointer;
    /*color: #1789e1;*/
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    &:hover {
      /*color: #2b71b8;*/
    }
  }
</style>