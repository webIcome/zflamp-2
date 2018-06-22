/**
 * Created by spring on 2018/5/21.
 */

import HttpClient from 'axios'
import {Message} from 'element-ui'
import Config from "../config";
const option = {baseURL: Config.LAMP_URL_API};
export default {
    getPowerStatistics(type) {
        return HttpClient.get('dataCenter/findElectricityStatistical', {params: {type: type}}).then(res => {
            return res.data.data;
        })
    },
    getLightStatistics(type) {
        return HttpClient.get('dataCenter/findLightFaultStatistic', {params: {type: type}}).then(res => {
            return res.data.data;
        })
    },
    getApLineRate() {
        return HttpClient.get('dataCenter/findApLineRate', option).then(res => {
            return res.data.data;
        })
    },
    getLightLineRate() {
        return HttpClient.get('dataCenter/findLightLineRate', option).then(res => {
            return res.data.data;
        })
    },
    getLightRate() {
        return HttpClient.get('dataCenter/findLightRate', option).then(res => {
            return res.data.data;
        })
    },
    getFaultRate() {
        return HttpClient.get('dataCenter/findLightFaultRate', option).then(res => {
            return res.data.data;
        })
    },
    getWellLineRate() {
        return HttpClient.get('dataCenter/findTerminalLineRate', {baseURL: Config.WELL_URL_API}).then(res => {
            return res.data.data;
        })
    },
    getAlarm() {
        return HttpClient.get('dataCenter/findLightAlarmRecordList', option).then(res => {
            return res.data.data;
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
