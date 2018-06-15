/**
 * Created by spring on 2018/6/7.
 */
export default {
    data() {
        return {
            detail: {}
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
    }
}