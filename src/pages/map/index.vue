<template>
  <div class="map">
    <div class="my-map" :ref="ref"></div>
    <left-component @search="getDevices" @searchWell="getWellList" :list="devices" :wellList="wellList"></left-component>
    <right-component @search="getDetail"
                     @hide="hidePanel"
                     @updateDetail="updateDetail"
                     :apPanel="apPanel"
                     :lightPanel="lightPanel"
                     :wellPanel="wellPanel"
                     :loopPanel="loopPanel"
                     :detail="deviceDetail"></right-component>
  </div>
</template>

<script>
    import CommonConstant from "../../constants/common";
    import MapServices from "../../services/map";
    import leftComponent from './left-component.vue'
    import MapMarkerClass from "../../utils/map-marker-class";
    import RightComponent from "./right-component";
    import WellServices from '../../services/well'
    export default {
        components: {
            RightComponent,
            leftComponent,
        },
        name: 'mapPage',
        data() {
            return {
                ref: 'my-map',
                map: '',
                devices: [],
                wellList: [],
                isSearchWell: false,
                isSearchDevices: false,
                deviceDetail: {},
                moduleType: {},
                mapZoom: 5,
                lightPanel: false,
                loopPanel: false,
                apPanel: false,
                wellPanel: false,
                marker: ''
            }
        },
        computed: {
            isSearch: function () {
                return this.isSearchWell || this.isSearchDevices;
            }
        },
        created() {
            CommonConstant.deviceType.forEach(item => {
                this.moduleType[item.name] = item.value;
            })
            this.moduleType.well = 4;
        },
        mounted() {
            this.initData()
        },
        methods: {
            initData() {
                this.createMap();
                this.setMapEvent();
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
                this.isSearchDevices = true;
                MapServices.getDevices(params).then(devices => {
                    this.devices = this.transformDevices(devices);
                    this.isSearchDevices = false;
                })
            },
            getWellList(params) {
                this.isSearchWell = true;
                if (params.clear) {
                    this.$nextTick(() => {
                        this.wellList = [];
                        this.isSearchWell = false;
                    })
                } else {
                    WellServices.getList(params).then(devices => {
                        this.wellList = this.transformWellList(devices);
                        this.isSearchWell = false;
                    })
                }
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
            transformWellList(list) {
                return list.map(item => {
                    if (item.longitude && item.latitude) {
                        return {
                            lng: item.longitude,
                            lat: item.latitude,
                            deviceid: item.id,
                            moduletype: this.moduleType.well,
                            sn: item.sn,
                            status: item.status,
                        };
                    } else if (item.longitude == 0 || item.longitude == 0) {
                        return {
                            lng: item.longitude,
                            lat: item.latitude,
                            deviceid: item.id,
                            moduletype: this.moduleType.well,
                            sn: item.sn,
                            status: item.status,
                        };
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
                this.map.clearOverlays();
                if (this.clusterer) this.clusterer.clearMarkers();
                this.clusterer = new BMapLib.MarkerClusterer(this.map, {markers: markers})
            },
            addMarker(markerClass) {
                this.map.addOverlay(markerClass.marker);
            },
            removeMarker(marker) {
                if (marker) this.map.removeOverlay(marker);
            },
            getMarkers() {
                let markers = [];
                this.devices.concat(this.wellList).forEach(item => {
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
                    switch (markerClass.device.moduletype) {
                        case this.moduleType.well:
                            WellServices.getDetail(markerClass.device.deviceid).then(device => {
                                this.resetMarker(markerClass, device)
                            });
                            break;
                        default:
                            MapServices.getDetail({
                                moduletype: markerClass.device.moduletype,
                                deviceid: markerClass.device.deviceid
                            }).then(device => {
                                this.resetMarker(markerClass, device)
                            })
                            break
                    }
                }
            },
            resetMarker(markerClass, device) {
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
            },
            getDetail (params) {
                this.hidePanel();
                if (!params.deviceid) {
                    this.removeMarker(this.marker.marker);
                    return;
                }
                switch (params.moduletype) {
                    case this.moduleType.well:
                        WellServices.getDetail(params.deviceid).then(detail => {
                            this.transformDetail(detail, this.moduleType.well)
                        });
                        break;
                    default:
                        MapServices.getDetail(params).then(detail => {
                            this.transformDetail(detail, params.moduletype)
                        })
                        break
                }
            },
            transformDetail(detail, moduletype) {
                this.deviceDetail = detail;
                this.addStatus(moduletype, this.deviceDetail);
                this.showPanel(moduletype);
                let markerClass = new MapMarkerClass(this.deviceDetail);
                markerClass.listen('click',this.markerClickEventFn);
                this.addMarker(markerClass);
                this.moveMap(this.deviceDetail, this.mapZoom);
                this.marker = markerClass;
            },
            updateDetail(params) {
                switch (params.moduletype) {
                    case this.moduleType.well:
                        WellServices.getDetail(params.deviceid).then(detail => {
                            this.deviceDetail = detail;
                            this.updateMarker(detail, params.moduletype)
                        });
                        break;
                    default:
                        MapServices.getDetail(params).then(detail => {
                            this.deviceDetail = detail;
                            this.updateMarker(detail, params.moduletype)
                        });
                        break
                }
            },
            updateMarker(device, moduletype) {
                this.addStatus(moduletype, device);
                if (device.status != this.marker.device.status) {
                    this.marker.device.status = device.status;
                    this.removeMarker(this.marker);
                    this.marker.redraw();
                    this.marker.listen('click',this.markerClickEventFn);
                    this.addMarker(this.marker)
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
                data.status = data.runningstate;
                if (data.status) return;
                if (data.runningstate == 'offline') {
                    data.status = 'offline'
                } else {
                    data.status = 'online'
                }
            },
            addWellStatus(data) {
                if (data.status) return;
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
                    case this.moduleType.well:
                        this.addWellStatus(data);
                        break;
                    default:
                        break;
                }
                data.moduletype = moduleType;
            },
            isShowPanel() {
                return this.lightPanel || this.loopPanel || this.apPanel || this.wellPanel
            },
            hidePanel() {
                this.hideLightPanel();
                this.hideLoopPanel();
                this.hideStationPanel();
                this.hideWellPanel();
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
                    case this.moduleType.well:
                        this.showWellPanel();
                        break;
                    default:
                        break;
                }
            },
            hideWellPanel() {
                this.wellPanel = false;
            },
            hideLightPanel() {
                this.lightPanel = false;
            },
            hideLoopPanel() {
                this.loopPanel = false;
            },
            hideStationPanel() {
                this.apPanel = false;
            },
            showLightPanel() {
                this.lightPanel = true;
            },
            showLoopPanel() {
                this.loopPanel = true;
            },
            showStationPanel() {
                this.apPanel = true;
            },
            showWellPanel() {
                this.wellPanel = true;
            }
        },
        watch: {
           /* devices: function (newVal, oldVal) {
                this.moveMap(this.getViewPort(newVal))
                this.addClusterer()
            },*/
            isSearch: function (newVal) {
                if (!newVal) {
                    this.moveMap(this.getViewPort(this.devices.concat(this.wellList)));
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