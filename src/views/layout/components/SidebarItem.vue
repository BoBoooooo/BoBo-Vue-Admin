<!--
 * @file: 左侧菜单item
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
          <!-- 父级待办事项红点 -->
          <el-badge is-dot
                    class="item"
                    v-if="visibleParentCountNum(item)>0"></el-badge>
        </template>
        <template v-for="child in item.children"
                  v-if="!child.hidden">
          <sidebar-item v-if="child.children&&child.children.length>0"
                        :key="child.name"
                        :routes="[child]"
                        class="menu-indent" />
          <router-link v-else
                       :key="child.name"
                       :to="item.path+'/'+child.path"
                       class="menu-indent">
            <el-menu-item :index="item.path+'/'+child.path">
              {{ child.meta.title }}
              <!-- 待办事项数量统计 -->
              <template v-if="child.meta.visibleCountNum">
                <el-badge :value="getListNum(child.meta.visibleCountNum)"
                          v-if="getListNum(child.meta.visibleCountNum) !== 0"
                          class="subitem"></el-badge>
              </template>
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
      default: () => [],
    },
    waitListNum: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    getWaitListNum() {
      return this.waitListNum || {};
    },
  },
  methods: {
    // 返回各个待办菜单数量
    getListNum(key) {
      return this.getWaitListNum[key] || 0;
    },
    // 计算父级菜单是否需要显示 红点
    visibleParentCountNum(item) {
      let sum = 0;
      for (const child of item.children) {
        if (child.meta.visibleCountNum) {
          sum += this.getListNum(child.meta.visibleCountNum);
        }
      }
      return sum;
    },
  },
};
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
