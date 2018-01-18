<template>
  <div>
    <template v-for="item in routes">
      <router-link :key="item.name" v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
        <el-menu-item :index="item.path+'/'+item.children[0].path">
          <icon-svg v-if='item.meta.icon' :icon-class="item.meta.icon" /> {{item.children[0].meta.title}}
        </el-menu-item>
      </router-link>
      <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden" :key="item.name">
        <template slot="title">
          <icon-svg v-if='item.meta.icon' :icon-class="item.meta.icon" /> {{item.meta.title}}
        </template>
        <template v-for="child in item.children" v-if='!child.hidden'>
          <sidebar-item :key="child.name" class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>
          <router-link  :key="child.name" v-else class="menu-indent" :to="item.path+'/'+child.path">
            <el-menu-item :index="item.path+'/'+child.path">
              {{child.meta.title}}
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.svg-icon {
  margin-right: 10px;
}
.hideSidebar .menu-indent{
  display: block;
  text-indent: 10px;
}
</style>

