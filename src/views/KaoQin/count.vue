<template>
  <div id="count">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-date"></i> 月报</span>
        <el-tabs :tab-position="tabPosition" style="height: 700px;">
          <el-tab-pane label="个人月报">
            <div class="charts">
              <div id="myChart" style="width: 600px;height: 400px;"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="部门月报"></el-tab-pane>

        </el-tabs>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-date"></i> 年报</span>
        <el-tabs :tab-position="tabPosition" style="height: 700px;">
          <el-tab-pane label="个人年报">
            <div id="main" style="width: 1200px;height: 600px;"></div>
          </el-tab-pane>
          <el-tab-pane label="部门年报"></el-tab-pane>

        </el-tabs>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<script>
  // 引入基本模板
  // 引入 ECharts 主模块
  var echarts = require('echarts/lib/echarts');
  // 引入柱状图
  require('echarts/lib/chart/heatmap');
    require('echarts/lib/chart/bar');
        require('echarts/lib/chart/pie');


  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');

  require('echarts/lib/chart/scatter');


  export default {
    name: '',
    data() {
      return {
        tabPosition: 'left',
      }
    },
    methods: {

      getVirtulData(year) {
        year = year || '2018';
        var date = +echarts.number.parseDate(year + '-01-01');
        var end = +echarts.number.parseDate((+year + 1) + '-01-01');
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        for (var time = date; time < end; time += dayTime) {
          data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 10000)
          ]);
        }
        return data;
      },

       drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '个人月报' },
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
      });
    },
      // drawPie(id) {
      //   this.charts = echarts.init(document.getElementById(id))
      //   this.charts.setOption({
      //     tooltip: {
      //       position: 'top'
      //     },
      //     calendar: [{
      //       orient: 'vertical',
      //       yearLabel: {
      //         margin: 40
      //       },
      //       dayLabel: {
      //         firstDay: 1,
      //         nameMap: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      //       },
      //       monthLabel: {
      //         nameMap: 'cn',
      //         margin: 20
      //       },
      //       cellSize: 40,
      //       top: 100,
      //       left: 50,
      //       range: '2017-04'
      //     }],

      //     series: [{
      //       type: 'scatter',
      //       coordinateSystem: 'calendar',
      //       calendarIndex: 0,
      //       symbolSize: function (val) {
      //         return val[1] / 60;
      //       },
      //       data: []
      //     }]
      //   })
      // },
      drawPie_Year() {
        let myChart = echarts.init(document.getElementById('main'))

        let data = this.getVirtulData(2018);
        myChart.setOption({

          title: {
            top: 30,
            text: '个人年度报表',
            left: 'center',
            textStyle: {
              color: '#000'
            }
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '30',
            left: '100',
            data: ['步数', 'Top 12'],
            textStyle: {
              color: '#000'
            }
          },
          calendar: [{
            top: 100,
            left: 'center',
            range: ['2018-01-01', '2018-12-31'],
            splitLine: {
              show: true,
              lineStyle: {
                color: '#000',
                width: 4,
                type: 'solid'
              }
            },
            yearLabel: {
              formatter: '{start}  1st',
              textStyle: {
                color: '#fff'
              }
            },
            itemStyle: {
              normal: {
                color: '#323c48',
                borderWidth: 1,
                borderColor: '#111'
              }
            }
          }],
          series: [{
              name: '步数',
              type: 'scatter',
              coordinateSystem: 'calendar',
              data: data,
              symbolSize: function (val) {
                return val[1] / 500;
              },
              itemStyle: {
                normal: {
                  color: '#ddb926'
                }
              }
            }

          ]
        })


      }
    },
    //调用
    mounted() {
      this.$nextTick(function () {
        // this.drawPie('main1')
        this.drawPie_Year()
        this.drawLine()
      })
    }
  }

</script>
<style lang="scss" scoped>


</style>
