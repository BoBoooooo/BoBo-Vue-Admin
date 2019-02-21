<template>
  <div
    :class="classObj"
    class="app-wrapper">
        <navbar/>

        <sidebar class="sidebar-container"/>
        <div class="main-container">
        <TagsView/>
        <app-main/>
    </div>
    <BackToTop/>
  </div>
</template>


<script>
import {
  Navbar,
  Sidebar,
  AppMain,
  TagsView,
} from '@/views/layout/components'
import BackToTop from '@/components/BackToTop'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    BackToTop,
    TagsView,
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
    },
  },

  mounted() {
    window.addEventListener('scroll', () => {
    })
  },

}

</script>
