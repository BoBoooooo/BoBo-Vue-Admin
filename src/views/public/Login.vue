<!--
@file 登录页
@author BoBo
@copyright NanJing Anshare Tech .Com
@createDate 2020年09月10日10:50:36
-->
<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12"
              class="wallpaper">
        <svg-icon icon-class="banner"
                  @click.native="redirectToGitHub"
                  class="banner"></svg-icon>
      </el-col>
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
      top: 45%;
      z-index: 20;
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
