<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left">
      <h3 class="title">Anshare Admin v2.0</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="yonghuming" />
        </span>
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="mima" />
        </span>
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
          @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-form-item>

        <el-button
          :loading="loading"
          type="default"
          style="width:100%;background:rbg(170,198,190)"
          @click.native.prevent="handleLogin">
          <svg-icon
            icon-class="login"
            style="font-size:24px" />
        </el-button>
      </el-form-item>
    </el-form>
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

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:white;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 20px;
    width: 70%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 30px;

    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#fff;
$light_gray:#fff;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background: url('~@/assets/loginbg.jpg') center center no-repeat;
  background-size:100% 100%;
  // background-color: $bg;
  .login-form {
    position: absolute;
    top:15%;
    right: 13%;
    width: 300px;
    max-width: 100%;
    padding: 20px 35px;

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
    font-size: 26px;
    font-weight: 400;
    color: #f2f2f2;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
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
