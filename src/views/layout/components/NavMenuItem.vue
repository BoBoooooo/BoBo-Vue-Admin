<!--
 * @file: 菜单item
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019-09-05 21:55:47
 -->

<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <router-link v-if="!item.hidden&&item.children.length===1"
                   :key="item.name"
                   :to="item.path === '/' ? '/':item.path+'/'+item.children[0].path">
        <el-tooltip effect="dark"
                    :content="item.children[0].meta.title"
                    placement="right">
          <el-menu-item :index="item.path === '/' ? '/':item.path+'/'+item.children[0].path">
            <!-- <SvgIcon v-if="item.icon"
                    :icon-class="item.icon" /> {{ item.children[0].meta.title }} -->
            <SvgIcon :icon-class="item.title" /> {{ item.children[0].meta.title }}
          </el-menu-item>
        </el-tooltip>
      </router-link>
      <el-submenu v-else-if="!item.noDropdown&&!item.hidden"
                  :index="item.name"
                  :key="item.name">
        <template slot="title">
          <!-- <SvgIcon v-if="item.icon"
                    :icon-class="item.icon" /> {{ item.title }} -->
          <SvgIcon :icon-class="item.title" /> {{ item.title }}
        </template>
        <template v-for="child in item.children"
                  v-if="!child.hidden">
          <navmenu-item v-if="child.children&&child.children.length>0"
                        :key="child.name"
                        :routes="[child]"
                        class="menu-indent" />
          <router-link v-else
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


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'NavMenuItem',
})
export default class MenuItem extends Vue {
  @Prop({
    type: Array,
    default: () => [],
  })
  routes: any;
}
</script>

<style scoped>
.subitem >>> .el-badge__content {
  margin-top: 10px;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.SvgIcon {
  margin-left: -13px;
  width: 22px !important;
  height: 22px !important;
  vertical-align: -0.4em !important;
}

.hideSidebar .menu-indent {
  display: block;
  text-indent: 1em;
}
.item {
  margin-top: 8px !important;
  margin-left: 8px !important;
}
.subitem {
  position: absolute;
  right: 15%;
}
</style>
