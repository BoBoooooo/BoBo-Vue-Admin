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
    <!-- 左侧边栏 -->
    <div class="main-container">
      <!-- 面包屑导航 -->
      <Breadcrumb></Breadcrumb>
      <!-- 包含二级路由，可以继续嵌套子页面 -->
      <AppMain />
    </div>
    <el-backtop target=".main-container"></el-backtop>
    <div class="elevator">
      <!-- 消息中心 -->
      <MessageBox></MessageBox>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import MessageBox from '@/components/MessageBox/MessageBox.vue';

import {
  AppMain,
  Header, // TagsView 暂时去掉tab
} from '@/views/layout/components/index.ts';
import { Component, Vue, Watch } from 'vue-property-decorator';
import Breadcrumb from '@/components/Breadcrumb/index.vue';

@Component({
  components: {
    AppMain,
    MessageBox,
    Header,
    Breadcrumb,
  },
})
export default class Layout extends Vue {
  created() {
    this.$store.dispatch('initFlowTree');
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  background: #eee;
  overflow: auto;
  .elevator {
    position: fixed;
    top: 45%;
    padding: 0 8px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    margin-top: -140px;
    right: 0;
    background-color: #fff;
    box-shadow: 0px 4px 12px 0px rgba(7, 17, 27, 0.1);
  }
  // 主体区域
  .main-container {
    left: 0px;
    top: 80px;
    right: 0;
    height: auto;
    position: absolute;
    width: 90%;
    margin: 10px auto 10px;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
