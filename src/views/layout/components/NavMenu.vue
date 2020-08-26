<!--
@file 左侧边栏菜单
@author BoBo
@copyright NanJing Anshare Tech .Com
@createDate 2018年11月13日15:17:37
-->
<template>
  <div id="menu-wrapper"
       ref="container2">
    <el-menu :default-active="$route.path"
             unique-opened
             mode="horizontal"
             background-color="transparent"
             text-color="#fff"
             active-text-color="#3f51b5"
             style="border:none"
             id="menu-container">
      <!-- 菜单项组件 -->
      <MenuItem :routes="routers" />
    </el-menu>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import MenuItem from './MenuItem.vue';

@Component({
  name: 'NavMenu',
  components: {
    MenuItem,
  },
  computed: {
    ...mapGetters(['routers']),
  },
})
export default class NavMenu extends Vue {
  mounted() {
    // 动态适应菜单栏宽度
    (document.getElementById('menu-wrapper') as HTMLElement).style.left = `${(document.getElementsByClassName('title-container')[0] as HTMLElement).offsetWidth + 30}px`;
    (document.getElementById('menu-wrapper') as HTMLElement).style.right = `${(document.getElementsByClassName('user-container')[0] as HTMLElement).offsetWidth + 30}px`;
  }

  handleDropDownCommand(command) {
    switch (command) {
      case 'contactus':
        // TODO:联系我们跳转外网无意义，需求确认后继续开发
        break;
      case 'changepwd':
        this.$prompt('请输入新密码', '提示', {
          confirmButtonText: '确定并重新登录',
          cancelButtonText: '取消',
        }).then(({ value } : any) => {
          this.$store.dispatch('changePassword', { password: value });
        });
        break;
      case 'logout':
        this.$store.dispatch('clearToken');
        break;
      default:
        break;
    }
  }
}
</script>
<style lang="scss" scoped>
#menu-wrapper {
  position: fixed;
  top: 0;
  height: 80px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  text-align: right;
  z-index: 2001;
}
</style>

<style rel="stylesheet/scss" lang="scss">
.el-menu--horizontal.el-menu {
  width: 100%;
  .el-submenu__icon-arrow {
    display: none;
  }
  .el-submenu__title {
    height: 80px;
    padding: 10px 20px !important;
    line-height: 35px;
    min-width: 80px;
    text-align: center;
  }
  .router-link-active > .el-menu-item {
    background: #17449d !important;
    color: #ffd04b;
  }
  .el-submenu.is-active {
    background: #17449d !important;
    color: #ffd04b;
  }
  .el-submenu.is-opened {
    background: #17449d !important;
    color: #ffd04b;
  }
  .el-submenu {
    display: inline-block;
    // float:left;
    height: 80px;
    color: white;
    height: 80px !important;
    line-height: 25px !important;
    &:hover {
      background-color: #17449d;
    }
    .el-menu-item {
      background-color: transparent !important;
      height: 40px;
      float: left;
      line-height: 40px;
      padding-left: 50px !important;
      padding-right: 30px !important;
    }
  }
  .el-menu-item {
    display: inline-block;
    padding: 10px 20px !important;
    line-height: 35px;
    height: 80px;
    min-width: 80px;
    text-align: center;
    color: white !important;
  }
}

/* 侧边栏hover（收起状态的左边栏不在app中，所以无法使用scoped） */
.el-menu-item,
.el-submenu > .el-submenu__title {
  transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.el-menu-item:hover,
.el-submenu > .el-submenu__title:hover {
  background: rgba(0, 0, 0, 0.07) !important;
}
// 打开子菜单的父级菜单
.el-submenu.is-active > .el-submenu__title {
  color: #fff !important;
}
.el-menu--horizontal {
  .el-menu--popup-bottom-start {
    margin-right: 0px;
    min-width: 150px;
    .el-submenu__title {
      color: #303133 !important;
    }
  }

  & > .el-menu {
    background: white !important;
    padding-left: 5px;
  }
  .el-menu-item {
    color: #303133 !important;
  }
}
</style>
