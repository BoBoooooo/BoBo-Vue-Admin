<!--
 * @file: 顶部导航
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019-04-26 15:26:49
 -->

<template>
  <div>
    <el-header height="64px"
               style="background:#fff">
      <div class="title-container">
        <img class="header_logo"
             src="@/assets/logo.png">
        <span class="title">{{title}}</span>
      </div>
      <!-- 折叠侧边栏按钮 -->
      <Hamburger :toggle-click="toggleSideBar"
                 :is-active="!!sidebar"
                 class="hamburger-container"
                 :class="{
                   isActive:!sidebar
                 }" />
      <!-- 姓名及下拉菜单 -->
      <div class="user-container">
        <img :src="photo"
             v-if="photo"
             class="photo"
             @click="showCard">
        <svgIcon class="photo"
                 v-else
                 icon-class="header_user"
                 @click="showCard"></svgIcon>
        <span class="userName el-dropdown-link"> {{ this.$store.getters.realname }}</span>
        <i class="el-icon-switch-button icon"
           @click="logOut"></i>
      </div>
    </el-header>
    <PersonInfoCard ref="personInfoCard"></PersonInfoCard>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapGetters } from 'vuex';
import Hamburger from '@/components/Hamburger/Hamburger.vue';
import PersonInfoCard from './PersonInfoCard.vue';

@Options({
  name: 'Header',
  components: {
    Hamburger,
    PersonInfoCard,
  },
  computed: {
    ...mapGetters(['menuNum', 'photo', 'config']),
  },
})
export default class Header extends Vue {
  visibleMember = false;

  config!: any;

  $refs!: {
    personInfoCard: HTMLFormElement;
  };

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
    margin-right: 20px;
    border-radius: 50%;
  }
  .title {
    font-weight: 500;
    font-family: 'YaHei';
    font-size: 24px;
    text-shadow: 1px 1px 1px #9e9e9e;
    color: #3f51b5;
  }
  .icon {
    text-shadow: 3px 3px 3px #000;
    color: yellow;
  }
}
.el-header {
  color: black;
  padding-left: 0px !important;
  .hamburger-container {
    display: block;
    position: absolute;
    top: 20px;
    right: 280px;
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
    color: #777777;
    text-align: center;
    vertical-align: middle;
    margin-left: 10px;
    margin-right: 5px;
    font-size: 18px;
  }
  .icon {
    color: #707070;
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
