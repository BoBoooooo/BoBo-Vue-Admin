<!--
 * @file: 顶部导航
 * @copyright: BoBo
 * @author: BoBo
 * @Date: 2019-04-26 15:26:49
 -->

<template>
  <div>
    <el-header height="64px"
               :style="{
                 background:themeColor.header.backgroundColor
               }">
      <div class="title-container">
        <img class="header_logo"
             src="@/assets/logo.png">
        <span class="title" :style="{
          color:themeColor.header.textColor
        }">{{title}}</span>
      </div>
      <!-- 折叠侧边栏按钮 -->
      <Hamburger :toggle-click="toggleSideBar"
                 :is-active="!!sidebar"
                 :style="{
          color:themeColor.header.textColor
        }"
                 class="hamburger-container"
                 :class="{
                   isActive:!sidebar
                 }" />
      <!-- 即时通讯 -->
      <OnlineChat :style="{
          color:themeColor.header.textColor
        }"></OnlineChat>
      <!-- 姓名及下拉菜单 -->
      <div class="user-container">
        <img :src="photo"
             v-if="photo"
             class="photo"
             @click="showCard">
        <svgIcon class="photo"
                 v-else
                 icon-class="header_user"
                 @click.native="showCard"></svgIcon>
        <span :style="{
          color:themeColor.header.textColor
        }" class="userName el-dropdown-link"> {{ this.$store.getters.realname }}</span>
        <i :style="{
          color:themeColor.header.textColor
        }" class="el-icon-switch-button icon"
           @click="logOut"></i>
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
import PersonInfoCard from './PersonInfoCard.vue';

@Component({
  name: 'Header',
  components: {
    Hamburger,
    PersonInfoCard,
    OnlineChat,
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

  get title() {
    return this.config.systemName || process.env.VUE_APP_NAME;
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
.title-container {
  display: inline-block;
  padding-left: 20px;
  text-align: center;
  height: 64px;
  line-height: 64px;
  .header_logo {
    width: 42px;
    height: 42px;
    vertical-align: -13px;
    margin-right: 10px;
    border-radius: 50%;
  }
  .title {
    font-weight: 500;
    font-family: 'YaHei';
    font-size: 24px;
  }
  .icon {
    color: yellow;
  }
}
.el-header {
  color: black;
  padding-left: 0px !important;
  .hamburger-container {
    display: block;
    position: absolute;
    top: 22px;
    right: 240px;
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
// 姓名及下拉菜单
.user-container {
  height: 64px;
  float: right;
  line-height: 64px;
  text-align: center;
  .photo {
    width: 3em;
    height: 3em;
    vertical-align: -15px;
    border-radius: 50%;
    cursor: pointer;
  }
  .userName {
    text-align: center;
    vertical-align: middle;
    margin-left: 10px;
    margin-right: 5px;
    font-size: 18px;
  }
  .icon {
    font-size: 18px;
    display: inline;
    outline: none;
    cursor: pointer;
    vertical-align: -2px;
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
</style>
