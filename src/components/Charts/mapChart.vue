<!--
 * @Author: BoBo
 * @Date: 2019-01-04 17:53:03
 * @Description: 封装的一个基于echarts的饼图组件

  porps{
   className : 自定义容器css
   id : 容器id(必填)
   height : 容器高度
   width : 容器宽度
   data : 江苏省地图map数据
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
import chartData from './Charts_Fake'
import mapJson from './jiangsu.json'

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
    title: {
      type: String,
      default: '大标题',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      chart: null,
      chartData,
      mapJson,
    }
  },
  computed: {
    legand() {
      const arr = []
      this.data.forEach((item) => {
        arr.push(item.name)
      })
      return arr
    },
  },
  mounted() {
    this.initChart()
    this.chart = null
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      echarts.registerMap('jiangsu', this.mapJson);

      this.chart = echarts.init(document.getElementById(this.id), 'macarons')


      this.chart.setOption(
        {
          series: [{
            type: 'map',
            map: 'jiangsu',
            data: this.chartData.mapData,
            selectedMode: 'single',
            zoom: 1.2,
            label: {
              normal: {
                show: true,
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                areaColor: '#323c48',
                borderColor: '#111',
              },
              emphasis: {// 鼠标移入高亮显颜色
                areaColor: '#f46d43',
              },
            },

          }],

          visualMap: {
            show: false,
            min: 0,
            max: 50000,
            realtime: false,
            calculable: true,
            inRange: {
              color: ['lightskyblue', 'yellow', 'orangered'],
            },
            left: 'right',
            top: 'top',
          },
        }, true,
      )


      window.onresize = () => {
        this.chart.resize()
      }
    },
  },
}
</script>
