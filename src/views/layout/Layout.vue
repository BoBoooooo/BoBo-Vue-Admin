<!--
@file 框架页布局
@author BoBo
@copyright NanJing Anshare Tech .Com
@createDate 2018年11月13日14:50:08
-->
<template>
  <div :class="classObj"
       class="app-wrapper">
    <!-- 导航栏 -->
    <Header />
    <!-- 左侧菜单 -->
    <Menu />
    <div class="main-container">
      <!-- TAB标签页 -->
      <!-- <TagsView /> -->
      <!-- 面包屑导航 -->
      <Breadcrumb></Breadcrumb>
      <!-- 二级路由 -->
      <AppMain />
    </div>

    <el-backtop target=".main-container"></el-backtop>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb/index.vue';
import { AppMain, Header, Menu } from './components/index.ts';

export default {
  name: 'Layout',
  components: {
    AppMain,
    // TagsView,
    Header,
    Breadcrumb,
    Menu,
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
      };
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  overflow: auto;
  height: 100%;
  background: #f0f3f7;
  // 主体区域
  .main-container {
    background: #f0f3f7;
    padding: 0 50px 10px;
    height: calc(100% - 90px);
  }
}
</style>
