<template>
  <el-menu mode="vertical"   :default-active="$route.path">
    <sidebar-item :routes='permission_routers'></sidebar-item>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'AllRouters'
    ])
  },
  created(){
   console.log(this.AllRouters) 

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
  min-height: 100%;
}
</style>
