<template>
  <div class="login-container">

    <el-row>
      <el-col :span="12">
        <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <h5 class="title">
        Welcome!
      </h5>
      <el-form-item prop="username">

        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item prop="password">

        <el-input
          v-model="loginForm.password"
          :type="pwdType"
          name="password"
          auto-complete="on"
          placeholder="请输入密码"
          @keyup.enter.native="handleLogin"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-form-item>
        <el-button
          :loading="loading"
          type="default"
          @click.native.prevent="handleLogin"
        >
          <!-- <svg-icon
            icon-class="login"
            style="font-size:24px"
          /> -->
          LOGIN
        </el-button>
      </el-form-item>
    </el-form>
      </el-col>
            <el-col :span="12" class="wallpaper">
              <svg-icon icon-class="banner" class="banner"></svg-icon>
<div class="line"></div>
            </el-col>

    </el-row>

  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      pwdType: 'password',

      loading: false,
    }
  },

  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.loading = true
      this.$store
        .dispatch('Login', this.loginForm)
        .then(() => {
          this.loading = false

          setTimeout(() => {
            this.$router.push({
              path: '/',
            })
          }, 2000)
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

@import '~@/styles/variables';
$bg:#2d3a4b;
$dark_gray:#fff;
$light_gray:#fff;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;

  .el-button{
    display: block;

margin:0 auto;
width:70%;
border-radius:15px;
background:$primary;
box-shadow: 0 4px 9.6px 0.4px rgba(74,227,135,.5);
color:#fff;
  }
  .el-row{
      height: 100%;

  };
  .el-col{
      height: 100%;

  }

    .wallpaper{
    background: #333;
    overflow: hidden;
    position:relative;
    .banner{
      color:$primary;
      width: 40%;
      height: 2.625rem;
      position: absolute;

      transform: translate(-50%,-50%);
      left:50%;
      top:48%;
      z-index:20;
    }
    .line{
      position: absolute;
      width:27%;
      left:36%;
      z-index:10;
            height: 120%;
            transform: rotate(15deg);
top:-10%;
      margin:0 auto;
      // transform: rotate(15deg);
      background: #282828;
    }
  }
  // background-color: $bg;
  .login-form {
    margin:0 auto;
    width: 300px;
    // max-width: 100%;
    // margin-top:50px;
    padding: 20px 35px;
    position:absolute;
  transform: translate(-50%,-50%);
      left:25%;
      top:42%;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 20px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;

  }
  .title {
    font-size: 2rem;
    color: #34495e;
    margin-bottom: 32px;
    text-align: center;
    font-weight: 500;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;

  }
}
</style>
