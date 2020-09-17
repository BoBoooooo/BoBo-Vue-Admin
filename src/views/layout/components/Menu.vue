<!--
@file 菜单
@author BoBo
@copyright NanJing Anshare Tech .Com
@createDate 2019-09-05 21:55:47
-->
<template>
  <!-- 导航菜单+滚动条 -->
  <el-menu collapse
           :default-active="$route.path"
           unique-opened
           mode="vertical"
           background-color="#f5e8e8"
           text-color="#000"
           active-text-color="#3f51b5"
           class="menu">
    <!-- 菜单项组件 -->
    <MenuItem :routes="routers" />
  </el-menu>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import MenuItem from './MenuItem.vue';

@Component({
  name: 'Menu',
  components: {
    MenuItem,
  },
  computed: {
    ...mapGetters(['routers']),
  },
})

export default class Menu extends Vue {

}
</script>
<style scoped>
.el-submenu__icon-arrow el-icon-arrow-right {
  display: none;
}
</style>
<style lang="scss" scoped>
.menu {
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  left:0;
  z-index:200;
  width: 34px;
  top: 100px;
  max-height:80%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
   &::-webkit-scrollbar {
    display: none;
  }
}
</style>
