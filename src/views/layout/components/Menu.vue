<!--
@file 菜单
@author BoBo
@copyright BoBo
@createDate 2019-09-05 21:55:47
-->
<template>
  <div>
    <div class="title-container"
         :style="{
                backgroundColor: themeColor.sidebar.backgroundColor
    }">
      <img class="header_logo"
           src="@/assets/logo.png">
      <span class="title"
            :style="{
          color:themeColor.sidebar.textColor,
        }">{{title}}</span>
    </div>
    <!-- 导航菜单+滚动条 -->
    <el-menu :collapse="!sidebar"
             :default-active="$route.path"
             unique-opened
             mode="vertical"
             :background-color="themeColor.sidebar.backgroundColor"
             :text-color="themeColor.sidebar.textColor"
             :active-text-color="themeColor.sidebar.activeTextColor"
             class="menu"
             :class="{
         'hideSidebar':!sidebar
       }">
      <!-- 菜单项组件 -->
      <MenuItem :routes="routers" />
    </el-menu>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import themeColor from '@/styles/theme';
import { RouteConfig } from 'vue-router';
import MenuItem from './MenuItem.vue';

@Component({
  name: 'Menu',
  components: {
    MenuItem,
  },
})
export default class Menu extends Vue {
  @Getter routers!: RouteConfig;

  @Getter config!: SystemConfig;

  themeColor = themeColor;

  get sidebar() {
    return this.$store.getters.sidebar.opened;
  }

  get title() {
    return this.config.systemName || process.env.VUE_APP_NAME;
  }
}
</script>
<style scoped>
.el-submenu__icon-arrow el-icon-arrow-right {
  display: none;
}
</style>
<style lang="scss" scoped>
.title-container {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  width: 219px;
  padding-left: 20px;
  text-align: center;
  height: 64px;
  line-height: 64px;
  .header_logo {
    width: 32px;
    height: 32px;
    margin-right: 10px;
    border-radius: 50%;
  }
  .title {
    font-weight: 500;
    font-family: 'YaHei';
    font-size: 20px;
  }
  .icon {
    color: yellow;
  }
}
.menu {
  top: 64px;
  width: 220px;
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
    ::v-deep.el-submenu__title,
    ::v-deep.el-menu-item {
      padding-left: 16px !important;
      height: auto;
    }
    ::v-deep.el-submenu {
      padding-left: 0 !important;
    }
    ::v-deep.el-submenu__icon-arrow {
      display: none;
    }
  }
}
</style>
