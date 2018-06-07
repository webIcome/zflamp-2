/**
 * Created by spring on 2018/4/8.
 */
import Config from '../config'
import axios from 'axios'
import {Loading, Message} from 'element-ui'
import router from '../router';
import Storage from '../store/user';
let loading
let pending = []
let cancelToken = axios.CancelToken
let removePending = config => {
    for(let p in pending){
        if(pending[p].u === config.url + '&' + config.method + '&' + JSON.stringify(config.params)) { //当当前请求在数组中存在时执行函数体
            pending[p].f(); //执行取消操作
            pending.splice(p, 1); //把这条记录从数组中移除
        }
    }
}
axios.defaults.baseURL = Config.LAMP_URL_API;

axios.interceptors.request.use(function (config) {
    removePending(config);
    config.cancelToken = new cancelToken((c)=>{
        // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
        pending.push({ u: config.url + '&' + config.method + '&' + JSON.stringify(config.params), f: c });
    });
    config.headers = getHeaders(Storage.state);
    // loading = Loading.service({fullscreen: true, body: true});
    return config
}, function (error) {
    return Promise.reject(error)
});

axios.interceptors.response.use(function (res) {
    removePending(res.config);
    // loading.close();
    showMessage(res);
    return res
}, function (error) {
    console.log(error)
    // loading.close();
    if (!(error instanceof axios.Cancel)) {
        waringMessage('服务器网络问题，请联系管理员')
        return Promise.reject(error)
    }
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
            waringMessage(res.data.errorMap || res.data.msg);
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
    throw new Error();
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
