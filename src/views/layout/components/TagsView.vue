<!--
 * @file: tabs
 * @copyright: BoBo
 * @author: BoBo
 * @Date: 2020年09月14 18:01:58
-->
<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane"
                 class="tags-view-wrapper">
      <router-link v-for="tag in Array.from(visitedViews)"
                   ref="tag"
                   :class="isActive(tag)?'active':''"
                   :to="tag.path"
                   :key="tag.path"
                   class="tags-view-item"
                   @contextmenu.prevent.native="openMenu(tag,$event)">
        {{ tag.title }}
        <span class="el-icon-close"
              @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible"
        :style="{left:left+'px',top:top+'px'}"
        class="contextmenu">
      <li @click="closeSelectedTag(selectedTag)">关闭当前</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags">关闭全部</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from '@/components/ScrollPane/index.vue';

import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({
  name: 'TagsView',
  components: {
    ScrollPane,
  },
})
export default class TagsView extends Vue {
  visible = false;

  top = 0;

  left = 0;

  selectedTag = {};

  get visitedViews() {
    return this.$store.state.tagsView.visitedViews;
  }

  get sidebar() {
    return this.$store.getters.sidebar.opened;
  }

  mounted() {
    this.addViewTags();
  }

  toggleSideBar() {
    this.$store.dispatch('ToggleSideBar');
    // 侧边栏隐藏后要重新触发resize让图表自适应
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 250);
  }

  generateRoute() {
    if (this.$route.name) {
      return this.$route;
    }
    return false;
  }

  isActive(route) {
    return route.path === this.$route.path || route.name === this.$route.name;
  }

  addViewTags() {
    const route = this.generateRoute();
    if (!route) {
      return false;
    }
    this.$store.dispatch('addVisitedViews', route);
    return null;
  }

  moveToCurrentTag() {
    const tags = this.$refs.tag;
    this.$nextTick(() => {
      for (const tag of tags) {
        if (tag.to === this.$route.path) {
          this.$refs.scrollPane.moveToTarget(tag.$el);
          break;
        }
      }
    });
  }

  closeSelectedTag(view) {
    this.$store.dispatch('delVisitedViews', view).then((views) => {
      if (this.isActive(view)) {
        const latestView = views.slice(-1)[0];
        if (latestView) {
          // 打开最后访问的选项卡
          this.$router.push(latestView.path);
        } else {
          this.$router.push('/');
        }
      }
    });
  }

  closeOthersTags() {
    this.$router.push(this.selectedTag.path);
    this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
      this.moveToCurrentTag();
    });
  }

  closeAllTags() {
    this.$store.dispatch('delAllViews');
    this.$router.push('/');
  }

  openMenu(tag, e) {
    this.visible = true;
    this.selectedTag = tag;
    if (!this.sidebar) {
      this.left = e.clientX - 40;
    } else {
      this.left = e.clientX - 180;
    }
    this.top = e.clientY - 28;
  }

  closeMenu() {
    this.visible = false;
  }

  @Watch('$route')
  routerChange() {
    this.addViewTags();
    this.moveToCurrentTag();
  }

  @Watch('$visible')
  visibleChange(value) {
    if (value) {
      window.addEventListener('click', this.closeMenu);
    } else {
      window.removeEventListener('click', this.closeMenu);
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
  height: 40px;
  box-shadow: 0 1px 15px 1px rgba(69, 65, 78, 0.1);
  position: relative;
  z-index: 4;
  background-color: white;
  .tags-view-wrapper {
    background: #fff;
    height: 40px;
    float: left;
    width: calc(100% - 31px);
    .tags-view-item {
      display: inline-block;
      position: relative;
      color: #333;
      background: #fff;
      padding: 0 8px;

      &:first-of-type {
        margin-left: 15px;
      }
      &.active {
        background: #f2f2f2;
        color: #000;
        margin-top: 5px;
        border: 1px solid #002140;
        border-radius: 2px;
        padding: 4px 13px 0 13px;
        height: 30px;
        box-sizing: border-box;
        .el-icon-close {
          color: #333;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      margin-left: 2px;
      color: #bdbdbd;
      &:before {
        display: inline-block;
        vertical-align: -2px;
      }
      &:hover {
        background-color: #c00;
        color: #fff !important;
      }
    }
  }
}
</style>
