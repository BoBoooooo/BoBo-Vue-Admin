<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <RouterLink
        v-if="!item.hidden&&item.noDropdown&&item.children.length>0"
        :key="item.name"
        :to="item.path+'/'+item.children[0].path"
      >
        <ElMenuItem :index="item.path+'/'+item.children[0].path">
          <svg-icon
            v-if="item.icon"
            :icon-class="item.icon"
          /> {{ item.children[0].meta.title }}
        </ElMenuItem>
      </RouterLink>
      <ElSubmenu
        v-if="!item.noDropdown&&!item.hidden"
        :key="item.name"
        :index="item.name"
      >
        <template slot="title">
          <svg-icon
            v-if="item.icon"
            :icon-class="item.icon"
          /> {{ item.title }}
        </template>
        <template
          v-for="child in item.children.filter(k=>!k.hidden)"
        >
          <SidebarItem
            v-if="child.children&&child.children.length>0"
            :key="child.name"
            :routes="[child]"
            class="menu-indent"
          />
          <RouterLink
            v-else
            :key="child.name"
            :to="item.path+'/'+child.path"
            class="menu-indent"
          >
            <ElMenuItem :index="item.path+'/'+child.path">
              {{ child.meta.title }}
            </ElMenuItem>
          </RouterLink>
        </template>
      </ElSubmenu>
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
/*
 <i class="fontcontainer">
              <span class="iconfont" v-if="onlyOneChild.meta&&onlyOneChild.meta.icon" :class="onlyOneChild.meta.icon"></span>
          </i>* */
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
