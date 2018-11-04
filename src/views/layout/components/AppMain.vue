<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>


<script>
import BackToTop from '@/components/BackToTop' 
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  },
  components:{
    BackToTop
  }
}
</script>
<style scoped>
.app-main {
  width: 100%;
  height:100%;
  position: relative;
  overflow: auto;
}
</style>

