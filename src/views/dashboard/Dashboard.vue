<!--
 * @file: DashBoard
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019-04-12 19:42:47
 -->

<template>
  <div class="dashboard-container">
   <iframe width="100%" height="100%" frameborder="0" src="/three/index.html"></iframe>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'Dashboard',
})
export default class Dashboard extends Vue {}
</script>
<style lang="scss" scoped>
.dashboard-container{
  height:100%;
  width:100%;
}
</style>
