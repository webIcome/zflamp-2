/**
 * Created by spring on 2018/5/4.
 */
import HttpClient from 'axios'
import {Message} from 'element-ui'
export default {
    findList(params) {
        return HttpClient.get('loopController', {params: params}).then(res => {
            if (res.data && res.data.data) {
                return res.data.data;
            } else {
                return {};
            }
        })
    },
    getDetail(id) {
        return HttpClient.get('loopController/' + id).then(res => {
            return res.data.data;
        })
    },
    add(body) {
        return HttpClient.post('loopController', body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    edit(id, body) {
        return HttpClient.patch('loopController/' + id, body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    deleteDevice(id) {
        return HttpClient.delete('loopController/' + id).then(res => {
            showSuccess(res);
            return res;
        })
    },
    control(id, body) {
        return HttpClient.post('singleControl/loopController/' + id, body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlLoops(body) {
        return HttpClient.post('singleControl/batchLoopController', body).then(res => {
            showSuccess(res);
            return res;
        })
    },
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
