<!--
 * @file: DashBoard
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019-04-12 19:42:47
 -->

<template>
  <div class="workboard-container">
    <img class="home-page" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3320765880,3678643770&fm=26&gp=0.jpg">
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'Dashboard',
})
export default class Dashboard extends Vue {}
</script>
<style lang="scss" scoped>
.home-page {
  position: fixed;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
  // width: 100%;
}
</style>
