<template>
  <div>
    <el-button v-if="!showText" type="primary" @click="showModal">选择</el-button>
    <div v-else class="show-text"><span :title="showText" style="display: inline-block; max-width: 90%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;vertical-align: middle;" @click="showModal">{{showText}}</span><span class="clear" @click="clearSelect">&times;</span></div>
    <el-dialog title="选择地理位置" :visible.sync="visible" center :width="'600px'" append-to-body>
      <div class="lat">纬度：{{pointer.lat}}</div>
      ；

      <div class="lng">经度：{{pointer.lng}}</div>
      <el-input class="position" v-model="pointer.position" placeholder="当前地理位置" clearable></el-input>
      <div style=" width: 100%; height: 500px;" :ref="mapId"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                visible: false,
                map: '',
                pointer: {
                    lng: '',
                    lat: '',
                    position: ''
                },
                mapId: 'my-map'
            }
        },
        props: {
            value: {
                default: function () {
                    return {
                        lng: '',
                        lat: '',
                        position: '',
                    }
                }
            }
        },
        computed: {
            showText: function () {
                if (this.value.position) {
                    return this.value.position;
                } else if(this.value.lng || this.value.lat) {
                    return this.value.lng + '/' + this.value.lat;
                } else {
                    return ''
                }
            }
        },
        updated() {
            if (this.visible && !this.map) this.initMap(this.pointer);
        },
        methods: {
            initMap(pointer) {
                this.createMap(pointer);
                this.setMapEvent();
            },
            initPointer() {
                this.pointer = Object.assign({}, this.value);
                if (!this.pointer.lat && this.map) this.moveMap()
            },
            createMap(pointer) {
                this.map = new BMap.Map(this.$refs[this.mapId]);
                this.moveMap(pointer)
            },
            moveMap(pointer) {
                if (pointer && pointer.lat) {
                    this.map.centerAndZoom((new BMap.Point(pointer.lng, pointer.lat)), 12);
                    this.addMarker(pointer);
                } else {
                    this.useCityPointer(this.map);
                }
            },
            useCityPointer(map) {
                let currentCity = new BMap.LocalCity();
                currentCity.get(r => {
                    map.centerAndZoom(new BMap.Point(r.center.lng, r.center.lat), 12);
                    this.pointer.lat = r.center.lat;
                    this.pointer.lng = r.center.lng;
                    this.showPosition(r.center)
                })
            },
            setMapEvent() {
                this.map.enableScrollWheelZoom();//启用地图滚轮放大缩小
                this.map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
                this.map.enableKeyboard();//启用键盘上下左右键移动地图
                this.map.addEventListener('click', this.selectPoint);
            },
            selectPoint(e) {
                this.pointer.lng = e.point.lng;
                this.pointer.lat = e.point.lat;
                this.showPosition(e.point)
            },
            showPosition(point) {
                (new BMap.Geocoder()).getLocation(point, rs => {
                    this.pointer.position = rs.addressComponents.province + rs.addressComponents.city + rs.addressComponents.district + rs.addressComponents.street + rs.addressComponents.streetNumber;
                    this.pointer = Object.assign({}, this.pointer, rs.addressComponents)
                })
                this.addMarker(point)
            },
            addMarker(point) {
                this.map.clearOverlays();
                let marker = new BMap.Marker(point);
                this.map.addOverlay(marker);
            },
            confirm() {
                this.$emit('input', this.pointer);
                this.hideModal();
            },
            clearSelect() {
                this.$emit('input', {city: '', district: '', province: '', position: '',  lng: 0, lat: 0,});
            },
            showModal() {
                this.visible = true;
                this.initPointer();
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
    color: #1789e1;
    &:hover {
      color: #2b71b8;
    }
  }

  .clear {
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
      opacity: .5;
    }
  }
</style>