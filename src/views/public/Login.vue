<!--
@file 登录页
@author BoBo
@copyright BoBo
@createDate 2020年09月10日10:50:36
-->
<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" class="wallpaper">
        <div @click="redirectToGitHub">
          <svg-icon icon-class="banner" class="banner"></svg-icon>
          <p class="author">© Awesome Crud Framework By BoBo</p>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">
          <h5 class="title">Welcome 🎯</h5>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="admin" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" name="password" auto-complete="on" placeholder="123" @keyup.enter.native="handleLogin" />
          </el-form-item>

          <el-form-item>
            <el-button :loading="btnLoginIsLoading" type="default" @click.native.prevent="handleLogin"> LOGIN </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import ChangePasswordDialog from '@/components/ChangePasswordDialog/ChangePasswordDialog.vue';
import { Getter } from 'vuex-class';

@Component({
  components: {
    ChangePasswordDialog,
  },
})
export default class Login extends Vue {
  @Getter config;

  loginForm = {
    username: '',
    password: '',
  };

  btnLoginIsLoading = false;

  // 获取系统名称,在字典配置-系统配置中设置标题
  get title() {
    return this.config.systemName || process.env.VUE_APP_NAME;
  }

  redirectToGitHub() {
    window.open('https://github.com/BoBoooooo/BoBo-Vue-Admin', '_blank');
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
            .catch((error) => {});
        })
        .catch((error) => {
          this.btnLoginIsLoading = false;
        });
      return null;
    });
  }
}
</script>
<style scoped></style>
<style rel="stylesheet/scss" lang="scss" scoped>
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  .el-row,
  .el-col {
    height: 100%;
  }
  .el-col {
    position: relative;
  }
  .wallpaper {
    background: #6163ad;
    overflow: hidden;
    position: relative;
    .banner {
      color: #f2f6fc;
      cursor: pointer;
      width: 30%;
      height: 30%;
      position: absolute;
      transform: translate(-50%, -50%);
      left: 50%;
      top: 40%;
      z-index: 20;
    }
    .author {
      background: #ffbebe -webkit-linear-gradient(left, #fff8f8, #fff) 0 0 no-repeat;
      background-clip: text;
      -webkit-text-fill-color: rgba(255, 255, 255, 0.3);
      cursor: pointer;
      font-size: 1.5em;
      position: absolute;
      transform: translate(-50%, -50%);
      left: 50%;
      width: 100%;
      text-align: center;
      animation: slideShine 3s infinite;
      background-size: 80px;
      top: 60%;
      z-index: 20;
      @keyframes slideShine {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: 100% 100%;
        }
      }
    }
  }
  .login-form {
    margin: 0 auto;
    width: 300px;
    padding: 20px 35px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 42%;
    .el-button {
      display: block;
      margin: 0 auto;
      width: 70%;
      border-radius: 15px;
      background: #f36874;
      box-shadow: 0 4px 9.6px 0.4px rgba(227, 74, 74, 0.5);
      color: #fff;
    }
  }
  .title {
    font-size: 2rem;
    color: #34495e;
    margin-bottom: 32px;
    text-align: center;
    font-weight: 500;
  }
}
</style>
