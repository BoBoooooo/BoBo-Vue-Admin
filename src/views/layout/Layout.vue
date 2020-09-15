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
    <!-- 左侧边栏 -->
    <div class="main-container">
      <!-- TAB标签页 -->
      <!-- <TagsView /> -->
      <Breadcrumb></Breadcrumb>
      <!-- 菜单 -->
      <NavMenu />
      <!-- 包含二级路由，可以继续嵌套子页面 -->
      <AppMain />
    </div>

    <el-backtop target=".main-container"></el-backtop>

  </div>
</template>

<script>

import { AppMain, Header } from '@/views/layout/components/index.ts';
import Breadcrumb from '@/components/Breadcrumb/index.vue';
import NavMenu from './components/NavMenu.vue';

export default {
  name: 'Layout',
  data() {
    return {};
  },
  components: {
    AppMain,
    // TagsView,
    Header,
    Breadcrumb,
    NavMenu,
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

  mounted() {
    window.addEventListener('scroll', () => {});
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
