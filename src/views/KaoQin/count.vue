<template>
  <div id="count">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-date"></i> 月报</span>
        <el-tabs :tab-position="tabPosition" style="height: 700px;">
          <el-tab-pane label="个人月报">
            <el-date-picker @change="setMonth" v-model="params.month" type="month" placeholder="选择月份" style="width:200px"  value-format="yyyy-MM">
            </el-date-picker>
            <el-input placeholder="请输入工号/姓名" v-model="params.name" style="display:inline-block;width:200px;padding-bottom:10px;">
            </el-input>
            <el-button type="primary" icon="el-icon-search" @click="SearchPersonByMonth">搜索</el-button>

            <el-card style="position:absolute;left:40%;top:100px;width:200px" v-show="vacation!=''">
              <h4>
                请假:{{vacation}}次
              </h4>
              <h4>
                迟到/早退:{{early_later}}次
              </h4>
              <h4>
                正常出勤:{{normal}}次
              </h4>
            </el-card>
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
 
  import echarts from 'echarts'
import {SearchPersonByMonth} from '@/api/KaoQin/Attendance'

  export default {
    name: '',
    data() {
      return {
        data: [],
        tabPosition: 'left',
        params: {
          month: "",
          name: ""
        },
    
          vacation:"",
          early_later:"",
          normal:""
        

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

      drawPersonMonth() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          tooltip: {
            position: 'top'
          },

          calendar: [{
            orient: 'vertical',

            range: '2018-01',

            cellSize: ['auto', 50],
            yearLabel: {
              margin: 40
            },
            monthLabel: {
              nameMap: 'cn',
              margin: 15
            },
            dayLabel: {
              firstDay: 1,
              margin: 15,

              nameMap: 'cn'
            }
          }],

          series: [{
            type: 'scatter',
            coordinateSystem: 'calendar',
            calendarIndex: 0,
            data: this.data
          }]

        })

      },
      drawPersonYear() {
        let myChart = echarts.init(document.getElementById('main'))

        myChart.setOption({
          tooltip: {
            position: 'top'
          },

          calendar: [{
            range: ['2018-01-01', '2018-12-31'],

            cellSize: ['auto', 20],
            yearLabel: {
              margin: 40
            },
            monthLabel: {
              nameMap: 'cn',
              margin: 20
            },
            dayLabel: {
              nameMap: 'cn'
            }
          }],

          series: [{
            type: 'scatter',
            coordinateSystem: 'calendar',
            calendarIndex: 0,
            data: this.data
          }]

        })


      },
       setMonth(val) {
         console.log(val);
            this.params.month=val;
        },

      SearchPersonByMonth(){
        
        SearchPersonByMonth(this.params).then(response => {
                  this.vacation =response.data.vaction;
                  this.normal = response.data.normal;
                  this.early_later = response.data.ealry_later;
        })
      }

    },
    //调用
    created() {
      this.data = this.getVirtulData(2018)
    },
    mounted() {
      this.$nextTick(function () {
        // this.drawPie('main1')
        this.drawPersonYear()
        this.drawPersonMonth()
      })
    }
    
  }

</script>
<style lang="scss" scoped>


</style>
