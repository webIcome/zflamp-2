/**
 * Created by spring on 2018/5/4.
 */

import HttpClient from 'axios'
import Config from "../config";
export default {
    getMenus(appid) {
        return HttpClient.get('permission/getNewModuleListByUserid', {params: {appid: appid},baseURL: Config.URL_API}).then(res => {
            if (res.data && res.data.data) {
                return res.data.data.result;
            } else {
                return [];
            }
        })
    }
}
