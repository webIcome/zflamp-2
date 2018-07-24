<template>
  <div class="map">
    <div class="my-map" :ref="ref"></div>
    <left-component @updateList="updateList" :moduleType="moduleType" :limits="limits"></left-component>
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
    import HomeService from "../../services/list"
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
                list: [],
                deviceDetail: {},
                moduleType: {},
                mapZoom: 5,
                marker: '',
                searchMarker: '',
                currentModuleType: '',
                isSearchDevice: false,
                id: '',
                limits: []
            }
        },
        computed: {

        },
        created() {
            CommonConstant.deviceType.forEach(item => {
                this.moduleType[item.name] = item.value;
            });
            let length = CommonConstant.deviceType.length;
            CommonConstant.terminalType.forEach(item => {
                this.moduleType[item.name] = item.value + length;
            });
            HomeService.getMenus().then(data => {
                this.limits = data;
            })
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
            updateList(list) {
                this.list = list;
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
                this.list.forEach(item => {
                    let markerClass = new MapMarkerClass(item);
                    markerClass.listen('click', this.markerClickEventFn);
                    markers.push(markerClass.marker);
                });
                return markers;
            },
            markerClickEventFn(markerClass) {
                this.isSearchDevice = false;
                let id = markerClass.device.id || markerClass.device.deviceid;
                if (this.isShowPanel() && this.id == id) {
                    this.hidePanel()
                } else {
                    this.getCurrentDeviceId(id);
                    this.refreshDetail(markerClass.device.moduletype);
                }
                this.marker = markerClass;
            },
            getCurrentDeviceId(id) {
                this.id = id;
            },
            searchDevice(params) {
                this.getCurrentDeviceId(params.id);
                if (params.moduletype == this.currentModuleType) {
                    this.refreshDetail(params.moduletype)
                } else {
                    this.showPanel(params.moduletype);
                }
                this.isSearchDevice = true;
                this.removeMarker(this.searchMarker.marker);
            },
            refreshDetail(moduletype) {
                this.hidePanel();
                this.$nextTick(() => {
                    this.showPanel(moduletype);
                })
            },
            addSearchMarker(detail) {
                if (detail && detail.id) {
//                    this.showPanel(detail.moduletype);
                    if (!(this.searchMarker && (this.searchMarker.device.status == detail.status))) {
                        let markerClass = new MapMarkerClass(detail);
                        markerClass.listen('click',this.markerClickEventFn);
                        this.addMarker(markerClass);
                        this.moveMap({center: (new BMap.Point(detail.lng, detail.lat)), zoom:  16});
                        this.searchMarker = markerClass;
                    }
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
            list: function (newVal) {
                this.moveMap(this.getViewPort(newVal));
                this.addClusterer()
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