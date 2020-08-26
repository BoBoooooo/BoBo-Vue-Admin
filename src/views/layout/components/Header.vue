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
               style="background:#1a4bae">
      <div class="title-container"
           :class="{close:isCollapse}">
        <img class="header_logo"
             src="@/assets/logo.png">
        <span class="title">{{title}}</span>
      </div>
      <!-- Nav菜单栏 -->
      <NavMenu></NavMenu>
      <!-- 姓名及下拉菜单 -->
      <div class="user-container"
           :class="{close:isCollapse}">
        <img :src="photo"
             v-if="photo"
             class="photo"
             @click="showCard">
        <svgIcon class="photo"
                 v-else
                 icon-class="header_user"
                 @click.native="showCard"></svgIcon>
        <span class="userName el-dropdown-link"> {{ this.$store.getters.realname }}
          <i class="el-icon-switch-button icon"
             @click="logOut"></i></span>
      </div>
    </el-header>
    <PersonInfoCard ref="personInfoCard"></PersonInfoCard>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Hamburger from '@/components/Hamburger/Hamburger.vue';
import PersonInfoCard from './PersonInfoCard.vue';
import NavMenu from './NavMenu.vue';

@Component({
  name: 'Header',
  components: {
    // Hamburger,
    PersonInfoCard,
    NavMenu,
  },
  computed: {
    ...mapGetters(['menuNum', 'candidateUser', 'photo', 'config']),
  },
})
export default class Header extends Vue {
  visibleMember = false;

  config!: any;

  $refs!: {
    personInfoCard: HTMLFormElement;
  };

  get isCollapse() {
    return !this.$store.getters.sidebar.opened;
  }

  get sidebar() {
    return this.$store.getters.sidebar.opened;
  }

  get title() {
    return this.config.systemName || process.env.VUE_APP_NAME;
  }

  showCard() {
    this.$refs.personInfoCard.showDialog();
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
  padding-left: 50px;
  text-align: center;
  height: 80px;
  line-height: 80px;
  .header_logo {
    width: 3em;
    height: 3em;
    vertical-align: -13px;
    margin-right: 20px;
  }
  .title {
    font-weight: 500;
    font-family: 'YaHei';
    font-size: 24px;
    text-shadow: 2px 2px 2px #000;
    color: white;
  }
  .icon {
    text-shadow: 3px 3px 3px #000;
    color: yellow;
  }
}
.el-header {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
  color: #fff;
  padding-left: 0px !important;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  .logo {
    width: 2em;
    height: 2em;
    position: relative;
    top: 0.5em;
  }
  .hamburger-container {
    display: block;
    position: absolute;
    top: 1.3em;
    left: 250px;
    color: #fff;
  }
}

// 姓名及下拉菜单
.user-container {
  top: 7px;
  height: 80px;
  position: fixed;
  right: 0;
  text-align: center;
  padding: 0 5px;
  width: auto;
  color: #fff;
  .photo {
    width: 3em;
    height: 3em;
    display: block;
    margin: 0 auto !important;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 1s ease-in-out;
    &:hover {
      transform: rotateZ(360deg);
    }
  }
  .userName {
    color: #fff;
    text-align: center;
    vertical-align: middle;
    font-size: 16px;
    display: inline-block;
    width: auto;
    text-shadow: 1px 1px 1px #606266;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .icon {
    color: #fff;
    font-size: 18px;
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
</style>
