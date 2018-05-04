<template>
  <div class="map">
    <div class="my-map" :ref="ref"></div>
    <left-component @search="getDevices"></left-component>
  </div>
</template>

<script>
    import CommonConstant from "../../constants/common";
    import MapServices from "../../services/map";
    import leftComponent from './left-component.vue'
    import MapMarkerClass from "../../utils/map-marker-class";
    export default {
        components: {
            leftComponent,
        },
        name: 'mapPage',
        data() {
            return {
                ref: 'my-map',
                map: '',
                devices: [],
                deviceDetail: {},
                moduleType: {},
                mapZoom: 5,
                lightPanel: false,
                loopPanel: false,
                stationPanel: false,
            }
        },
        created() {
            CommonConstant.deviceType.forEach(item => {
                this.moduleType[item.name] = item.value;
            })
        },
        mounted() {
            this.initData()
        },
        methods: {
            initData() {
                this.createMap();
                this.setMapEvent();
                this.getDevices();
            },
            getViewPort(Points) {
                return this.map.getViewport(Points)
            },
            createMap() {
                this.map = new BMap.Map(this.$refs[this.ref]);
            },
            setMapEvent() {
                this.map.addControl(new BMap.MapTypeControl({
                    mapTypes: [
                        BMAP_NORMAL_MAP,
                        BMAP_HYBRID_MAP
                    ], type: BMAP_MAPTYPE_CONTROL_MAP,
                    anchor: BMAP_ANCHOR_BOTTOM_RIGHT
                }));
                this.map.addControl(new BMap.NavigationControl({
                    anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
                    offset: new BMap.Size(0, 100)
                }))
                this.map.enableScrollWheelZoom();//启用地图滚轮放大缩小
                this.map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
                this.map.enableKeyboard();//启用键盘上下左右键移动地图
            },
            moveMap(options) {
                this.map.centerAndZoom(options.center, options.zoom);
            },
            getDevices(params) {
                MapServices.getDevices(params).then(devices => {
                    this.devices = this.transformDevices(devices);
                })
            },
            transformDevices(devices) {
                return devices.map(item => {
                    item.lng = item.longitude;
                    item.lat = item.latitude;
                    if (item.lng != 0 || item.lat != 0) {
                        return item;
                    }
                }).filter(item => {
                    if (item) {
                        return true;
                    } else {
                        return false;
                    }
                })
            },
            addClusterer() {
                let markers = this.getMarkers();
                if (this.clusterer) this.clusterer.clearMarkers();
                this.clusterer = new BMapLib.MarkerClusterer(this.map, {markers: markers})
            },
            addMarker(markerClass) {
                this.map.addOverlay(markerClass.marker);
            },
            getMarkers() {
                let markers = [];
                this.devices.forEach(item => {
                    let markerClass = new MapMarkerClass(item);
                    markerClass.listen('click', this.markerClickEventFn);
                    markers.push(markerClass.marker);
                });
                return markers;
            },
            markerClickEventFn(markerClass) {
                if (this.isShowPanel()) {
                    this.hidePanel()
                } else {
                    MapServices.getDetail({
                        moduletype: markerClass.device.moduletype,
                        deviceid: markerClass.device.deviceid
                    }).then(device => {
                        this.deviceDetail = device;
                        this.addStatus(markerClass.device.moduletype, this.deviceDetail);
                        if (this.deviceDetail.status != markerClass.device.status) {
                            markerClass.device.status = this.deviceDetail.status;
                            this.removeMarker(markerClass.marker);
                            markerClass.redraw();
                            markerClass.listen('click', this.markerClickEventFn);
                            this.addMarker(markerClass)
                        }
                        this.showPanel(markerClass.device.moduletype);
                        this.marker = markerClass;
                    })
                }
            },
            addLightStatus(data) {
                if (data.status) return;
                if (data.runningstate != '正常') {
                    data.status = 3;
                } else if (data.switchstate == 2) {
                    data.status = 2
                } else {
                    data.status = 1;
                }
            },
            addStationStatus(data) {
                if (data.status) return;
                if (data.runningstate == 'offline') {
                    data.status = 2
                } else {
                    data.status = 1
                }
            },
            addStatus(moduleType, data) {
                switch (moduleType) {
                    case this.moduleType.light:
                        this.addLightStatus(data);
                        break;
                    case this.moduleType.loop:
                        break;
                    case this.moduleType.station:
                        this.addStationStatus(data);
                        break;
                    default:
                        break;
                }
                data.moduletype = moduleType;
            },
            isShowPanel() {
                return this.lightPanel || this.loopPanel || this.stationPanel
            },
            hidePanel() {
                this.hideLightPanel();
                this.hideLoopPanel();
                this.hideStationPanel()
            },
            showPanel(moduleType) {
                switch (moduleType) {
                    case this.moduleType.light:
                        this.showLightPanel();
                        break;
                    case this.moduleType.loop:
                        this.showLoopPanel();
                        break;
                    case this.moduleType.station:
                        this.showStationPanel();
                        break;
                    default:
                        break;
                }
            },
            hideLightPanel() {
                this.lightPanel = false;
            },
            hideLoopPanel() {
                this.loopPanel = false;
            },
            hideStationPanel() {
                this.stationPanel = false;
            },
            showLightPanel() {
                this.lightPanel = true;
            },
            showLoopPanel() {
                this.loopPanel = true;
            },
            showStationPanel() {
                this.stationPanel = true;
            }
        },
        watch: {
            devices: function (newVal, oldVal) {
                if (newVal.length) {
                    this.moveMap(this.getViewPort(newVal))
                    this.addClusterer()
                }
            }
        }
    }
</script>
<style lang="less" scoped>
  .map {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .my-map {
    width: 100%;
    height: 100%;
  }

</style>