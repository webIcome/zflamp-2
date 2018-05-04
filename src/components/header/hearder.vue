<template>
  <div class="header clearfix">
    <div class="personal">
      <span class="personal-describe">您好，{{user.username}}</span>
      <el-dropdown trigger="click" @command="handelPersonal">
        <span class="el-dropdown-link"><i class="personal-center-icon"></i>个人中心
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="cp">修改密码</el-dropdown-item>
          <el-dropdown-item style="color: #ff5151;" command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div @click="goToHome" v-if="!isHome" class="go-home"><i class="home-icon"></i>返回主页
      </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" center :width="'600px'" @close="clearValidate('controlDevice')">
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
        window.location.replace(Config.HOME_PAGE_URL)
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
  .header {
    height: 80px;
    background-color: #071627;
    font-size: 16px;
    .personal {
      float:right;
      margin-top: 30px;
      margin-right: 80px;
      .personal-describe {
        margin-right: 20px;
        color: #fff;
        letter-spacing: 2px;
      }
      .el-dropdown {
        height: 23px;
        line-height: 23px;
        margin-right: 20px;
        text-align: center;
        color: #51b0f8;
        cursor: pointer;
        font-size: 16px;
        &:hover {
          color: #a8ecfe;
          .personal-center-icon {
            background-image: url("./imgs/personal-center-icon-active.png");
          }
        }
        .personal-center-icon {
          margin-right: 8px;
          display: inline-block;
          width: 14px;
          height: 16px;
          vertical-align: text-bottom;
          background-image: url("./imgs/personal-center-icon.png");
        }
      }
      .go-home {
        display: inline-block;
        color: #51b0f8;
        cursor: pointer;
        &:hover {
          color: #a8ecfe;
          .home-icon {
            background-image: url("./imgs/home-icon-active.png");
          }
        }
        .home-icon {
          margin-right: 8px;
          display: inline-block;
          width: 18px;
          height: 16px;
          vertical-align: text-bottom;
          background-image: url("./imgs/home-icon.png");
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
        };
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
