/**
 * Created by spring on 2018/4/8.
 */
import Config from '../config'
import axios from 'axios'
import {Loading, Message} from 'element-ui'
import router from '../router';
import Storage from '../store/user';
let loading;
axios.defaults.baseURL = Config.LAMP_URL_API;

axios.interceptors.request.use(function (config) {
    config.headers = getHeaders(Storage.state);
    loading = Loading.service({fullscreen: true, body: true});
    return config
}, function (error) {
    return Promise.reject(error)
});

axios.interceptors.response.use(function (res) {
    loading.close();
    showMessage(res);
    return res
}, function (error) {
    console.log(error)
    loading.close();
    waringMessage('服务器网络问题，请联系管理员')
    return Promise.reject(error)
});
export default {
    install: function (Vue, Option) {
        Object.defineProperty(Vue.prototype, '$http', {value: axios})
    }
};

function getHeaders(storage) {
    let headers = {};
    if (storage.user.objectid) {
        headers['access_token'] = storage.token;
        headers['user_name'] = storage.user.loginname;
        headers['user_id'] = storage.user.objectid.toString();
        headers['company_id'] = storage.user.companyid.toString();
        return headers;
    }
}

function showMessage(res) {
    switch (res.data.code) {
        case 3:
        case 401:
        case 410:
            gotoLogin();
            break;
        case 10001:
        case 422:
            waringMessage(res.data.errorMap);
            break;
        case 10002:
            waringMessage(res.data.msg);
            break;
        case 20000:
            waringMessage('系统内部错误');
            break;
        case 500:
            waringMessage('服务器500错误');
            break;
    }
}

function gotoLogin() {
    router.push({path: '/login'})
}

function waringMessage(msg, time) {
    time = time ? time : 1500;
    Message({
        message: msg,
        type: 'warning',
        duration: time
    })
    throw new Error()
}
