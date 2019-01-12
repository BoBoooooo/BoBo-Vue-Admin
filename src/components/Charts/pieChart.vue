<!--
 * @Author: BoBo
 * @Date: 2019-01-04 17:53:03
 * @Description: 封装的一个基于echarts的饼图组件

  porps{
   className : 自定义容器css
   id : 容器id(必填)
   height : 容器高度
   width : 容器宽度
   data : 图表数据源 ，需要符合官方饼图的数据格式
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
        title: {
          text: this.title,
          subtext: this.subtitle,
          left: '29%',
          top: '43%',
          textAlign: 'center',
          textStyle: {
            fontSize: 14,
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },


        legend: {
          type: 'scroll',
          orient: 'vertical',
          show: true,
          right: 0,
          top: 35,
          bottom: 20,
          textStyle: {
            fontSize: 12,
          },

          data: this.legand,
        },


        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '80%'],
            center: ['30%', '50%'],
            data: this.data,
            label: {
              normal: {
                textStyle: {
                  fontWeight: 'normal',
                  fontSize: 16,
                },
                show: false,

              },
            },
            labelLine: {
              normal: {
                show: false, // show设置线是否显示，默认为true，可选值：true ¦ false
              },
            },

            itemStyle: {
              normal: {
                borderWidth: 3,
                borderColor: '#fff',

              },

            },
          },
        ],
      })

      window.onresize = () => {
        this.chart.resize()
      }
    },
  },
}
</script>
