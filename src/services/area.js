/**
 * Created by spring on 2018/5/7.
 */
import HttpClient from 'axios'
import {Message} from 'element-ui'
export default {
    findList(params) {
        return HttpClient.get('ap', {params: params}).then(res => {
            if (!res.data && !res.data.data) {
                return {};
            } else {
                return res.data.data;
            }
        })
    },
    getDetail(id) {
        return HttpClient.get('ap/' + id).then(res => {
            return res.data.data;
        })
    },
    add(body) {
        return HttpClient.post('ap', body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    edit(id, body) {
        return HttpClient.patch('ap/' + id, body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    deleteDevice(id) {
        return HttpClient.delete('ap/' + id).then(res => {
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
