<!--
 * @file: 顶部导航
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019-04-26 15:26:49
 -->

<template>
  <div>
    <el-header height="80px"
               class="navHeader"
               style="background:#f0f3f7">
      <div class="title-container close"
           id="title-container">
        <img class="header_logo"
             src="@/assets/logo.png">
        <span class="title">{{title}}</span>
      </div>
      <!-- 姓名及下拉菜单 -->
      <div class="user-container"
           id="user-container"
           :class="{close:isCollapse}">
        <img :src="photo"
             v-if="photo"
             class="photo"
             @click="showCard">
        <svgIcon class="photo"
                 v-else
                 icon-class="header_user"
                 @click.native="showCard"></svgIcon>
        <span class="userName el-dropdown-link"> {{ this.$store.getters.realname }}</span>
        <i class="el-icon-switch-button icon"
           @click="logOut"></i>
      </div>
      <NavMenu />
    </el-header>
    <PersonInfoCard ref="personInfoCard"></PersonInfoCard>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Hamburger from '@/components/Hamburger/Hamburger.vue';
import PersonInfoCard from './PersonInfoCard.vue';

import NavMenu from './NavMenu.vue';

export default {
  name: 'Header',
  components: {
    // Hamburger,
    PersonInfoCard,
    NavMenu,
  },
  data() {
    return {
      visibleMember: false,
      driver: null,
    };
  },
  computed: {
    isCollapse() {
      return !this.$store.getters.sidebar.opened;
    },
    sidebar() {
      return this.$store.getters.sidebar.opened;
    },
    // 是否是外网脱敏版本
    isPublic() {
      return process.env.VUE_APP_ISPUBLIC === 'true';
    },
    ...mapGetters(['menuNum', 'candidateUser', 'photo']),
    title() {
      return process.env.VUE_APP_NAME;
    },
  },
  methods: {
    showCard() {
      this.$refs.personInfoCard.showDialog();
    },
    logOut() {
      this.$store.dispatch('clearToken');
    },
  },
};
</script>
<style scoped>
.tag >>> .el-tag__close {
  margin-top: 2px;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.title-container {
  display: inline-block;
  padding-left: 50px;
  text-align: center;
  height: 80px;
  line-height: 80px;
  .header_logo {
    width: 3em;
    height: 3em;
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
  height: 80px;
  margin-right: 50px;
}
// 姓名及下拉菜单
.user-container {
  height: 80px;
  float: right;
  line-height: 80px;
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
