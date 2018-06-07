/**
 * Created by spring on 2018/4/10.
 */
import HttpClient from 'axios'
import {Message} from 'element-ui'
export default {
    findList(params) {
        return HttpClient.get('groupInfo', {params: params}).then(res => {
            if (res.data && res.data.data) {
                return res.data.data;
            } else {
                return {};
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
    saveUpdate(body) {
        return HttpClient.post('groupInfo/saveOrUpdateGroupInfo', body).then(res => {
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
    controlLight(body) {
        return HttpClient.post('groupControl/batchLightGroupController', body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlLoop(body) {
        return HttpClient.post('groupControl/batchLoopGroupController', body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    findLights(params) {
        return HttpClient.get('groupControl/findLightDeviceInfoList', {params: params}).then(res => {
            if (res.data && res.data.data) {
                return res.data.data;
            } else {
                return {};
            }
        })
    },
    findLoops(params) {
        return HttpClient.get('groupControl/findLoopDeviceInfoList', {params: params}).then(res => {
            if (res.data && res.data.data) {
                return res.data.data;
            } else {
                return {};
            }
        })
    },
    updateLightDevices(body){
        return HttpClient.post('groupControl/updateLightDeviceGroup', body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    updateLoopDevices(body){
        return HttpClient.post('groupControl/updateLoopDeviceGroup', body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    findGroupedList(params) {
        return HttpClient.get('groupInfo/getDeviceGroupedList', {params: params}).then(res => {
            if (res.data && res.data.data) {
                return res.data.data;
            } else {
                return {};
            }
        })
    },
    findNoGroupedList(params) {
        return HttpClient.get('groupInfo/getDeviceNoGroupedList', {params: params}).then(res => {
            if (res.data && res.data.data) {
                return res.data.data;
            } else {
                return {};
            }
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
