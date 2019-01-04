<template>
  <div
    :class="className"
    :id="id"
    :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import './wonderland.js'

export default {
  props: {
    className: {
      type: String,
      default: 'chart',
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
  },
  data() {
    return {
      chart: null,
    }
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
      this.chart = echarts.init(document.getElementById(this.id), 'macarons')

      this.chart.setOption({
        title: {
          text: '测试',
          left: '29%',
          top: '40%',
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
          // formatter: function (name) {
          //     let value = "";
          //     for (let k in this.FilingChartData) {
          //         let obj = this.FilingChartData[k];
          //         if (obj.name == name) {
          //             value = obj.value;
          //             break;
          //         }
          //     }
          //     if (name.length > 8) {

          //         name = name.substring(0, 8) + "\n" + name.substring(8, name.length);
          //     }
          //     return name + " : " + value + "人";
          // },
          data: ['信访举报', '上级交办', '监督检查中发现', '审查调查中发现', '审计中发现', '巡视巡察中发现', '公检法机关移送', '其他行政执法机关移送', '其他'],
        },


        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '80%'],
            center: ['30%', '50%'],
            data: JSON.parse('[{ "name": "信访举报", "value":"104"},{ "name": "上级交办", "value":"3"},{ "name": "监督检查中发现", "value":"7"},{ "name": "审查调查中发现", "value":"125"},{ "name": "审计中发现", "value":"24"},{ "name": "巡视巡察中发现", "value":"6"},{ "name": "公检法机关移送", "value":"6"},{ "name": "其他行政执法机关移送", "value":"6"},{ "name": "其他", "value":"1"}]'),
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
    },
  },
}
</script>
