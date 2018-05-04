/**
 * Created by spring on 2018/4/10.
 */
import HttpClient from 'axios'
import {Message} from 'element-ui'
export default {
    findList(params) {
        return HttpClient.get('groupInfo', {params: params}).then(res => {
            if (!res.data && !res.data.data) {
                return {};
            } else {
                return res.data.data;
            }
        })
    },
    add(body) {
        return HttpClient.post('groupInfo', body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    edit(id, body) {
        return HttpClient.patch('groupInfo/' + id, body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    deleteDevice(id) {
        return HttpClient.delete('groupInfo/' + id).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlLight(id, body) {
        return HttpClient.post('groupControl/lightController/' + id, body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlLoop(id, body) {
        return HttpClient.post('groupControl/loopController/' + id, body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlStation(id, body) {
        return HttpClient.post('groupControl/ap/' + id, body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    findGroupedList(params) {
        return HttpClient.get('groupInfo/getDeviceGroupedList', {params: params}).then(res => {
            if (!res.data && !res.data.data) {
                return {};
            } else {
                return res.data.data;
            }
        })
    },
    findNoGroupedList(params) {
        return HttpClient.get('groupInfo/getDeviceNoGroupedList', {params: params}).then(res => {
            if (!res.data && !res.data.data) {
                return {};
            } else {
                return res.data.data;
            }
        })
    }
}

function showSuccess(res, msg) {
    if (res && res.data && res.data.code == 0) {
        msg = msg? msg : '操作成功';
        Message({
            message: msg,
            type: 'success',
            duration: 1000
        })
    }
}
