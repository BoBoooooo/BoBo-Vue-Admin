<template>

  <el-menu
    class="navbar"
    mode="horizontal">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"/>
    <!-- <breadcrumb class="breadcrumb-container"/> -->
    <span style="display:inline-block;width:70%;margin:0 auto;text-align:center">Anshare Tech</span>
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
// import Breadcrumb from '@/components/Breadcrumb'
import Screenfull from '@/components/Screenfull'

export default {
  components: {
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

@import '~@/styles/index.scss';
  .navbar {
      padding-left:24px;
      padding-right:44px;
      background:#333;
    height: 72px;
    line-height: 72px;
    color:white;
    position:relative;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 72px;
      height: 72px;
          color:white;

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
      right: 172px;
    }
    .screenfull {
      position: absolute;
      right: 120px;
      top: 14px;
    color:white;


      &:focus{
             outline: none;

      }
    }

    .avatar-container {
      height: 72px;
      display: inline-block;
      position: absolute;
      right: 35px;
          color:white;

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
          top: 28px;
          color:$primary;
          font-size: 12px;
        }
      }
    }
  }

</style>
