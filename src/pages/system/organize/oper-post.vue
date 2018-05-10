<template>
  <div style="margin-right: 25px;">
    <el-button :disabled="!post.objectid" v-if="edit" @click="showModal" class="default-btn">修改</el-button>
    <el-button v-else @click="showModal" class="default-btn">添加</el-button>
    <el-dialog :title="title" :visible.sync="visible" center :width="'400px'">
      <el-form label-width="120px" :model="data" :rules="Rules" :ref="ref" class="el-form-default"
               :validate-on-rule-change="false">
        <el-form-item label="岗位名称：" prop="postname">
          <el-input v-model.trim="data.postname" placeholder="请输入岗位名称"></el-input>
        </el-form-item>
        <el-form-item label="岗位描述：" prop="description">
          <el-input v-model.trim="data.description" placeholder="请输入岗位描述"></el-input>
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
        name: 'operPostComponent',
        data() {
            return {
                visible: false,
                data: {},
                ref: 'edit',
                companies: [],
                Rules: {
                    postname: [
                        {required: true, message: '请输入岗位名称'}
                    ],
                    description: [
                        {required: true, message: '请输入岗位描述'}
                    ],
                }
            }
        },
        props: {
            post: {
                default: {}
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
                    return '编辑岗位';
                } else {
                    return '创建岗位'
                }
            },
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
                        this.data.postid = this.post.objectid
                        Service.addPost(this.data).then(res => {
                            this.emitAddEvent();
                            this.hideModal();
                        });
                    }
                })
            },
            editDevice() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        Service.editPost(this.data).then(res => {
                            this.emitEditEvent();
                            this.hideModal();
                        });
                    }
                })
            },
            getDetail() {
                this.data = this.post;
            },
            clearValidate() {
                if (this.$refs[this.ref]) this.$refs[this.ref].clearValidate();
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