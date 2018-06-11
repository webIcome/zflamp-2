<template>
  <div class="map">
    <div class="my-map" :ref="ref"></div>
    <left-component @search="getDevices" @searchWell="getWellList" :list="devices" :wellList="wellList"></left-component>
    <right-component @hide="hidePanel"
                     @updateMarker="updateMarker"
                     @search="searchDevice"
                     :id="id"
                     :moduleType="moduleType"
                     :currentModuleType="currentModuleType"></right-component>
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
                marker: '',
                currentModuleType: '',
                isSearchDevice: false,
                id: ''
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
            });
            this.moduleType.well = 4;
            this.moduleType.waterLevel = 5;
            this.moduleType.door = 6;
            this.moduleType.pose = 7;
            this.moduleType.shake = 8;
            this.moduleType.voice = 9;
            this.moduleType.weather = 10;
            this.moduleType.inundate = 11;
            this.moduleType.illuminance = 12;
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
                this.mapZoom = options.zoom;
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
                            id: item.id,
                            moduletype: this.moduleType.well,
                            sn: item.sn,
                            status: item.status,
                            deviceName: item.deviceName,
                            statusName: item.statusName
                        };
                    } else if (item.longitude == 0 || item.longitude == 0) {
                        return {
                            lng: item.longitude,
                            lat: item.latitude,
                            id: item.id,
                            moduletype: this.moduleType.well,
                            sn: item.sn,
                            status: item.status,
                            deviceName: item.deviceName,
                            statusName: item.statusName
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
                this.isSearchDevice = false;
                if (this.isShowPanel()) {
                    this.hidePanel()
                } else {
                    this.getCurrentDeviceId(markerClass.device.id || markerClass.device.deviceid);
                    this.showPanel(markerClass.device.moduletype);
                }
                this.marker = markerClass;
            },
            getCurrentDeviceId(id) {
                this.id = id;
            },
            searchDevice(params) {
                this.getCurrentDeviceId(params.id);
                this.showPanel(params.moduletype);
                this.isSearchDevice = true;
                this.removeMarker(this.marker.marker);
            },
            addSearchMarker(detail) {
                if (detail && detail.id) {
                    this.showPanel(detail.moduletype);
                    let markerClass = new MapMarkerClass(detail);
                    markerClass.listen('click',this.markerClickEventFn);
                    this.addMarker(markerClass);
                    this.moveMap({center: (new BMap.Point(detail.lng, detail.lat)), zoom:  16});
                    this.marker = markerClass;
                }
            },
            updateMarker(device) {
                if (this.isSearchDevice) {
                    this.addSearchMarker(device)
                } else {
                    if (device.status != this.marker.device.status) {
                        this.marker.device.status = device.status;
                        this.removeMarker(this.marker.marker);
                        this.marker.redraw();
                        this.marker.listen('click',this.markerClickEventFn);
                        this.addMarker(this.marker)
                    }
                }
            },
            hidePanel() {
                this.currentModuleType = '';
            },
            showPanel(type) {
                this.currentModuleType = type;
            },
            isShowPanel () {
                return this.currentModuleType;
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