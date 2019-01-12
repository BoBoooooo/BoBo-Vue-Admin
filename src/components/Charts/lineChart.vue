<!--
 * @Author: BoBo
 * @Date: 2019-01-06 23:08:21
 * @Description: 封装的一个基于echarts的柱状图组件

  porps{
   className : 自定义容器css
   id : 容器id(必填)
   height : 容器高度
   width : 容器宽度
   data : 图表数据源 ，需要符合官方柱状图的数据格式
   date : 柱状图横坐标时间
   title : 图表标题
   subtitle : 子标题
  }


 -->
<template>
  <div
    :class="className"
    :id="id"
    :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import 'echarts/theme/macarons'

export default {
  props: {
    className: {
      type: String,
    },
    id: {
      type: String,
      default: 'chart',
    },
    width: {
      type: String,
      default: '500px',
    },
    height: {
      type: String,
      default: '300px',
    },
    data: {
      type: Array,
      default: () => ([]),
    },
    date: {
      type: Array,
      default: () => ([]),
    },
    title: {
      type: String,
      default: '大标题',
    },
    subtitle: {
      type: String,
      default: '小标题',
    },
  },
  data() {
    return {
      chart: null,
    }
  },

  mounted() {
    this.initChart()
    this.__resizeHanlder = () => {
      if (this.chart) {
        this.chart.resize()
      }
    }
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },

  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id), 'macarons')


      this.chart.setOption({
        color: ['#FF7744', '#87CEFA'],
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          containLabel: true,
        },
        legend: {
          data: ['案件', '线索'],
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,

          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: { // 坐标轴刻度标签的相关设置。
            interval: 0, // 横轴信息全部显示
            rotate: -30, // -30度角倾斜显示
          },
          data: this.date,
        }],
        yAxis: [{
          type: 'value',
          name: '人数',
          position: 'left',
          // axisLabel: {
          //    formatter: '{value} '
          // }
        }],
        series: [{
          name: '线索',
          type: 'line',
          stack: '线索总量',
          areaStyle: { normal: {} },

          label: {
            normal: {
              show: true,
              position: 'top',
            },
          },
          lineStyle: {
            normal: {
              width: 1,
              shadowColor: 'rgba(0,0,0,0.4)',
              shadowBlur: 2,
              shadowOffsetY: 2,
            },
          },
          data: this.data[0],
        }, {
          name: '案件',
          type: 'line',
          stack: '案件总量',
          label: {
            normal: {
              show: true,
              position: 'top',
            },
          },
          areaStyle: { normal: {} },

          lineStyle: {
            normal: {
              width: 1,
              shadowColor: 'rgba(0,0,0,0.4)',
              shadowBlur: 2,
              shadowOffsetY: 2,
            },
          },
          data: this.data[1],
        }],
      })
    },
  },
}
</script>
