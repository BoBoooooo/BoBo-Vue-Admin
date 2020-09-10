<!--
@file 登录页
@author BoBo
@copyright NanJing Anshare Tech .Com
@createDate 2020年09月10日10:50:36
-->
<template>
  <div class="login-container">

    <el-row>
      <el-col :span="12">
        <el-form ref="loginForm"
                 :model="loginForm"
                 class="login-form"
                 auto-complete="on"
                 label-position="left">
          <h5 class="title">
            Welcome!
          </h5>
          <el-form-item prop="username">

            <el-input v-model="loginForm.username"
                      name="username"
                      type="text"
                      auto-complete="on"
                      placeholder="请输入用户名(演示账号 admin)" />
          </el-form-item>
          <el-form-item prop="password">

            <el-input v-model="loginForm.password"
                      type="password"
                      name="password"
                      auto-complete="on"
                      placeholder="请输入密码(密码 123)"
                      @keyup.enter.native="handleLogin" />
          </el-form-item>

          <el-form-item>
            <el-button :loading="btnLoginIsLoading"
                       type="default"
                       @click.native.prevent="handleLogin">
              LOGIN
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12"
              class="wallpaper">
        <svg-icon icon-class="banner"
                  class="banner"></svg-icon>
        <div class="line"></div>
      </el-col>

    </el-row>

  </div>
</template>


<script>
import { Component, Vue } from 'vue-property-decorator';
import ChangePasswordDialog from '@/components/ChangePasswordDialog/ChangePasswordDialog.vue';
import { mapGetters } from 'vuex';

@Component({
  components: {
    ChangePasswordDialog,
  },
  computed: {
    ...mapGetters(['config']),
  },
})
export default class Login {
  loginForm = {
    username: '',
    password: '',
  };

  btnLoginIsLoading = false;

  rules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  };

  // 背景图
  bg = null;

  iconClass = null;

  get isPublic() {
    return process.env.VUE_APP_ISPUBLIC === 'true';
  }

  get title() {
    return this.config.systemName || process.env.VUE_APP_NAME;
  }

  created() {
    this.iconClass = 'loginTitle';
  }

  mounted() {
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      this.$notify({
        title: '您当前的浏览器版本过低，可能存在安全风险！',
        message: '建议您使用谷歌浏览器',
        duration: 60000,
      });
    }
  }

  handleLogin() {
    this.btnLoginIsLoading = true;
    this.$refs.loginForm.validate((valid) => {
      if (!valid) {
        this.btnLoginIsLoading = false;
        return null;
      }
      this.$store
        .dispatch('setTokenByLogin', this.loginForm)
        .then((res) => {
          this.btnLoginIsLoading = false;
          // 进入内部页面
          this.$router
            .push({
              path: '/',
            })
            .catch((error) => {
              console.info(error.message);
            });
        })
        .catch((error) => {
          this.$alert(error.message, '警告', {
            confirmButtonText: '重新输入',
          });
          this.btnLoginIsLoading = false;
        });
      return null;
    });
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/variables';
$bg: #2d3a4b;
$dark_gray: #fff;
$light_gray: #fff;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;

  .el-button {
    display: block;

    margin: 0 auto;
    width: 70%;
    border-radius: 15px;
    background: $primary;
    box-shadow: 0 4px 9.6px 0.4px rgba(74, 227, 135, 0.5);
    color: #fff;
  }
  .el-row {
    height: 100%;
  }
  .el-col {
    height: 100%;
  }

  .wallpaper {
    background: #333;
    overflow: hidden;
    position: relative;
    .banner {
      color: $primary;
      width: 40%;
      height: 2.625rem;
      position: absolute;

      transform: translate(-50%, -50%);
      left: 50%;
      top: 48%;
      z-index: 20;
    }
    .line {
      position: absolute;
      width: 27%;
      left: 36%;
      z-index: 10;
      height: 120%;
      transform: rotate(15deg);
      top: -10%;
      margin: 0 auto;
      // transform: rotate(15deg);
      background: #282828;
    }
  }
  // background-color: $bg;
  .login-form {
    margin: 0 auto;
    width: 300px;
    // max-width: 100%;
    // margin-top:50px;
    padding: 20px 35px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 25%;
    top: 42%;
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
