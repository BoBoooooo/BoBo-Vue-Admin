<template>
  <div :class="classObj" class="app-wrapper">
    <div class="sidebar-wrapper">
      <sidebar class="sidebar-container"></sidebar>
    </div>
    <div class="main-container">
      <navbar></navbar>
      <TagsView></TagsView>
      <div class="content-container">
        <app-main></app-main>
      </div>
    </div>
    <BackToTop></BackToTop>
  </div>
</template>


<script>
  import {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  } from '@/views/layout/components'
  import BackToTop from '@/components/BackToTop'
  export default {
    name: 'layout',
  
    components: {
      Navbar,
      Sidebar,
      AppMain,
      BackToTop,
      TagsView
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      },
         classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
      }
    }
    },
    created() {
      this.$notify({
        title: '欢迎回来',
        type: 'success',
        duration: 2000,
        customClass: '.notify',
        message: this.$store.getters.name
      });
    },
    mounted(){
        window.addEventListener('scroll', ()=>{
        })
    }
   
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
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