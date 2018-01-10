<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <levelbar></levelbar>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        {{name}}
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class='inlineBlock' to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="changepassword" style="display:block;">修改密码</span>
        </el-dropdown-item>

        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import Levelbar from './Levelbar'
  import Hamburger from '@/components/Hamburger'

  export default {
    components: {
      Levelbar,
      Hamburger
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name'
      ])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      logout() {
        this.$store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      },
      changepassword() {

        this.$prompt('请输入新密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',

        }).then(({
          value
        }) => {
          this.$store.dispatch('ChangePassword', value).then(response => {
            this.$message({
              type: 'success',
              message: response.Message + ",请重新登录"
            });
            setTimeout(() => {

              this.logout()


            }, 2000);
          }).catch(error => {
          this.$message({
            type: 'error',
            message: error
          });
        })
        });



      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      outline:none;
      padding: 0 10px;
    }
    .errLog-container {
      display: inline-block;
      position: absolute;
      right: 150px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }

</style>
