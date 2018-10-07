<template>
  <section class="app-main" style="height:100%">
    <transition name="fade" mode="out-in">
      <router-view :key="key"></router-view>
    </transition>

  </section>

</template>

<script>
import BackToTop from '@/components/BackToTop' 
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  },
  components:{
    BackToTop
  }
}
</script>
<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  width: 100%;
  position: relative;
  overflow: auto;
}
</style>

