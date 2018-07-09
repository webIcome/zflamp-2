/**
 * Created by spring on 2018/7/3.
 */
import HttpClient from 'axios'
export default {
    getExcel(baseUrl, url, name){
        if (!name) {
            name = Date.parse(new Date());
        }
        let config = {responseType: 'blob'};
        if (baseUrl) config.baseURL = baseUrl;
        return HttpClient.get(url, config).then(res => {
            return new Blob([res.data],{type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
        }).then(blob => {
            let urlObject = window.URL || window.webkitURL || window;
            let save_link = document.createElement("a");
            save_link.href = urlObject.createObjectURL(blob);
            save_link.download = name + '.xlsx';
            _fakeClick(save_link);
        })
    },
    uploadExcel(baseUrl, url, data, config={}) {
        if (baseUrl) {
            config = Object.assign({
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                baseURL: baseUrl
            }, config);
        }else {
            config = Object.assign({
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }, config);
        }
        let formData = new FormData();
        let params = {};
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
            if (key != 'file') {
                params[key] = data[key]
            }
        });
        config.params = params;
        return HttpClient.post(url, formData, config).then(res => {
            return res;
        })
    }
}

function _fakeClick(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
        "click", true, false, window, 0, 0, 0, 0, 0
        , false, false, false, false, 0, null
    );
    obj.dispatchEvent(ev);
}