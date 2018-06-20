/**
 * Created by spring on 2018/6/20.
 */
export default {
    name: 'setComponent',
    data() {
        return {
            visible: false,
            operData: {},
            ref: 'well-form',
            setItems: [
            ],
        }
    },
    props: {
        deviceIds: {
            default: function () {
                return []
            }
        },
    },
    methods: {
        controlSetDevice() {
            this.$refs[this.ref].validate(valid => {
                if (valid) {
                    let data = this.operData;
                    data.deviceIds = this.deviceIds.join(',');
                    this.getControlFn(this.operData.operateType)(data).then(res => {
                        this.hideModal();
                        this.initPaging();
                    });
                }
            })
        },
        showModal(show) {
            if (!show && this.operData.operateType && this.deviceIds.length) {
                this.visible = true;
            }
        },
        hideModal: function () {
            this.visible = false;
        },
        initPaging() {
            this.$emit('initPaging')
        },
        clearValidate() {
            if (this.$refs[this.ref]) this.$refs[this.ref].clearValidate();
        },
    },
    watch: {
        visible: function (newValue, oldValue) {
            if (newValue) {
                this.clearValidate();
            } else {
                this.operData = {}
            }
        }
    }
}