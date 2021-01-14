<!--
 * @file: OnlineChat
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2020年11月16 16:29:48
-->

<template>
  <el-tooltip content="在线交流" placement="bottom">
    <i class="chat-icon el-icon el-icon-chat-dot-round" @click="redirectToChat"></i>
  </el-tooltip>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { Getter } from 'vuex-class';

@Component({
  name: 'OnlineChat',
})
export default class OnlineChat extends Vue {
  @Getter userid!: string;

  @Getter realname!: string;

  redirectToChat() {
    this.openwindow(`${this.CHAT_URL}?userId=${this.userid}&username=${this.realname}`, '在线交流', 1024, 680);
  }

  openwindow(url, name, iWidth, iHeight) {
    const iTop = (window.screen.availHeight - 30 - iHeight) / 2; // 获得窗口的垂直位置;
    const iLeft = (window.screen.availWidth - 10 - iWidth) / 2; // 获得窗口的水平位置;
    window.open(
      url,
      name,
      `height=${iHeight},,innerHeight=${iHeight},width=${iWidth},innerWidth=${iWidth},top=${iTop},left=${iLeft},
      toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no`,
    );
  }
}
</script>

<style lang="scss" scoped>
.chat-icon {
  position: absolute;
  cursor: pointer;
  right: 280px;
  top: 21px;
  font-size: 18px;
}
</style>
