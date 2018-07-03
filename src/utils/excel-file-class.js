/**
 * Created by spring on 2018/7/3.
 */
import HttpClient from 'axios'
export default {
    getExcel(url, name){
        if (!name) {
            name = Date.parse(new Date());
        }
        return HttpClient.get(url, {responseType: 'blob'}).then(res => {
            return new Blob([res.data],{type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
        }).then(blob => {
            let urlObject = window.URL || window.webkitURL || window;
            let save_link = document.createElement("a");
            save_link.href = urlObject.createObjectURL(blob);
            save_link.download = name + '.xls';
            _fakeClick(save_link);
        })
    },
}

function _fakeClick(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
        "click", true, false, window, 0, 0, 0, 0, 0
        , false, false, false, false, 0, null
    );
    obj.dispatchEvent(ev);
}