<!--
@file 左侧边栏菜单
@author ytyang
@copyright NanJing Anshare Tech .Com
@createDate 2018年11月13日15:17:37
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
    <SidebarItem :routes="routers" />
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem.vue';

export default {
  data() {
    return {
      waitListNum: null,
      bg: null,
    };
  },
  components: {
    SidebarItem,
  },
  computed: {
    ...mapGetters(['routers', 'menuNum']),
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
  z-index:200;
  width: 33px;
  top: 100px;
  max-height:80%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
   &::-webkit-scrollbar {
        display: none;
  }
}
</style>
