/**
 * Created by spring on 2018/5/7.
 */
import HttpClient from 'axios'
import {Message} from 'element-ui'
export default {
    findList(params) {
        return HttpClient.get('task/findTaskInfoPage', {params: params}).then(res => {
            if (res.data && res.data.data) {
                return res.data.data;
            } else {
                return {};
            }
        })
    },
    getDetail(id) {
        return HttpClient.get('task/findTaskInfoById/' + id).then(res => {
            return res.data.data;
        })
    },
    add(body) {
        return HttpClient.post('task/saveOrUpdateTaskInfo', body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    edit(body) {
        return HttpClient.post('task/saveOrUpdateTaskInfo', body).then(res => {
            showSuccess(res);
            return res;
        })
    },

    deleteDevice(id) {
        return HttpClient.put('task/removeTaskInfoById/' + id).then(res => {
            showSuccess(res);
            return res;
        })
    },
    deleteDevices(ids) {
        return HttpClient.put('task/removeTaskInfoByIds', {params: {ids: ids}}).then(res => {
            showSuccess(res);
            return res;
        })
    },
    getSelectedList(params) {
        return HttpClient.get('singleControl/selectedTimedtask', {params: params}).then(res => {
            if (res.data && res.data.data) {
                return res.data.data;
            } else {
                return {list: []}
            }
        })
    },
    getUnSelectedList(params) {
        return HttpClient.get('singleControl/unselectedTimedtask', {params: params}).then(res => {
            if (res.data && res.data.data) {
                return res.data.data;
            } else {
                return {list: []}
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
