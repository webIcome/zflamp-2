/**
 * Created by spring on 2018/6/7.
 */
import Config from "../../../config";
export default {
    data() {
        return {
            detail: {},
            REFRESH_TIMES: Config.REFRESH_TIMES,
            TIMER: ''
        }
    },
    props: {
        id: '',
        moduleType: {
            default: function () {
                return {}
            }
        }
    },
    created() {
        this.getDetail();
    },
    methods: {
        getDetail() {
            this.service.getDetail(this.id).then(detail => {
                this.detail = detail;
                this.updateMarker();
            });
        },
        updateMarker() {
            this.$emit('updateMarker', this.transformData(this.detail))
        },
        transformData(data) {
            return {
                lng: data.longitude,
                lat: data.latitude,
                id: data.deviceId,
                moduletype: this.type,
                sn: data.sn,
                status: data.status,
                deviceName: data.deviceName,
                statusName: data.statusName
            }
        },
        hide() {
            this.$emit('hide');
        },
        resetTimes() {
            this.REFRESH_TIMES = Config.REFRESH_TIMES;
            clearTimeout(this.TIMER);
            this.refreshDetail();
        },
        refreshDetail() {
            setTimeout(() => {
                if (this.REFRESH_TIMES) {
                    this.REFRESH_TIMES --;
                    this.getDetail()
                    this.refreshDetail();
                }
            }, Config.REFRESH_INTERVAL)
        },
        controlStatus() {
            this.service.controlSearchStatus(this.detail.deviceId).then(res => {
                this.resetTimes();
            })
        },
    },
    watch: {
        id: function (newVal) {
            this.getDetail();
        }
    }
}