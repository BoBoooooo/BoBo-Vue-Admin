<template>

  <el-menu
    class="navbar"
    mode="horizontal">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"/>
    <breadcrumb class="breadcrumb-container"/>
    <Screenfull class="screenfull"/>
    <el-dropdown
      class="avatar-container"
      trigger="click">
      <div class="avatar-wrapper">
        {{ name }}
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu
        slot="dropdown"
        class="user-dropdown">
        <router-link
          class="inlineBlock"
          to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span
            style="display:block;"
            @click="changepassword">修改密码</span>
        </el-dropdown-item>

        <el-dropdown-item divided>
          <span
            style="display:block;"
            @click="logout">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import {
  mapGetters,
} from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import Screenfull from '@/components/Screenfull'

export default {
  components: {
    Breadcrumb,
    Screenfull,
    Hamburger,
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
    ]),
  },

  methods: {

    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('FedLogOut')
    },
    changepassword() {
      this.$prompt('请输入新密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',

      }).then(({
        value,
      }) => {
        this.$store.dispatch('ChangePassword', value)
      })
    },
  },
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
      .breadcrumb-container{
    float: left;
  }
    .errLog-container {
      display: inline-block;
      position: absolute;
      right: 150px;
    }
    .screenfull {
      position: absolute;
      right: 120px;
      top: 14px;

      color: red;

      &:focus{
             outline: none;

      }
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
