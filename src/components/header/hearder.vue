<template>
  <div class="header clearfix">
    <div class="pull-left">
      <div class="logo"></div>
      <div @click="goToHome" class="go-home"><i class="home-icon"></i>返回主页</div>
      <div @click="goToOperation" class="operation-center"><i class="icon"></i>进入营运中心</div>
    </div>
    <div class="personal">
      <!--<span class="personal-describe"><img :src="user.url" width="40" height="40" class="img-circle"> </span>-->
      <el-dropdown trigger="click" @command="handelPersonal">
        <span class="el-dropdown-link">{{user.username}}<i class="personal-center-icon"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="cp">修改密码</el-dropdown-item>
          <!--<el-dropdown-item style="color: #ff5151;" command="logout">退出登录</el-dropdown-item>-->
        </el-dropdown-menu>
      </el-dropdown>
      <div @click="logout" title="退出登入" class="logout"></div>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" center :width="'600px'"
               @close="clearValidate('controlDevice')">
      <el-form label-width="140px" :model="password" ref="controlDevice" :rules="Rules" class="el-form-default">
        <el-form-item label="当前密码：" prop="oldpwd">
          <el-input type="password" v-model.trim="password.oldpwd" placeholder="请输入当前密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newpwd">
          <el-input type="password" v-model.trim="password.newpwd" placeholder="请输入当前密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码：" prop="secondNew">
          <el-input type="password" v-model.trim="password.secondNew" placeholder="请输入当前密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changePassword('controlDevice')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import Config from "../../config";
    import Storage from '../../store/user';
    export default {
        name: 'headerComponent',
        data () {
            return {
                dialogVisible: false,
                user: {},
                password: {
                    oldpwd: '',
                    newpwd: '',
                    secondNew: ''
                },
                Rules: {
                    oldpwd: [
                        {required: true, message: '请输入旧密码'},
                    ],
                    newpwd: [
                        {required: true, message: '请输入新密码'},
                    ],
                    secondNew: [
                        {required: true, message: '请确认新密码'},
                    ],
                }
            }
        },
        props: {
            isHome: {
                type: Boolean,
                default: false,
            }
        },
        created () {
            this.user = Storage.state.user;
        },
        methods: {
            handelPersonal(command) {
                if (command == 'cp') {
                    this.dialogChangePassword();
                } else if (command == 'logout') {
                    this.logout();
                }
            },
            goToLogin: function () {
                this.$router.push({path: '/login'})
            },
            goToHome: function () {
//                window.location.replace(Config.HOME_PAGE_URL)
                this.$router.push({path: '/'})
            },
            goToOperation: function () {
                this.$router.push({path: '/operation'})
            },
            changePassword: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (this.password.newpwd != this.password.secondNew) {
                            return;
                        }
                        this.$http.post('user/changePassword', this.password, {baseURL: Config.URL_API}).then(res => {
                            if (res.data.code != 0) {

                            } else {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                this.dialogVisible = false;
                                this.goToLogin()
                            }
                        })
                    }
                })
            },
            dialogChangePassword: function () {
                this.password = {
                    oldpwd: '',
                    newpwd: '',
                    secondNew: ''
                };
                this.dialogVisible = true
            },
            logout: function () {
                this.$http.get('accounts/logout', {baseURL: Config.URL_API}).then(res => {
                    this.goToLogin();
                })
            },
            clearValidate: function (formName) {
                this.$refs[formName].clearValidate();
            }
        },
        mounted: function () {
        }
    }
</script>

<style scoped lang="less">
  @color: #8FABD2;
  .header {
    height: 100px;
    line-height: 100px;
    background-color: #152F52;
    color: @color;
    font-size: 18px;
    .pull-left {
      width: 40%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .logo {
        width: 193px;
        height: 64px;
        background: url("./imgs/logo-new.png") no-repeat center;
        background-size: contain;
      }
      .go-home {
        cursor: pointer;
        display: flex;
        align-items: center;
        &:hover {
          color: #fff;
        }
        .home-icon {
          margin-right: 17px;
          display: inline-block;
          width: 24px;
          height: 24px;
          background: url("./imgs/home.png") no-repeat;
          background-size: contain;
        }
      }
      .operation-center {
        cursor: pointer;
        display: flex;
        align-items: center;
        &:hover {
          color: #fff;
        }
        .icon {
          display: inline-block;
          width: 24px;
          height: 24px;
          margin-right: 15px;
          background: url("./imgs/operation-center.png") no-repeat;
          background-size: contain;
        }
      }
    }
    .personal {
      display: flex;
      justify-content: space-around;
      align-items: center;
      float: right;
      width: 265px;
      height: 100%;
      .personal-describe {
        color: #fff;
        letter-spacing: 2px;
      }
      .el-dropdown {
        height: 23px;
        line-height: 23px;
        text-align: center;
        color: #51b0f8;
        cursor: pointer;
        font-size: 18px;
        .el-dropdown-link {
          display: flex;
          align-items: center;
          color: #fff;
          .personal-center-icon {
            margin-left: 6px;
            width: 12px;
            height: 6px;
            background-image: url("./imgs/personal-center-icon.png");
            background-size: contain;
          }
        }
        &:hover {
          color: #a8ecfe;
          .personal-center-icon {
          }
        }
      }
      .logout {
        cursor: pointer;
        width: 25px;
        height: 25px;
        background: url("./imgs/logout.png") no-repeat;
        background-size: contain;
        &:hover {

        }
      }
    }
    .dropdown-menu {
      width: 91px;
      min-width: 91px;
      height: 80px;
      min-height: 81px;
      left: 50%;
      margin-left: -45.5px;
      padding: 0 !important;
      text-align: center;
      .change-password {
        a {
          color: #4395d7
        }
      ;
        border-bottom: 1px solid #ddd;
      }
      a {
        color: #ff5151;
        padding: 0 !important;
        height: 39px;
        line-height: 39px;
        border-radius: 4px;
      }
    }
  }
</style>
