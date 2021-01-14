<!--
 * @file: DashBoard
 * @copyright: BoBo
 * @author: BoBo
 * @Date: 2019-04-12 19:42:47
 -->

<template>
  <div class="dashboard-container">
    <el-card shadow="never">
      你好 {{realname}}
    </el-card>
    <el-card class="mt-15">
      <div slot="header"
           class="clearfix">
        <span>我的开源项目</span>
      </div>
      <div class="demo-container">
        <div v-for="(o) in 9"
             :key="o"
             class="item">
          <el-card :body-style="{ padding: '0px' }">
            <img src="http://img1.mukewang.com/szimg/5fd343d9093a7d0e05400304.png"
                 class="image">
            <div style="padding: 14px;">
              <span>开源项目</span>
            </div>
          </el-card>

        </div>
      </div>
    </el-card>

  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component({
  name: 'Dashboard',
})
export default class Dashboard extends Vue {
  @Getter realname!: string;
}
</script>
<style lang="scss" scoped>
.dashboard-container {
  height: 100%;
  width: 100%;
  .demo-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      margin: 15px;
      .image {
        height: 152px;
      }
    }
  }
}
</style>
