<template>
  <div style="overflow:hidden">

    <el-row >
        <el-col :xs="24" :sm="24" :lg="12">
          <pieChart class="widget-box" width="100%" id="chart1"
       />
      </el-col>


    </el-row>


  </div>
</template>

<script>

import pieChart from '@/components/Charts/pieChart'

export default {
  name: 'dashboard',

  data() {
    return {
    }
  },
  methods: {

  },
  components: {
    pieChart,
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
