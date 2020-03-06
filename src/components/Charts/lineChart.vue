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
    ref="chart"
    :style="{height:'100%',width:width,minHeight:height}"/>
</template>

<script>
import echarts from 'echarts';

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
    type: {
      type: String,
      default: 'bar',
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
    };
  },

  mounted() {
    this.initChart();
    this.resizeHanlder = () => {
      if (this.chart) {
        this.chart.resize();
      }
    };
    window.addEventListener('resize', this.resizeHanlder);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener('resize', this.resizeHanlder);
    this.chart.dispose();
    this.chart = null;
  },
  computed: {
    legand() {
      const arr = [];
      this.data.forEach((item) => {
        arr.push(item.name);
      });
      return arr;
    },
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart);
      this.chart.setOption({
        color: ['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#ff7c7c', '#9287e7'],
        tooltip: {
          trigger: 'axis',
        },
        title: {
          text: this.title,
          left: '15%',
          top: '0',
          textAlign: 'center',
          textStyle: {
            fontSize: 14,
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [{
          type: 'category',
          data: this.legand,
          axisLabel: { // 坐标轴刻度标签的相关设置。
            formatter(params) {
              let newParamsName = '';// 最终拼接成的字符串
              const paramsNameNumber = params.length;// 实际标签的个数
              const provideNumber = 5;// 每行能显示的字的个数
              const rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
              /**
                * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
              */
              // 条件等同于rowNumber>1
              if (paramsNameNumber > provideNumber) {
                /** 循环每一行,p表示行 */
                for (let p = 0; p < rowNumber; p += 1) {
                  let tempStr = '';// 表示每一次截取的字符串
                  const start = p * provideNumber;// 开始截取的位置
                  const end = start + provideNumber;// 结束截取的位置
                  // 此处特殊处理最后一行的索引值
                  if (p === rowNumber - 1) {
                    // 最后一次不换行
                    tempStr = params.substring(start, paramsNameNumber);
                  } else {
                    // 每一次拼接字符串并换行
                    tempStr = `${params.substring(start, end)}\n`;
                  }
                  newParamsName += tempStr;// 最终拼成的字符串
                }
              } else {
                // 将旧标签的值赋给新标签
                newParamsName = params;
              }
              // 将最终的字符串返回
              return newParamsName;
            },

          },
        }],
        yAxis: [{
          type: 'value',
          name: '数量',
        }],
        series: [{
          barWidth: 30, // 柱图宽度
          name: '数量',
          type: this.type,
          data: this.data,
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#8cd5c2', // 改变折线颜色
              },
              // 每根柱子颜色设置
              color(params) {
                const colorList = ['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#ff7c7c', '#9287e7'];
                return colorList[params.dataIndex];
              },
              label: { show: true, color: '#000' },

            },
          },
        }],
      }, true);
    },
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.initChart();
      },
    },
  },
};
</script>
