/**
 * Created by spring on 2018/5/11.
 */

import HttpClient from 'axios'
import {Message} from 'element-ui'
import Config from "../config";
const option = {baseURL: Config.WELL_URL_API};
export default {
    findList(params) {
        return HttpClient.get('wellcover/findWellCoverPage', Object.assign({params: params},option)).then(res => {
            if (!res.data && !res.data.data) {
                return {};
            } else {
                return res.data.data;
            }
        })
    },
    getDetail(id) {
        return HttpClient.get('wellcover/findWellCoverInfoById/' + id).then(res => {
            return res.data.data;
        })
    },
    add(body) {
        return HttpClient.post('wellcover/saveOrUpdateTaskInfo', body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    edit(body) {
        return HttpClient.post('wellcover/saveOrUpdateTaskInfo', body).then(res => {
            showSuccess(res);
            return res;
        })
    },
    deleteDevice(ids) {
        return HttpClient.post('wellcover/removeBatchWellCoverInfoByIds', {ids: ids}).then(res => {
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
