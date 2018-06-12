/**
 * Created by spring on 2018/6/5.
 */
import HttpClient from 'axios'
import {Message} from 'element-ui'
import Config from "../config";
const option = {baseURL: Config.WELL_URL_API};
export default {
    findList(params) {
        return HttpClient.get('wellcover/findWellCoverPage', Object.assign({params: params},option)).then(res => {
            if (res.data && res.data.data) {
                return res.data.data;
            } else {
                return {};
            }
        })
    },
    getList(params) {
        return HttpClient.get('wellcover/findWellCoverList', Object.assign({params: params},option)).then(res => {
            return res.data.data;
        })
    },
    getDetail(id) {
        return HttpClient.get('wellcover/findWellCoverInfoById/' + id, option).then(res => {
            return res.data.data;
        })
    },
    operate(body) {
        return HttpClient.post('wellcover/saveOrUpdateTaskInfo', body,option).then(res => {
            showSuccess(res);
            return res;
        })
    },
    deleteDevice(ids) {
        return HttpClient.post('wellcover/removeBatchWellCoverInfoByIds','', Object.assign({params: {ids: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchStatus(ids) {
        return HttpClient.post('wellcover/batchOperateWellCoverInfoByDeviceIds', {deviceIds: ids}, option).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchDoorStatus(ids) {
        return HttpClient.post('wellcover/batchOperateWellCoverInfoByDeviceIds', {deviceIds: ids}, option).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSetAlarmValue(params) {
        return HttpClient.post('wellcover/batchOperateWellCoverInfoByDeviceIds','', Object.assign({params: params},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    pigeonhole(ids) {
        return HttpClient.post('wellcover/batchToNormalWellCoverInfoByIds', {ids: ids}, option).then(res => {
            showSuccess(res);
            return res;
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
