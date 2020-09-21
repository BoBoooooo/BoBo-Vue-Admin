<!--
@file 菜单
@author BoBo
@copyright NanJing Anshare Tech .Com
@createDate 2019-09-05 21:55:47
-->
<template>
  <!-- 导航菜单+滚动条 -->
  <el-menu :collapse="!sidebar"
           :default-active="$route.path"
           unique-opened
           mode="vertical"
           background-color="#ebeef5"
           text-color="#333"
           active-text-color="#616dad"
           class="menu"
            :class="{
         'hideSidebar':!sidebar
       }">
    <!-- 菜单项组件 -->
    <MenuItem :routes="routers" />
  </el-menu>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import MenuItem from './MenuItem.vue';

@Component({
  name: 'Menu',
  components: {
    MenuItem,
  },
  computed: {
    ...mapGetters(['routers']),
  },
})
export default class Menu extends Vue {
  get sidebar() {
    return this.$store.getters.sidebar.opened;
  }
}
</script>
<style scoped>
.el-submenu__icon-arrow el-icon-arrow-right {
  display: none;
}
</style>
<style lang="scss" scoped>
.menu {
  top: 64px;
  width: 220px;
  padding-left:15px;
  bottom: 0;
  left: 0 !important;
  right: none !important;
  overflow: auto;
  position: fixed;
  height: 100%;
  .el-menu {
    height: 100%;
  }
  &.hideSidebar {
    width: 64px;
    padding: 0;
    /deep/.el-submenu__title,
    /deep/.el-menu-item {
      padding-left: 16px !important;
      height: auto;
    }
     /deep/.el-submenu {
      padding-left: 0 !important;
    }
    /deep/.el-submenu__icon-arrow {
      display: none;
    }
  }
}
</style>
