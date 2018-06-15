/**
 * Created by spring on 2018/6/14.
 */
export default {
    data() {
        return {
            ref: 'edit',
            visible: false,
            data: {},
        }
    },
    props: {
        companies: {
            default: []
        },
        id: {
            default: ''
        },
        edit: {
            default: false
        }
    },
    computed: {
        title: function () {
            if (this.edit) {
                return '编辑';
            } else {
                return '创建'
            }
        },
        Rules: function () {
            let rules = {
                deviceName: [
                    {required: true, message: '请输入名称'}
                ],
                compId: [
                    {required: true, message: '请选择企业'}
                ],
                sn: [
                    {required: true, message: '请输入设备ID', trigger: 'blur'},
                    {pattern: /^[0-9A-Fa-f]{8}$/, message: 'ID必须为8位16进制字符'}
                ],
            };
            if (this.deviceModel) {
                rules.deviceModel = [
                    {required: true, message: '请选择设备型号'}
                ]
            }
            return rules
        }
    },
    methods: {
        operate() {
            this.$refs[this.ref].validate(valid => {
                if (valid) {
                    this.service.operate(this.getTransformDataToSend(this.data)).then(res => {
                        this.emitEvent();
                        this.hideModal();
                    });
                }
            })
        },
        getDetail() {
            this.service.getDetail(this.id).then(data => {
                this.data = this.getTransformDataToUse(data);
            })
        },
        getTransformDataToSend(data) {
            data = this.$common.copyObj(data);
            let position = data.address;
            delete data.address;
            data = Object.assign(data, position)
            data.address = data.position;
            delete data.position;
            data.longitude = data.lng;
            data.latitude = data.lat;
            delete data.lng;
            delete data.lat;
            return data;
        },
        getTransformDataToUse(data) {
            data.address = this.getPosition(data);
            return data;
        },
        getPosition(position){
            return {
                position: position.address,
                lng: position.longitude,
                lat: position.latitude,
                province: position.province,
                city: position.city,
                district: position.district
            };
        },
        clearValidate() {
            if (this.$refs[this.ref]) this.$refs[this.ref].clearValidate();
        },
        emitEvent() {
            if (this.edit) {
                this.emitEditEvent()
            } else {
                this.emitAddEvent();
            }
        },
        emitAddEvent() {
            this.$emit('initPaging')
        },
        emitEditEvent() {
            this.$emit('initCurrentPaging')
        },
        showModal() {
            this.visible = true;
        },
        hideModal() {
            this.visible = false;
        },
        resetData() {
            this.data = {}
        }
    },
    watch: {
        visible: function (newValue, oldValue) {
            if (newValue) {
                if (this.edit) this.getDetail();
                this.clearValidate();
            } else {
                this.resetData()
            }
        }
    }
}