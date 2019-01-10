<template>
  <div style="overflow:hidden">

<el-row :gutter="32">

        <el-col :xs="8" :sm="8" :lg="8">
          <el-card class="box-card widget-box no-padding">
  <div slot="header" class="clearfix">
    <span>江苏省地图</span>
  </div>
  <map-chart  width="100%" id="chart5" height="800px"></map-chart>

</el-card>


  </el-col>

        <el-col :xs="16" :sm="16" :lg="16">

<el-row  :gutter="32">
        <el-col :xs="24" :sm="24" :lg="24">
          <lineChart  :data="lineChartData" :date="chartData.Month" class="widget-box" height="400px" width="100%" id="chart0"
       />
      </el-col>


    </el-row>


    <el-row  :gutter="32">
        <el-col :xs="24" :sm="24" :lg="12">
          <pieChart title="线索来源"  :data="chartData.ClueSource" class="widget-box" width="100%" id="chart1"
       />
      </el-col>

 <el-col :xs="24" :sm="24" :lg="12">
          <pieChart class="widget-box" title="职务违法犯罪"   :data="chartData.FilingChartData" width="100%" id="chart2"
       />
      </el-col>


    </el-row>


     <el-row  :gutter="32">
        <el-col :xs="24" :sm="24" :lg="12">
          <pieChart title="违反六大纪律"  :data="chartData.six" class="widget-box" width="100%" id="chart3"
       />
      </el-col>

 <el-col :xs="24" :sm="24" :lg="12">
          <pieChart class="widget-box" title="党纪处分"   :data="chartData.PartyPunish" width="100%" id="chart4"
       />
      </el-col>


    </el-row>
  </el-col>
</el-row>


  </div>
</template>

<script>
import chartData from '@/components/Charts/data/Charts_Fake'
import pieChart from '@/components/Charts/pieChart'
import lineChart from '@/components/Charts/lineChart'
import mapChart from '@/components/Charts/mapChart'

export default {
  name: 'dashboard',

  data() {
    const lineChartData = [chartData.ClueData, chartData.FilingData]

    return {
      chartData,
      lineChartData,
    }
  },
  methods: {

  },
  components: {
    pieChart,
    lineChart,
    mapChart,
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
.widget-box{
  border-radius: 8px!important;
}
.el-main{
  padding:0px 0px 0px 30px;
}
</style>
