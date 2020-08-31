<!--
 * @file: 消息盒子
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019年12月13 17:08:17
 -->
<template>
  <div class="container">
    <el-tooltip class="item"
                effect="dark"
                content="点击查看通知公告!"
                placement="left">
      <el-badge :value="menuNum.summary"
                :max="9"
                class="item">
        <svgIcon icon-class="notification"
                 class="icon"
                 @click.native="visible = true"></svgIcon>
      </el-badge>
    </el-tooltip>
    <BoxDialog @close="visible = false"
               :visible="visible"
               v-if="visible"></BoxDialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { crud, DML } from '@/api/public/crud';
import BoxDialog from './components/BoxDialog.vue';

export default {
  name: 'MessageBox',
  data() {
    return {
      visible: false,
    };
  },
  components: {
    BoxDialog,
  },
  computed: {
    ...mapGetters(['menuNum']),
  },
};
</script>
<style lang="scss" scoped>
.icon {
  width: 2.5em !important;
  height: 100% !important;
  cursor: pointer;
  // margin-top: 16px;
  // margin-bottom: 16px;
  transition: all 0.5s ease-out;
  &:hover {
  box-shadow: 0px 4px 12px 0px rgba(7, 17, 27, 0.1);
  }
}
</style>
