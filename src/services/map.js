/**
 * Created by spring on 2018/4/10.
 */
import HttpClient from 'axios'
import {Message} from 'element-ui'
import Config from "../config";
const option = {baseURL: Config.WELL_URL_API};
export default {
    getDevices(params) {
        return HttpClient.get('map/deviceList', {params: params}).then(res => {
            if (res.data && res.data.data) {
                return res.data.data.list;
            } else {
                return [];
            }
        })
    },
    getDetail(params) {
        return HttpClient.get('map/getDeviceDetails', {params: params}).then(res => {
            return res.data.data;
        })
    },
    findDevices(value) {
        return HttpClient.get('map/deviceAssociationList', {params: {vague: value}}).then(res => {
            return res.data.data.list;
        }).catch(err => Promise.reject(err))
    },
    findTerminalList(value) {
        return HttpClient.get('terminalInfo/findTerminalList', Object.assign({params: {keys: value}},option)).then(res => {
            return res.data.data;
        }).catch(err => Promise.reject(err))
    },
    controlLight(id, body) {
        return HttpClient.post('singleControl/lightController/' + id, body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlLoop(id, body) {
        return HttpClient.post('singleControl/loopController/' + id, body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlStation(id, body) {
        return HttpClient.post('singleControl/ap/' + id, body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlWell(id, body) {
        return HttpClient.post('singleControl/ap/' + id, body).then(res => {
            showSuccess(res);
            return res;
        })
    }
}

function showSuccess(res, msg) {
    if (res && res.data && (res.data.code == 0 || res.data.code == 200)) {
        msg = msg? msg : '操作成功';
        Message({
            message: msg,
            type: 'success',
            duration: 1000
        })
    }
}
