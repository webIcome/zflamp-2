/**
 * Created by spring on 2018/5/3.
 */
export default class MapMarkerClass {
    constructor(device) {
        this._device = device;
        this.generateMarker(device);
    }
    get device() {
        return this._device;
    }
    set device(value) {
        this._device = value;
    }
    get marker() {
        return this._marker;
    }
    generateMarker(device, width=31, height=37) {
        let imgUrl;
        switch (device.moduletype) {
            case 1:
                imgUrl = LightStatus[device.status];
                if (!imgUrl) imgUrl = LightStatus[1];
                break;
            case 2:
                imgUrl = LoopStatus[device.status];
                if (!imgUrl) imgUrl = LoopStatus[1];
                break;
            case 3:
                imgUrl = StationStatus[device.status];
                if (!imgUrl) imgUrl = StationStatus[1];
                break;
            default:
                imgUrl = LightStatus[1];
                break;
        }
        this._createMarker(device, imgUrl, width, height)
    }
    redraw(status) {
        this._device.status = status;
        this.generateMarker(this._device);
    }
    listen(type, fn) {
        this.removeEvent();
        this._eventFn = fn;
        this._event = type;
        this.marker.addEventListener(type, this._runEvent.bind(this))
    }
    removeEvent() {
        if (this._eventFn) {
            this.marker.removeEventListener(this._event, this._runEvent)
        }
    }
    _runEvent(e) {
        this._eventFn(this);
    }
    _createMarker(device, imgUrl, width, height) {
        let point = new BMap.Point(device.longitude, device.latitude);
        let icon = new BMap.Icon(imgUrl, new BMap.Size(width, height), {imageSize: new BMap.Size(width, height)});
        this._marker = new BMap.Marker(point, {icon: icon, title: device.sn});
        return this._marker;
    }
}

let LightStatus = {
    1: '/static/imgs/light.png',//开
    2: '/static/imgs/lightOff.png',//关
    3: '/static/imgs/lightErr.png'//故障
};
let LoopStatus = {
    1: '/static/imgs/loop.png',//正常
    2: '/static/imgs/loopOff.png',//离线
    3: '/static/imgs/loopErr.png'//故障
};
let StationStatus = {
    1: '/static/imgs/station.png',//在线
    2: '/static/imgs/stationErr.png',//离线
};
