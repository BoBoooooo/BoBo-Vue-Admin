<!--
 * @Author: BoBo
 * @Date: 2019-01-04 17:53:03
 * @Description: 封装的一个基于echarts的地图组件

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
  <div :class="className"
       ref="chart"
       :style="{height:height,width:width}" />
</template>

<script>
import echarts from '@/plugins/echarts';
import { debounce } from '@/utils/util';
import chartData from './data/Charts_Fake';
import mapJson from './data/sichuan.json';

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
      default: () => [],
    },
    title: {
      type: String,
      default: '',
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
    };
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
  mounted() {
    this.initChart();
    this.resizeHanlder = () => {
      if (this.chart) {
        this.chart.resize();
      }
    };
    window.addEventListener('resize', debounce(this.resizeHanlder));
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener('resize', this.resizeHanlder);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      echarts.registerMap('map', this.mapJson);
      this.chart = echarts.init(this.$refs.chart);
      this.chart.setOption(
        {
          series: [
            {
              type: 'map',
              map: 'map',
              data: this.chartData.mapData,
              selectedMode: 'single',
              zoom: 1.2,
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: 'black',
                  },
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
                emphasis: {
                  // 鼠标移入高亮显颜色
                  areaColor: '#f46d43',
                },
              },
            },
          ],

          visualMap: {
            show: false,
            min: 0,
            max: 500,
            realtime: false,
            calculable: true,
            inRange: {
              color: ['lightskyblue', 'yellow', 'orangered'],
            },
            left: 'right',
            top: 'top',
          },
        },
        true,
      );
      // 此处绑定饼图点击事件,把图例内容抛出,用于数据钻取
      this.chart.on('click', (obj) => {
        this.$emit('click', obj);
      });
    },
  },
};
</script>
