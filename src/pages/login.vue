<template>
  <div class="login-container">
    <div class="body">
      <el-row justify="space-between" class="center">
        <el-col :span="11">
          <img src="../assets/login/logo.png">
        </el-col>
        <el-col :span="2">
          <img class="parting-line" src="../assets/login/parting-line.png">
        </el-col>
        <el-col :span="11">
          <form class="form-horizontal" @submit.prevent="login">
            <el-row class="form-group">
              <div class="col-md-12">登录/Login</div>
            </el-row>
            <el-row class="form-group">
              <el-col :span="24">
                <input type="text" class="form-control" id="username" name="username" v-model="loginname" placeholder="用户"/>
              </el-col>
            </el-row>
            <el-row class="form-group">
              <el-col :span="24">
                <input :type="showPassword? 'text': 'password'" class="form-control" id="password" name="password" v-model="password" placeholder="密码">
              </el-col>
              <span @click="toggleShowPassword" :class="showPassword? 'show-password':'not-show-password'"></span>
            </el-row>
            <el-row class="form-group">
              <el-col :span="16">
                <input type="text" class="form-control verify-code" id="verifyCode" name="verifyCode" v-model="verifyCode" placeholder="验证码输入">
              </el-col>
              <el-col :span="8">
                <div @click="getVerifyCode" class="verify-code-img" id="code"></div>
              </el-col>
            </el-row>
            <el-row class="form-group">
              <el-col :span="24">
                <el-button @click="login" :disabled="disabled" type="primary" class="btn">登录</el-button>
                <button :disabled="disabled" v-show="false" type="submit"></button>
              </el-col>
            </el-row>
          </form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import User from '../store/user';
  import GVerify from '../utils/g-verify';
  export default {
    name: 'loginPage',
    data(){
      return {
        loginname: '',
        password: '',
        verifyCode: '',
        code: '',
        showPassword: false,
        gVerifyCode: null,
      }
    },
    computed: {
      disabled: function () {
        return !(this.loginname && this.password && this.verifyCode)
      }
    },
    mounted: function () {
      this.gVerifyCode = new GVerify({id: 'code', line: 0});
      this.getVerifyCode();
    },
    methods: {
      login: function () {
        let access = {loginname: this.loginname, password: this.password};
        if (this.verifyCode) access.code = this.verifyCode;
        if (this.code != this.verifyCode) {
          return this.$message({
            message: '验证码错误',
            type: 'warning'
          });
        }
        User.login(access).then((user) => {
          this.$router.push('/')
        }).catch(err => {})
      },
      toggleShowPassword: function () {
        this.showPassword = !this.showPassword;
      },
      generateCode: function () {
        this.code = '';
        for (let i = 0; i < 4; i++) {
          this.code += this.random();
        }
      },
      random: function () {
        return Math.floor(Math.random() * 9);
      },
      getVerifyCode: function () {
        this.generateCode();
        console.log(this.code)
        this.gVerifyCode.refresh(this.code)
      },

    }

  }
</script>
<style scoped lang="less">
  .login-container {
    background: url("../assets/login/bg.png") no-repeat;
    background-size: 100% 100%;
    height: 100%;
    text-align: center;
    .body {
      display: inline-block;
      max-width: 1000px;
      max-height: 680px;
      min-width: 720px;
      min-height: 490px;
      height: 70%;
      width: 50%;
      vertical-align: middle;
      font-size: 16px;
      background: url("../assets/login/login-bg.png") no-repeat;
      background-size: 100% 100%;
      .center {
        display: inline-block;
        width: 100%;
        vertical-align: middle;
      }
      &:after {
        display: inline-block;
        height: 100%;
        content: '';
        width: 0;
        vertical-align: middle;
      }
    }
    &:after {
      display: inline-block;
      height: 100%;
      content: '';
      width: 0;
      vertical-align: middle;
    }
    form {
      padding-right: 100px;
      text-align: left;
      vertical-align: middle;
      font-size: 28px;
      color: rgba(254,254,254, 0.8);
      margin-left: 20px;
      .form-group {
        position: relative;
        display: block;
        margin-bottom: 36px;
        .btn {
          display: block;
          width: 100%;
        }
      }
      input {
        &.form-control {
          display: block;
          width: 100%;
          &:focus {
            outline: 0;
          }
        }
        padding-left: 0;
        padding-right: 0;
        background-color: transparent;
        border: none;
        border-radius: 0;
        box-shadow: none;
        font-size: 22px;
        color: rgba(254,254,254, 0.8);
        &::placeholder {
          font-size: 22px;
          color: rgba(106, 131, 165, 0.8);
        }
        &.verify-code {
          border-image: linear-gradient(right,rgba(85,109,141,0.3), rgba(85,109,141,0.6) 80%)1 1;
        }
      }
      .verify-code-img {
        /*width: 100px;*/
        height: 32px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 0 10px #555;
      }
      .not-show-password,
      .show-password{
        position: absolute;
        right: 15px;
        top: 5px;
        width: 25px;
        height: 25px;
        cursor: pointer;
      }
      .not-show-password{
        background: url("../assets/login/not-show-password.png") no-repeat center center;
      }
      .show-password {
        background: url("../assets/login/show-password.png") no-repeat center center;
      }
    }
  }
  #username {
    background: url("../assets/login/user-code-line.png") no-repeat bottom left;
  }
  #password {
    background: url("../assets/login/user-code-line.png") no-repeat bottom left;
  }
  #verifyCode {
    background: url("../assets/login/verify-code-line.png") no-repeat bottom left;
  }
</style>
