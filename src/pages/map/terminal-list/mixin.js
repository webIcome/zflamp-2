/**
 * Created by spring on 2018/6/13.
 */
export default {
    data() {
        return {
            active: false,
            list: [],
            service: '',
            type: ''
        }
    },
    props: {
        moduleType: {
            default: function () {
                return {}
            }
        },
        companyid: '',
        isListShow: false,
        currentList: {
            default:function () {
                return []
            }
        }
    },
    created() {
        this.getList();
    },
    computed: {
        faultList: function () {
            return this.getErrList(this.list)
        },
    },
    methods: {
        getErrList(list) {
            return list.filter(item => {
                if (item.status != 0) {
                    return true;
                } else {
                    return false
                }
            }).map(item => {
                return {
                    deviceName: item.deviceName,
                    sn: item.sn,
                    statusName: item.statusName
                }
            })
        },
        getList() {
            if (this.active) {
                this.active = false;
                if (this.isListShow && this.currentList == this.faultList) {
                    this.hidden();
                }
                this.list = [];
            } else {
                this.service.getList({compIds: this.companyid}).then(list => {
                    this.list = this.transformList(list, this.type);
                    this.active = true;
                })
            }
        },
        showList(list) {
            if (this.isListShow && this.currentList == list) {
                this.hidden();
                return
            }
            this.$emit('show', list)
        },
        hidden() {
            this.$emit('hidden')
        },
        updateList() {
            this.$emit('updateList', this.list)
        },
        transformList(list, moduletype) {
            return list.map(item => {
                if ((item.longitude && item.latitude) || (item.longitude == 0 || item.longitude == 0)) {
                    return {
                        lng: item.longitude,
                        lat: item.latitude,
                        id: item.deviceId,
                        moduletype: moduletype,
                        sn: item.sn,
                        status: item.status,
                        deviceName: item.deviceName,
                        statusName: item.statusName
                    };
                }
            }).filter(item => {
                if (item) {
                    return true;
                } else {
                    return false;
                }
            })
        },
    },
    watch: {
        companyid(newVal, oldVal) {
            this.getList();
        },
        list(newVal) {
            this.updateList()
        },
        active(newVal) {
            this.$emit('active', {type: this.type, active: newVal})
        }
    }
}