<template>
  <div class="oper-component">
    <div v-if="edit" class="icon-item"><span class="edit-icon" @click="showModal">编辑</span></div>
    <div v-else class="add-btn" @click="showModal"><span class="add-icon default-icon"></span>创建</div>
    <el-dialog :title="title" :visible.sync="visible" center :width="'600px'">
      <el-form label-width="140px" :model="data" :rules="Rules" :ref="ref" class="el-form-default">
        <el-form-item label="归属项目：" prop="companyid">
          <tree-select-component v-model="data.companyid" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="归属岗位：" prop="postid">
          <el-select v-model="data.postid" placeholder="请选择岗位" style="width: 100%">
            <template v-for="post in posts">
              <el-option :key="post.objectid" :value="post.objectid" :label="post.postname"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="登录名：" prop="loginname">
          <el-input v-model.trim="data.loginname" placeholder="请输入登录名"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="username">
          <el-input v-model.trim="data.username" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱：" prop="email">
          <el-input :span="12" v-model.trim="data.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="有效期至：" prop="expiretime">
          <el-date-picker v-model="data.expiretime" type="datetime" placeholder="选择日期" value-format="timestamp"
                          :picker-options="endTimeOptions" class="display-block"></el-date-picker>
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
    import Storage from '../../../store/user';
    import moment from 'moment'
    export default {
        name: 'operUserComponent',
        data() {
            return {
                visible: false,
                data: {
                    postid: '',
                    expiretime: new Date(Storage.state.expiretime)
                },
                ref: 'edit',
                posts: [],
                Rules: {
                    companyid: [
                        {required: true, message: '请选择企业'}
                    ],
                    postid: [
                        {required: true, message: '请选择岗位'}
                    ],
                    loginname: [
                        {required: true, message: '请填写登入名'}
                    ],
                    username: [
                        {required: true, message: '请填写姓名'}
                    ],
                    email: [
                        {required: true, message: '请填写邮箱'},
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
                    ],
                    expiretime: [
                        {required: true, message: '请选择有效期'}
                    ]
                }
            }
        },
        props: {
            user: {
                default: function () {
                    return {}
                }
            },
            edit: {
                default: false
            },
            companies: {
                default: function () {
                    return []
                }
            }
        },
        created() {
            this.initData();
        },
        computed: {
            title: function () {
                if (this.edit) {
                    return '编辑账号';
                } else {
                    return '创建账号'
                }
            },
            endTimeOptions() {
                let date = new Date();
                return {
                    disabledDate(time) {
                        return time <= date || time > moment(Storage.state.expiretime, 'YYYY-MM-DD HH:mm:ss');
                    }
                }
            }
        },
        methods: {
            initData() {
            },
            add() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        Service.addUser(this.data).then(res => {
                            this.emitAddEvent();
                            this.hideModal();
                        });
                    }
                })
            },
            editDevice() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        Service.editUser(this.data).then(res => {
                            this.emitEditEvent();
                            this.hideModal();
                        });
                    }
                })
            },
            getPosts(id) {
                Service.getPosts(id).then(list => {
                    this.posts = list;
                })
            },
            getDetail() {
                this.data = this.user;
//                this.data.expiretime = new Date(this.data.expiretime)
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
                    this.data = {
                        postid: '',
                        expiretime: new Date(Storage.state.expiretime)
                    }
                }
            },
            ['data.companyid']: function (newVal, oldVal) {
                if (oldVal) {
                    this.data.postid = null;
                    this.posts = [];
                }
                if (!newVal) return;
                this.getPosts(newVal)
            },
        }
    }
</script>