<template>
  <div id="count">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-date"></i> 月报</span>
        <el-date-picker @change="setMonth" v-model="params.month" type="month" placeholder="选择月份" style="width:200px"  value-format="yyyy-MM">
            </el-date-picker>
            <el-input placeholder="请输入工号/姓名" v-model="params.name" style="display:inline-block;width:200px;padding-bottom:10px;">
            </el-input>
                          <el-button type="primary" icon="el-icon-search" @click="SearchPersonByMonth">搜索</el-button>

         
            <div class="charts">

              <div id="myChart" style="width: 600px;height: 400px;position:relative"></div>

 <el-card style="width:150px;position:absolute;left:650px;top:150px" v-show="vacation!==''">
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
            </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-date"></i> 年报</span>
      
            <el-input placeholder="请输入工号/姓名" v-model="params_year.name" style="display:inline-block;width:200px;padding-bottom:10px;">
            </el-input>
                          <el-button type="primary" icon="el-icon-search" @click="SearchPersonByYear">搜索</el-button>
                   <div id="main" style="width: 1200px;height: 400px;overflow:auto"></div>

      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<script>
import echarts from "echarts";
import { SearchPersonByMonth,SearchPersonByYear } from "@/api/Archive/Attendance";
import { parseTime } from "@/utils/index";
require("echarts/theme/roma");
export default {
  name: "",
  data() {
    return {
      tabPosition: "left",
      params: {
        month: new Date().format("yyyy-MM"),
        name: ""
      },
       params_year: {
        name: ""
      },
            data: [],

      tooltipdata: [],
      heatmapdata: [],
      simpledata: [],
      vacation: "",
      early_later: "",
      normal: "",
      MyChartPerson: null,
      option: null,
          data_year: [],

      tooltipdata_year: [],
      heatmapdata_year: [],
      simpledata_year: [],
    };
  },
  methods: {
    getVirtulData(year) {
      year = year || "2018";
      var date = +echarts.number.parseDate(year + "-01-01");
      var end = +echarts.number.parseDate(+year + 1 + "-01-01");
      var dayTime = 3600 * 24 * 1000;
      var data = [];
      for (var time = date; time < end; time += dayTime) {
        data.push([
          echarts.format.formatTime("yyyy-MM-dd", time),
          Math.floor(Math.random() * 10000)
        ]);
      }
      return data;
    },

    drawPersonMonth() {
      // 基于准备好的dom，初始化echarts实例
      this.MyChartPerson = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      let that = this;
      this.option = {
        tooltip: {
          formatter: function(params) {
            console.log(params);
            let res = "";
            if (params.seriesIndex == 0)
              res = `<span>上班时间:${
                params.value[2]
              }</span><br><span>下班时间:${params.value[3]}</span>`;
            if (params.seriesIndex == 1) {
              for (let i = 0; i < that.tooltipdata.length; i++) {
                let obj = that.tooltipdata[i];
                console.log(obj[0]);
                console.log(params.value[0]);
                if (obj[0] == params.value[0] && obj[1] != 1) {
                  res = `<span>上班时间:${obj[3]}</span><br><span>下班时间:${
                    obj[4]
                  }</span>`;
                } else if (obj[0] == params.value[0] && obj[1] == 1) {
                  res = `<span>${obj[5]}</span>`;
                }
              }
            }

            return res;
          }
        },

        calendar: [
          {
            left: "center",

            orient: "vertical",

            range: this.params.month,

            cellSize: ["auto", 50],
            yearLabel: {
              margin:40
           
            },
            monthLabel: {
              nameMap: "cn",
              margin: 15
            },
            dayLabel: {
              firstDay: 1,
              margin: 15,

              nameMap: "cn"
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#000",
                width: 2,
                type: "solid"
              }
            }
          }
        ],
        visualMap: {
          show: false,
          min: 0,
          max: 2,
          calculable: true,
          seriesIndex: [1],
          orient: "horizontal",
          left: "center",
          bottom: 20,
          inRange: {
            color: ["#90EE90", "#F08080", "#87CEFA"],
            opacity: 0.3
          },
          controller: {
            inRange: {
              opacity: 0.5
            }
          }
        },

        series: [
          {
            name: "显示",
            type: "scatter",
            coordinateSystem: "calendar",
            calendarIndex: 0,
            data: this.data,
            symbolSize: 1,
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  console.log(params);
                  var d = echarts.number.parseDate(params.value[0]);
                  let no = params.data[4];
                  if (no !== 1)
                    return (
                      d.getDate() +
                      "\n\n" +
                      params.data[2] +
                      "~" +
                      params.data[3]
                    );
                  else if (no == 1) {
                    return d.getDate() + "\n\n" + params.data[5];
                  }
                },
                textStyle: {
                  color: "#000"
                }
              }
            }
          },
          {
            name: "考勤",
            type: "heatmap",
            coordinateSystem: "calendar",
            calendarIndex: 0,

            data: this.heatmapdata
          }
        ]
      };
      this.MyChartPerson.setOption(this.option);
    },
    drawPersonYear() {
      let myChart = echarts.init(document.getElementById("main"), "vintage");
            let that = this;

      myChart.setOption({
    
        tooltip: {
          formatter: function(params) {
            console.log(params);
            let res = "";
            if (params.seriesIndex == 0)
              res = `<span>上班时间:${
                params.value[2]
              }</span><br><span>下班时间:${params.value[3]}</span>`;
            if (params.seriesIndex == 0) {
              for (let i = 0; i < that.tooltipdata_year.length; i++) {
                let obj = that.tooltipdata_year[i];
                if (obj[0] == params.value[0] && obj[1] != 1) {
                  res = `<span>上班时间:${obj[3]}</span><br><span>下班时间:${
                    obj[4]
                  }</span>`;
                } else if (obj[0] == params.value[0] && obj[1] == 1) {
                  res = `<span>${obj[5]}</span>`;
                }
              }
            }

            return res;
          }
        },

        calendar: [
          {


            range: ["2018-01-01","2018-12-31"],

             cellSize: [16, 20],
           
            monthLabel: {
              nameMap: "cn",
              margin: 15
            },
            dayLabel: {
              firstDay: 1,
              margin: 15,

              nameMap: "cn"
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#000",
                width: 2,
                type: "solid"
              }
            }
          }
        ],
        visualMap: {
          show: false,
          min: 0,
          max: 2,
          calculable: true,
          seriesIndex: [0],
          orient: "horizontal",
          left: "center",
          bottom: 20,
          inRange: {
            color: ["#90EE90", "#F08080", "#87CEFA"],
            opacity: 0.3
          },
          controller: {
            inRange: {
              opacity: 0.5
            }
          }
        },

        series: [
          // {
          //   name: "显示",
          //   type: "scatter",
          //   coordinateSystem: "calendar",
          //   calendarIndex: 0,
          //   data: this.data_year,
          //   symbolSize: 5
    
          // },
          {
            name: "考勤",
            type: "heatmap",
            coordinateSystem: "calendar",
            calendarIndex: 0,

            data: this.heatmapdata_year
          }
        ]
      },true);
    },
    setMonth(val) {
      this.params.month = val;
    },

    SearchPersonByMonth() {
      SearchPersonByMonth(this.params).then(response => {
        console.log(response.data);

if(response.data.length==0)return; //如果没有考勤信息则不显示

        this.vacation = response.data[0].vaction;
        this.normal = response.data[0].normal;
        this.early_later = response.data[0].ealry_later;
        this.simpledata = [];
        this.tooltipdata = [];
        this.data = [];
        for (let i = 0; i < response.data.length; i++) {
          let obj = response.data[i];
          this.simpledata.push([
            obj.Date.substring(0, 10),
            1,
            obj.StartTime,
            obj.EndTime,
            obj.Vacation,
            obj.Vacation_Reason
          ]);

          this.heatmapdata.push([obj.Date.substring(0, 10), obj.Vacation]);

          this.tooltipdata.push([
            obj.Date.substring(0, 10),
            obj.Vacation,
            1,
            obj.StartTime,
            obj.EndTime,
            obj.Vacation_Reason
          ]);
          //  this.simpledata.push([obj.Date.substring(0,10),obj.normal]);
        }

        this.data = this.simpledata;
         this.drawPersonMonth();
      });
    },
    SearchPersonByYear() {
      SearchPersonByYear(this.params_year).then(response => {
        console.log(response.data);

if(response.data.length==0)return; //如果没有考勤信息则不显示

       
        this.simpledata_year = [];
        this.tooltipdata_year = [];
        this.data_year = [];
        for (let i = 0; i < response.data.length; i++) {
          let obj = response.data[i];
          this.simpledata_year.push([
            obj.Date.substring(0, 10),
            1,
            obj.StartTime,
            obj.EndTime,
            obj.Vacation,
            obj.Vacation_Reason
          ]);

          this.heatmapdata_year.push([obj.Date.substring(0, 10), obj.Vacation]);

          this.tooltipdata_year.push([
            obj.Date.substring(0, 10),
            obj.Vacation,
            1,
            obj.StartTime,
            obj.EndTime,
            obj.Vacation_Reason
          ]);
          //  this.simpledata.push([obj.Date.substring(0,10),obj.normal]);
        }

        this.data_year = this.simpledata_year;
         this.drawPersonYear();
      });
    }
  },
  //调用
  created() {
    // this.data = this.getVirtulData(2018);
    console.log(this.data);
  },
  mounted() {
    this.$nextTick(() => {
      // this.drawPie('main1')
      this.drawPersonYear();
      this.drawPersonMonth();
    });
  }
};
</script>
<style lang="scss" scoped>
</style>
