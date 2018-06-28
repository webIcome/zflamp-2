/**
 * Created by spring on 2018/5/3.
 */
let moduleType = {};
import CommonConstant from "../constants/common";
CommonConstant.deviceType.forEach(item => {
    moduleType[item.name] = item.value;
});
let length = CommonConstant.deviceType.length;
CommonConstant.terminalType.forEach(item => {
    moduleType[item.name] = item.value + length;
});
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
            case moduleType.light:
                imgUrl = LightStatus[device.status];
                if (!imgUrl) imgUrl = LightStatus[1];
                break;
            case moduleType.loop:
                imgUrl = LoopStatus[device.status];
                if (!imgUrl) imgUrl = LoopStatus[1];
                break;
            case moduleType.station:
                imgUrl = StationStatus[device.status];
                if (!imgUrl) imgUrl = StationStatus[1];
                break;
            case moduleType.well:
                imgUrl = WellStatus[device.status];
                if (!imgUrl) imgUrl = WellStatus[0];
                break;
            case moduleType.waterLevel:
                imgUrl = WaterLevelStatus[device.status];
                if (!imgUrl) imgUrl = WaterLevelStatus[0];
                break;
            case moduleType.door:
                imgUrl = DoorStatus[device.status];
                if (!imgUrl) imgUrl = DoorStatus[0];
                break;
            case moduleType.pose:
                imgUrl = PoseStatus[device.status];
                if (!imgUrl) imgUrl = PoseStatus[0];
                break;
            case moduleType.shake:
                imgUrl = ShakeStatus[device.status];
                if (!imgUrl) imgUrl = ShakeStatus[0];
                break;
            case moduleType.voice:
                imgUrl = VoiceStatus[device.status];
                if (!imgUrl) imgUrl = VoiceStatus[0];
                break;
            case moduleType.weather:
                imgUrl = WeatherStatus[device.status];
                if (!imgUrl) imgUrl = WeatherStatus[0];
                break;
            case moduleType.inundate:
                imgUrl = InundateStatus[device.status];
                if (!imgUrl) imgUrl = InundateStatus[0];
                break;
            case moduleType.illuminance:
                imgUrl = IlluminanceStatus[device.status];
                if (!imgUrl) imgUrl = IlluminanceStatus[0];
                break;
            default:
                imgUrl = LightStatus[1];
                break;
        }
        this._createMarker(device, imgUrl, width, height)
    }
    redraw(status) {
        if (status) this._device.status = status;
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
    1: './static/imgs/light-on.png',//开
    2: './static/imgs/light-offline.png',//关
    3: './static/imgs/light-err.png'//故障
};
let LoopStatus = {
    1: './static/imgs/loop-online.png',//正常
    2: './static/imgs/loop-offline.png',//离线
    3: './static/imgs/loop-err.png'//故障
};
let StationStatus = {
    1: './static/imgs/ap-online.png',//在线
    online: './static/imgs/ap-online.png',//在线
    2: './static/imgs/ap-offline.png',//离线
    offline: './static/imgs/ap-offline.png',//离线
};
let WellStatus = {
    0: './static/imgs/well-online.png', //在线
    1: './static/imgs/well-offline.png', //离线
    2: './static/imgs/well-err.png', //告警
};
let WaterLevelStatus = {
    0: './static/imgs/water-level-online.png', //在线
    1: './static/imgs/water-level-offline.png', //离线
    2: './static/imgs/water-level-err.png', //告警
}
let DoorStatus = {
    0: './static/imgs/door-online.png', //在线
    1: './static/imgs/door-offline.png', //离线
    2: './static/imgs/door-err.png', //告警
};
let PoseStatus = {
    0: './static/imgs/pose-online.png', //在线
    1: './static/imgs/pose-offline.png', //离线
    2: './static/imgs/pose-err.png', //告警
};
let ShakeStatus = {
    0: './static/imgs/shake-online.png', //在线
    1: './static/imgs/shake-offline.png', //离线
    2: './static/imgs/shake-err.png', //告警
};
let VoiceStatus = {
    0: './static/imgs/voice-online.png', //在线
    1: './static/imgs/voice-offline.png', //离线
    2: './static/imgs/voice-err.png', //告警
};
let WeatherStatus = {
    0: './static/imgs/weather-online.png', //在线
    1: './static/imgs/weather-offline.png', //离线
    2: './static/imgs/weather-err.png', //告警
};
let InundateStatus = {
    0: './static/imgs/inundate-online.png', //在线
    1: './static/imgs/inundate-offline.png', //离线
    2: './static/imgs/inundate-err.png', //告警
};
let IlluminanceStatus = {
    0: './static/imgs/illuminance-online.png', //在线
    1: './static/imgs/illuminance-offline.png', //离线
    2: './static/imgs/illuminance-err.png', //告警
};
