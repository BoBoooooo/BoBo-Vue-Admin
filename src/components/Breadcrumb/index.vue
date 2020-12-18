<!--
 * @file: 面包屑导航
 * @copyright: BoBo
 * @author: BoBo
 * @Date: 2019-08-07 10:50:56
 -->
<template>
  <div class="bread-container">
    <i class="el-icon-s-home icon"></i>
    <span class="el-breadcrumb__separator">-</span>
    <el-breadcrumb class="app-breadcrumb"
                   separator="-">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index) in levelList"
                            :key="item.path">
          <span v-if="item.redirect==='noRedirect'||index==levelList.length-1"
                class="no-redirect">{{ item.meta.title }}</span>
          <a v-else
             @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>

</template>

<script>
export default {
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return;
      }
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  computed: {
    routerName() {
      return this.$route.meta.title;
    },
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
      const first = matched[0];

      if (!this.isDashboard(first)) {
        matched = [{ path: '/', meta: { title: '首页' } }].concat(matched);
      }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false);
    },
    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase().includes('dashboard'.toLocaleLowerCase());
    },
    pathCompile(path) {
      return path;
    },
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    },
  },
};
</script>
<style scoped>
.app-breadcrumb >>> .el-breadcrumb__separator {
  color: rgba(0, 0, 0, 0.38);
}
.app-breadcrumb >>> .el-breadcrumb__inner.is-link,
.el-breadcrumb__inner a {
  color: #3f51b5;
  cursor: pointer;
}
</style>
<style lang="scss" scoped>
.bread-container {
  display: block;
  margin-bottom: 20px;
  .icon {
    width: 18px;
    height: 18px;
    margin-left: 8px;
    color: rgba(0, 0, 0, 0.54);
  }
  .el-breadcrumb__separator {
    color: rgba(0, 0, 0, 0.38);
  }
  h3 {
    width: auto;
    font-weight: 340;
    font-size: 24px;
    margin: 0;
    display: inline-block;
  }
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 10.9px;
    .no-redirect {
      color: rgba(0, 0, 0, 0.38);
      cursor: text;
    }
  }
}
</style>
