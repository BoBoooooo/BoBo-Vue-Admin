<!--
@file 本页面用于加载其他二级路由对应的子页面，被layout/layout.vue引用
      嵌套顺序App.vue->Layout.vue->AppMain.vue
@author ytyang
@copyright NanJing Anshare Tech .Com
@createDate 2018年11月13日14:48:28
-->
<template>
  <section class="app-main"
           ref="appmain"
           @scroll="handleScroll">
    <router-view :scrollTop="scrollTop"
                 :key="key"
                 @viewScroll="viewScroll" />
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'AppMain',
})
export default class AppMain extends Vue {
  $refs!: {
    appmain: HTMLFormElement;
  };

  scrollTop = 0;


  get cachedViews() {
    return this.$store.state.tagsView.cachedViews;
  }

  get key() {
    return this.$route.fullPath;
  }

  // 根据右侧滚动条实时刷新滚动条距离顶部的位置，并通过<router-view>传入子页面
  handleScroll() {
    this.scrollTop = this.$refs.appmain.scrollTop;
  }

  // 重定位滚动条
  viewScroll(v) {
    this.$refs.appmain.scrollTop = v;
  }
}
</script>
<style lang="scss" scoped>
.app-main {
  height: calc(100% - 40px);
}
</style>
