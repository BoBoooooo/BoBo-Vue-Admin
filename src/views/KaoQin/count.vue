<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-date"></i> 月报</span>
        <el-tabs :tab-position="tabPosition" style="height: 200px;">
          <el-tab-pane label="个人月报">
            <div class="charts">
              <div id="myChart" :style="{width:'300px',height:'300px'}"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="部门月报"></el-tab-pane>

        </el-tabs>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-date"></i> 年报</span>
        <el-tabs :tab-position="tabPosition" style="height: 200px;">
          <el-tab-pane label="个人年报"></el-tab-pane>
          <el-tab-pane label="部门年报"></el-tab-pane>

        </el-tabs>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<script>
  // 引入 ECharts 主模块
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图
  require('echarts/lib/chart/bar')
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    data() {
      return {
        tabPosition: 'top'
      };
    },
    mounted() {
      this.initCharts();
    },
    methods: {
      initCharts() {
        this.chart = echarts.init(this.$el);
        this.setOptions();
      },
      setOptions() {
        this.chart.setOption({
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        })
      }
    }

  };

</script>
<style lang="scss" scoped>


</style>
