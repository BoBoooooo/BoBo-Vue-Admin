<!--
@file 左侧边栏菜单子项
@author BoBo
@copyright NanJing Anshare Tech .Com
@createDate 2018年11月13日15:21:56
-->
<template>
  <div>
    <template v-for="item in routes">
      <router-link v-if="!item.hidden&&item.children.length===1"
                   :key="item.name"
                   :to="{name:item.children[0].name}">
        <el-menu-item :index="item.children[0].name"
                      class="menu-item">
          <SvgIcon v-if="item.children[0].meta.title"
                   class="icon"
                   :icon-class="item.title" /> {{ item.children[0].meta.title }}
        </el-menu-item>
      </router-link>
      <el-submenu v-else-if="!item.hidden"
                  :index="item.name"
                  :key="item.name">
        <template slot="title">
          <div class="menu-item">
            <!-- <SvgIcon v-if="item.icon"
                    :icon-class="item.icon" /> {{ item.title }} -->

            <SvgIcon :icon-class="item.title"
                     class="icon"
                     v-if="showIcon(item)" />{{ item.title }}
          </div>

        </template>
        <template v-for="child in item.children.filter(s=>!s.hidden)">
          <menu-item v-if="child.children&&child.children.length>0"
                     :key="child.name"
                     :routes="[child]"
                     class="menu-indent" />
          <router-link v-else
                       :key="child.name"
                       :to="{name:child.name}"
                       class="menu-indent">
            <el-menu-item :index="child.name">
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
  name: 'MenuItem',
})
export default class MenuItem extends Vue {
  @Prop({
    type: Array,
    default: () => [],
  })
  routes: any;

  showIcon(item) {
    if (item.meta) {
      if (item.meta.icon === false) {
        return false;
      }
      return true;
    }
    return true;
  }
}
</script>
<style scoped>
.subitem >>> .el-badge__content {
  margin-top: 0px;
  margin-left: 5px;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.menu-item:hover .icon {
  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: shake 1s;

  /* When the animation is finished, start again */
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -1px) rotate(-1deg);
  }
  20% {
    transform: translate(-1px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 1px) rotate(-1deg);
  }
  60% {
    transform: translate(-1px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(1px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -1px) rotate(-1deg);
  }
}

.icon {
  width: 28px !important;
  margin: 0 auto;
  display: block;
  height: 28px !important;
  vertical-align: -0.4em !important;
}
.item {
  position: absolute;
  top: 0px;
}
.margin_right_4px {
  margin-right: 4px !important;
}
</style>
