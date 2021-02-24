<!--
 * @file: 顶部导航
 * @copyright: BoBo
 * @author: BoBo
 * @Date: 2019-04-26 15:26:49
 -->

<template>
  <div>
    <el-header
      height="60px"
      :style="{
        background: themeColor.header.backgroundColor,
      }"
      class="header"
      :class="{
        hideSidebar: !sidebar,
      }"
    >
      <!-- 折叠侧边栏按钮 -->
      <Hamburger
        :toggle-click="toggleSideBar"
        :is-active="!!sidebar"
        :style="{
          color: themeColor.header.textColor,
        }"
        class="hamburger-container"
        :class="{
          isActive: !sidebar,
        }"
      />
      <!-- 面包屑导航 -->
      <Breadcrumb></Breadcrumb>

      <div class="header-right-container">
        <!-- 即时通讯 -->
        <OnlineChat
          :style="{
            color: themeColor.header.textColor,
          }"
        ></OnlineChat>
        <!-- 姓名及下拉菜单 -->
        <div class="user-container">
          <img :src="photo" v-if="photo" class="photo" @click="showCard" />
          <svgIcon class="photo" v-else icon-class="teacher" @click.native="showCard"></svgIcon>
          <span
            :style="{
              color: themeColor.header.textColor,
            }"
            class="userName el-dropdown-link"
          >
            {{ this.$store.getters.realname }}</span
          >
          <i
            :style="{
              color: themeColor.header.textColor,
            }"
            class="el-icon-switch-button icon"
            @click="logOut"
          ></i>
        </div>
      </div>
    </el-header>
    <PersonInfoCard ref="personInfoCard"></PersonInfoCard>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import Hamburger from '@/components/Hamburger/Hamburger.vue';
import themeColor from '@/styles/theme';
import OnlineChat from '@/components/OnlineChat/OnlineChat.vue';
import Breadcrumb from '@/components/Breadcrumb/index.vue';
import PersonInfoCard from './PersonInfoCard.vue';

@Component({
  name: 'Header',
  components: {
    Hamburger,
    PersonInfoCard,
    OnlineChat,
    Breadcrumb,
  },
})
export default class Header extends Vue {
  @Getter config!: SystemConfig;

  @Getter photo!: string;

  $refs!: {
    personInfoCard: HTMLFormElement;
  };

  themeColor = themeColor;

  get sidebar() {
    return this.$store.getters.sidebar.opened;
  }

  showCard() {
    this.$refs.personInfoCard.showDialog();
  }

  toggleSideBar() {
    this.$store.dispatch('ToggleSideBar');
  }

  logOut() {
    this.$store.dispatch('clearToken');
  }
}
</script>
<style scoped>
.tag >>> .el-tag__close {
  margin-top: 2px;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-header {
  position: fixed;
  left: 220px;
  right: 0;
  color: black;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  &.hideSidebar {
    left: 64px;
  }
  .hamburger-container {
    display: inline-block;
    height: 60px;
    line-height: 60px;
  }
  .logo {
    width: 2em;
    height: 2em;
    position: relative;
    top: 0.5em;
  }
}
.elevator {
  float: right;
  line-height: 100px;
  height: 64px;
  margin-right: 50px;
}
.header-right-container {
  align-items: center;
  justify-content: flex-end;
  right: 30px;
  position: absolute;
  display: flex;
  height: 60px;
  // 姓名及下拉菜单
  .user-container {
    height: 64px;
    float: right;
    line-height: 64px;
    text-align: center;
    .photo {
      width: 40px;
      height: 40px;
      vertical-align: -17px;
      border-radius: 50%;
      cursor: pointer;
    }
    .userName {
      text-align: center;
      vertical-align: middle;
      margin-left: 10px;
      margin-right: 5px;
      font-size: 14px;
    }
    .icon {
      font-size: 14px;
      display: inline;
      outline: none;
      cursor: pointer;
    }
    .user_icon {
      width: 28px;
      height: 28px;
      margin-top: 10px;
      margin-bottom: 8px;
      display: block;
      cursor: pointer;
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
