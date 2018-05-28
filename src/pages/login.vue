<template>
  <div class="login-container">
    <div class="body">
      <div class="content-border left-top"></div>
      <div class="content-border right-top"></div>
      <div class="content-border left-bottom"></div>
      <div class="content-border right-bottom"></div>
      <form class="form-horizontal" @submit.prevent="login">
        <div class="login-tile">灯联网</div>
        <div class="login-user">
          <input type="text" class="login-input" id="username" name="username" v-model="loginname" placeholder="用户名登录"/>
          <span class="user-img"></span>
        </div>
        <div class="login-password">
          <input :type="showPassword? 'text': 'password'" class="login-input" id="password" name="password" v-model="password" placeholder="密码">
          <span class="password-img"></span>
        </div>
        <div class="login-verify">
          <input type="text" class="login-input" id="verifyCode" name="verifyCode" v-model="verifyCode" placeholder="验证码">
          <div @click="getVerifyCode" class="verify-code-img" id="code"></div>
        </div>
        <div class="login-btn">
          <button :disabled="disabled" class="btn" type="submit">登录</button>
        </div>
      </form>
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
    background: url("../assets/login/bg.png") no-repeat center;
    background-size: cover;
    height: 100%;
    position: relative;
    .body {
      position: absolute;
      display: inline-block;
      top: 50%;
      margin-top: -223px;
      right: 100px;
      height: 446px;
      width: 473px;
      font-size: 16px;
      background: rgba(22,54,101,0.71);
      .login-tile {
        font-size: 28px;
        text-align: center;
        color: #6fd7f7;
        padding: 20px;
        font-weight: bolder;
        letter-spacing: 5px;
      }
      .login-input {
        border: 1px solid #4f84a9;
        border-radius: 4px;
        width: 100%;
        background: transparent;
        height: 54px;
        line-height: 54px;
        color: #5086a3;
        font-size: 16px;
        &::placeholder {
          font-weight: bolder;
          letter-spacing: 2px;
          color: #5086a3;
        }
      }
      .login-user,
      .login-password,
      .login-verify {
        position: relative;
        padding: 0 60px;
        margin-bottom: 25px;
      }
      .login-user {
        .login-input {
          padding-left: 50px;
          padding-right: 16px;
        }
        .user-img{
          position: absolute;
          top: 50%;
          margin-top: -10px;
          left: 80px;
          display: inline-block;
          background: url("../assets/login/user.png");
          width: 17px;
          height: 20px;
        }
      }
      .login-password {
        .login-input {
          padding-left: 50px;
          padding-right: 16px;
        }
        .password-img{
          position: absolute;
          top: 50%;
          margin-top: -10px;
          left: 80px;
          display: inline-block;
          background: url("../assets/login/password.png");
          width: 17px;
          height: 21px;
        }
      }
      .login-verify {
        display: flex;
        align-items: center;
        .login-input {
          padding: 0 16px;
          margin-right: 16px;
        }
      }
      .login-btn {
        margin-top: 35px;
        padding: 0 60px;
        .btn {
          width: 100%;
          height: 53px;
          font-size: 22px;
          color: #fff;
          background: linear-gradient(to bottom, #4274bc, #60a2ec);
          &:hover {
            outline: 0;
            box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
          }
          &[disabled] {
            &:hover {
              box-shadow: none;
            }
          }
        }
      }
    }
      .verify-code-img {
        height: 54px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 0 10px #555;
      }
    .content-border {
      position: absolute;
      width: 12px;
      height: 13px;
      border: 2px solid #5bb7e5;
      &.left-top {
        border-bottom: 0;
        border-right: 0;
        top: 0;
        animation-delay: 0s;
      }
      &.left-bottom {
        border-top: 0;
        border-right: 0;
        bottom: 0;
        animation-delay: 0.5s;
      }
      &.right-top {
        border-bottom: 0;
        border-left: 0;
        top: 0;
        right: 0;
        animation-delay: 1s;
      }
      &.right-bottom {
        border-top: 0;
        border-left: 0;
        bottom: 0;
        right: 0;
        animation-delay: 1.5s;
      }
    }
  }
</style>
