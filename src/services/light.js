/**
 * Created by spring on 2018/5/4.
 */
import HttpClient from 'axios'
import {Message} from 'element-ui'
export default {
    findList(params) {
        return HttpClient.get('lightController', {params: params}).then(res => {
            if (res.data && res.data.data) {
                return res.data.data;
            } else {
                return {};
            }
        })
    },
    getDetail(id) {
        return HttpClient.get('lightController/' + id).then(res => {
            return res.data.data;
        })
    },
    add(body) {
        return HttpClient.post('lightController', body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    edit(id, body) {
        return HttpClient.patch('lightController/' + id, body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    deleteDevice(id) {
        return HttpClient.delete('lightController/' + id).then(res => {
            showSuccess(res);
            return res;
        })
    },
    control(id, body) {
        return HttpClient.post('singleControl/lightController/' + id, body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlLights(body) {
        return HttpClient.post('singleControl/batchLightController', body).then(res => {
            showSuccess(res);
            return res;
        })
    },
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
