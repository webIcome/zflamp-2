/**
 * Created by spring on 2018/4/8.
 */
class Common {
    static copyObj(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
}
export default {
    install(Vue, pluginOptions = {}) {
        let $common = Common;
        Vue.Common = Vue.prototype.$common = $common
    }
}
