<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :collapse="isCollapse"
      :default-active="$route.path"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"

      style="border:none">

      <sidebar-item :routes="routers"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';

export default {
  components: {
    SidebarItem,
  },
  computed: {
    ...mapGetters(['routers']),
    isCollapse() {
      return !this.$store.getters.sidebar.opened;
    },
  },
  created() {
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
  min-height: 100%;
  background: rgb(48, 65, 86);
  color:rgb(191, 203, 217);
}
</style>
