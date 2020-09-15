<!--
@file 菜单
@author BoBo
@copyright NanJing Anshare Tech .Com
@createDate 2019-09-05 21:55:47
-->
<template>
  <!-- 导航菜单+滚动条 -->
  <el-menu collapse
           :default-active="$route.path"
           unique-opened
           mode="vertical"
           background-color="#f5e8e8"
           text-color="#000"
           active-text-color="#3f51b5"
           class="menu"
           id="menu-container">
    <!-- 菜单项组件 -->
    <NavMenuItem :routes="routers" />
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import NavMenuItem from './NavMenuItem.vue';

export default {
  data() {
    return {
      waitListNum: null,
      bg: null,
    };
  },
  components: {
    NavMenuItem,
  },
  computed: {
    ...mapGetters(['routers']),
  },
  methods: {
    handleDropDownCommand(command) {
      switch (command) {
        case 'contactus':
          // TODO:联系我们跳转外网无意义，需求确认后继续开发
          break;
        case 'changepwd':
          this.$prompt('请输入新密码', '提示', {
            confirmButtonText: '确定并重新登录',
            cancelButtonText: '取消',
          }).then(({ value }) => {
            this.$store.dispatch('changePassword', value);
          });
          break;
        case 'logout':
          this.$store.dispatch('clearToken');
          break;
        default:
          break;
      }
    },
  },
};
</script>
<style scoped>
.el-submenu__icon-arrow el-icon-arrow-right {
  display: none;
}
</style>
<style lang="scss" scoped>
.menu {
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  left:0;
  z-index:200;
  width: 34px;
  top: 100px;
  max-height:80%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
   &::-webkit-scrollbar {
        display: none;
  }
}
</style>
