/**
 * Created by spring on 2018/5/11.
 */

import HttpClient from 'axios'
import {Message} from 'element-ui'
import Config from "../config";
const option = {baseURL: Config.WELL_URL_API};
export default {
    findList(params) {
        return HttpClient.get('wellLid/findPage', Object.assign({params: params},option)).then(res => {
            if (res.data && res.data.data) {
                return res.data.data;
            } else {
                return {};
            }
        })
    },
    getList(params) {
        return HttpClient.get('wellLid/findList', Object.assign({params: params},option)).then(res => {
            return res.data.data;
        })
    },
    getDetail(id) {
        return HttpClient.get('wellLid/findInfoByDeviceId/' + id, option).then(res => {
            return res.data.data;
        })
    },
    operate(body) {
        return HttpClient.post('wellLid/saveOrUpdate', body,option).then(res => {
            showSuccess(res);
            return res;
        })
    },
    deleteDevice(ids) {
        return HttpClient.post('wellLid/removeBatchByDeviceIds','', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchStatus(ids) {
        return HttpClient.post('wellLid/batchSearchStatusByDeviceIds','', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlAdjust(ids) {
        return HttpClient.post('wellLid/batchAdjustByDeviceIds','', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSetThreshold(body) {
        return HttpClient.post('wellLid/batchSetThresholdByDeviceIds', '', Object.assign({params: body},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    pigeonhole(ids) {
        return HttpClient.post('wellLid/batchToNormalByDeviceIds','', Object.assign({params: {deviceIds: ids}},option)).then(res => {
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
