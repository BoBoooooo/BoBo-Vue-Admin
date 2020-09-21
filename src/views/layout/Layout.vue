<!--
@file 框架页布局
@author BoBo
@copyright NanJing Anshare Tech .Com
@createDate 2018年11月13日14:50:08
-->
<template>
  <div class="app-wrapper">
    <!-- 导航栏 -->
    <Header />
    <!-- 左侧菜单 -->
    <Menu />
    <div class="main-container"
         :class="{
       'hideSidebar':!sidebar
    }">
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
import { Component, Vue, Prop } from 'vue-property-decorator';
import { AppMain, Header, Menu } from './components/index.ts';

@Component({
  name: 'Layout',
  components: {
    AppMain,
    // TagsView,
    Header,
    Breadcrumb,
    Menu,
  },
})
export default class Layout extends Vue {
  get sidebar() {
    return this.$store.getters.sidebar.opened;
  }
}
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
    margin-left: 220px;
    padding: 20px 30px 30px;
    box-sizing: border-box;
    height: calc(100% - 64px);
    &.hideSidebar {
      margin-left: 80px;
    }
  }
}
</style>
