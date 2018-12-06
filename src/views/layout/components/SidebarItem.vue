<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <router-link
        v-if="!item.hidden&&item.noDropdown&&item.children.length>0"
        :key="item.name"
        :to="item.path+'/'+item.children[0].path">
        <el-menu-item :index="item.path+'/'+item.children[0].path">
          <svg-icon
            v-if="item.icon"
            :icon-class="item.icon" /> {{ item.children[0].meta.title }}
        </el-menu-item>
      </router-link>
      <el-submenu
        v-if="!item.noDropdown&&!item.hidden"
        :index="item.name"
        :key="item.name">
        <template slot="title">
          <svg-icon
            v-if="item.icon"
            :icon-class="item.icon" /> {{ item.title }}
        </template>
        <template
          v-for="child in item.children"
          v-if="!child.hidden">
          <sidebar-item
            v-if="child.children&&child.children.length>0"
            :key="child.name"
            :routes="[child]"
            class="menu-indent"/>
          <router-link
            v-else
            :key="child.name"
            :to="item.path+'/'+child.path"
            class="menu-indent">
            <el-menu-item :index="item.path+'/'+child.path">
              {{ child.meta.title }}
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
      type: Array,
      default: () => ({}),
    },
  },
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
