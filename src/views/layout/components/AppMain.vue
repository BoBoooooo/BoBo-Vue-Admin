<!--
@file 本页面用于加载其他二级路由对应的子页面，被layout/layout.vue引用
      嵌套顺序App.vue->Layout.vue->AppMain.vue
@author BoBo
@copyright NanJing Anshare Tech .Com
@createDate 2018年11月13日14:48:28
-->
<template>
  <section class="app-main"
           ref="appmain"
           @scroll="handleScroll"
          >
      <router-view :scrollTop="scrollTop"
                   :key="key"
                   @viewScroll="viewScroll" />
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      scrollTop: 0,
      ISPUBLIC: process.env.VUE_APP_ISPUBLIC,
    };
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    },
  },
  methods: {
    // 根据右侧滚动条实时刷新滚动条距离顶部的位置，并通过<router-view>传入子页面
    handleScroll() {
      this.scrollTop = this.$refs.appmain.scrollTop;
    },
    // 重定位滚动条
    viewScroll(v) {
      this.$refs.appmain.scrollTop = v;
    },
  },
};
</script>
<style lang="scss" scoped>
.app-main {
  // padding-top: 16px;
  height:100%;
}
</style>
