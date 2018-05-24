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
    generateMarker(device, width=35, height=38) {
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
            case 4:
                imgUrl = WellStatus[device.status];
                if (!imgUrl) imgUrl = WellStatus[0];
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
        let point = new BMap.Point(device.lng, device.lat);
        let icon = new BMap.Icon(imgUrl, new BMap.Size(width, height), {imageSize: new BMap.Size(width, height)});
        this._marker = new BMap.Marker(point, {icon: icon, title: device.sn});
        return this._marker;
    }
}

let LightStatus = {
    1: '/static/imgs/light-on.png',//开
    2: '/static/imgs/light-offline.png',//关
    3: '/static/imgs/light-err.png'//故障
};
let LoopStatus = {
    1: '/static/imgs/loop-online.png',//正常
    2: '/static/imgs/loop-offline.png',//离线
    3: '/static/imgs/loop-err.png'//故障
};
let StationStatus = {
    1: '/static/imgs/ap-online.png',//在线
    online: '/static/imgs/ap-online.png',//在线
    2: '/static/imgs/ap-offline.png',//离线
    offline: '/static/imgs/ap-offline.png',//离线
};
let WellStatus = {
    0: '/static/imgs/well-online.png', //在线
    1: '/static/imgs/well-offline.png', //离线
    2: '/static/imgs/well-err.png', //告警
}
