<template>
  <div style="overflow:hidden">

    <el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="8">
         <el-card  class="widget-box">
          总是显示
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card  class="widget-box">
      总是显示
    </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card  class="widget-box">
      总是显示
    </el-card>
      </el-col>
    </el-row>


  </div>
</template>

<script>

import VueCharts from 'vue-chartjs'

export default {
  name: 'dashboard',

  data() {
    return {
    }
  },
  methods: {

  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  height:100%;
  background-color: #fff;
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
