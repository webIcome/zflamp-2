/**
 * Created by spring on 2018/2/2.
 */
import HttpClient from 'axios';
import Config from "../config";
class GlobalCache {
    constructor() {
        this._companies;
    }

    get companies() {
        if (!this._companies) {
            this._companies = HttpClient.get('company/getTreeInfo', {baseURL: Config.URL_API}).then(res => {
                if (!res.data.data) {
                    this._companies = null;
                } else {
                    return res.data.data.companies;
                }
            })
        }
        return this._companies;
    }
}

export default {
    install(Vue, pluginOptions = {}) {
        let $globalCache = new GlobalCache();
        Vue.GlobalCache = Vue.prototype.$globalCache = $globalCache
    }
}