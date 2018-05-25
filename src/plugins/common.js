/**
 * Created by spring on 2018/4/8.
 */
class Common {
    static copyObj(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    static getLabel(value, arr) {
        let label = value;
        arr.forEach(item => {
            if(item.value == value) {
                label = item.text;
            }
        })
        return label;
    }
}
export default {
    install(Vue, pluginOptions = {}) {
        let $common = Common;
        Vue.Common = Vue.prototype.$common = $common
    }
}
