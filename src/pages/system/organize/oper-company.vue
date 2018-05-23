<template>
  <div style="margin-right: 25px;">
    <el-button :disabled="!company.objectid" v-if="edit" @click="showModal" class="default-btn">修改</el-button>
    <el-button v-else @click="showModal" class="default-btn">添加</el-button>
    <el-dialog :title="title" :visible.sync="visible" center :width="'500px'">
      <el-form label-width="120px" :model="data" :rules="Rules" :ref="ref" class="el-form-default" :validate-on-rule-change="false">
        <el-form-item label="项目名称：" prop="companyname">
          <el-input :span="12" v-model.trim="data.companyname" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="归属项目：" prop="parentid">
          <tree-select-component v-model="data.parentid" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="状态：" prop="lightControllerType">
          <el-select v-model="data.flag" placeholder="选择状态" clearable style="width: 100%;">
            <el-option v-for="type in companyFlag" :value="type.value" :key="type.value"
                       :label="type.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地理位置：" prop="position">
          <select-position v-model="data.position"></select-position>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="edit" type="primary" @click="editDevice">确 定</el-button>
        <el-button v-else type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import Service from '../../../services/system'
    import CommonConstant from "../../../constants/common";
    export default {
        name: 'operCompanyComponent',
        data() {
            return {
                visible: false,
                data: {},
                ref: 'edit',
                companies:[],
                companyFlag: CommonConstant.companyFlag,
                Rules: {
                    companyname: [
                        {required: true, message: '项目名称'}
                    ],
                    parentid: [
                        {required: true, message: '归属项目'}
                    ],
                }
            }
        },
        props: {
            company: {
                default: function () {
                    return {}
                }
            },
            edit: {
                default: false
            }
        },
        created() {
            this.initData();
            this.initCompanies();
        },
        computed: {
            title: function () {
                if (this.edit) {
                    return '编辑项目';
                } else {
                    return '创建项目'
                }
            },
         /*   Rules: function () {
                let rules = {
                    companyname: [
                        {required: true, message: '项目名称'}
                    ],
                }
                if (!this.edit) {
                    rules.parentid = [
                        {required: true, message: '归属项目'}
                    ]
                }
                return rules
            }*/
        },
        methods: {
            initData() {
            },
            initCompanies() {
                this.$globalCache.companies.then(companies => {
                    this.companies = companies;
                })
            },
            add() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        Service.addCompany(this.getTransformDataToSend(this.data)).then(res => {
                            this.emitEvent();
                            this.hideModal();
                        });
                    }
                })
            },
            editDevice() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        Service.editCompany(this.getTransformDataToSend(this.data)).then(res => {
                            this.emitEvent();
                            this.hideModal();
                        });
                    }
                })
            },
            getTransformDataToSend(data) {
                data = this.$common.copyObj(data);
                let position = data.position;
                delete data.position;
                data = Object.assign(data, position)
                data.longitude = data.lng;
                data.latitude = data.lat;
                data.address = data.position;
                delete data.position;
                delete data.lng;
                delete data.lat;
                return data;
            },
            getTransformDataToUse(data) {
                data.position = this.getPosition(data);
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
            getDetail() {
                Service.getCompanyDetail(this.company.objectid).then(data => {
                    this.data = this.getTransformDataToUse(data);
                })
            },
            clearValidate() {
                if (this.$refs[this.ref]) this.$refs[this.ref].clearValidate();
            },
            emitEvent() {
                this.$globalCache.refleshCompanies().then(companies => {
                    this.companies = companies;
                });
                this.$emit('initPaging')
            },
            showModal() {
                this.visible = true;
            },
            hideModal() {
                this.visible = false;
            }
        },
        watch: {
            visible: function (newValue, oldValue) {
                if (newValue) {
                    if (this.edit) this.getDetail();
                    this.clearValidate();
                } else {
                    this.data = {}
                }
            }
        }
    }
</script>