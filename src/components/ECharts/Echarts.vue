<template>
  <div class="native-echarts-wrap"
       @mouseover.stop="clearLoop"
       @mouseout.stop="startLoop"
       ref="native-echarts-wrap">
    <div ref="native-echarts"
         class="native-echarts">

    </div>
    <div class="nodata-view"
         v-if="noData">
      <slot name="no-date-page">
        <div class='no-data'>
          {{noDataText}}
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
// eslint-disable-next-line import/no-extraneous-dependencies
import ResizeObserver from 'resize-observer-polyfill';
// 若需新图表 类型/功能 于该文件中自行添加
export default {
  name: 'native-echarts',
  data() {
    return {
      myChart: null,
      resizeTimer: null,
      loopTimer: [],
      echarts,
      ro: null,
    };
  },
  computed: {
    eDom() {
      return this.$refs['native-echarts'];
    },
    eWrapDom() {
      return this.$refs['native-echarts-wrap'];
    },
  },
  props: {
    // 配置项
    option: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
    noData: {
      type: Boolean,
      default: false,
    },
    noDataText: {
      type: String,
      default: '暂无数据',
    },
    // loading页面
    loading: {
      type: Boolean,
      default: false,
    },
    // 更精确的尺寸
    // firefox中必须开启改选项 否则resize会失效
    // firefox必须给echarts精确宽高
    excuteSize: {
      type: Boolean,
      default: false,
    },
    // 根据容器自适应
    autoResize: {
      type: Boolean,
      default: true,
    },
    // 是否在resize时节流
    throttling: {
      type: [Boolean, Number],
      default: true,
    },
    notMerge: {
      type: Boolean,
      default: false,
    },
    map: {
      type: Object,
      default: null,
    },
    loop: {
      type: Boolean,
      default: false,
    },
    wait: {
      type: Number,
      default: 10000,
    },
  },
  watch: {
    option: {
      // 数据驱动
      handler() {
        this.setOption();
      },
    },
    loading: {
      // 是否显示loading界面
      handler(val) {
        if (!this.myChart) return;
        if (val) {
          this.myChart.showLoading();
        } else {
          this.myChart.hideLoading();
        }
        // val ? this.myChart.showLoading() : this.myChart.hideLoading();
      },
      immediate: true,
    },
  },
  created() {},
  mounted() {
    this.initEcharts();
  },
  beforeDestroy() {
    if (this.autoResize) {
      this.offResize(this.resize());
    }
    if (this.loop) {
      this.clearLoop();
    }
  },
  methods: {
    typeTransform(item) {
      if (item instanceof Array) {
        return item;
      }
      return item
        .split(',')
        .filter(v => v)
        .map(v => v.trim());
    },

    // echarts dom初始化
    initEcharts() {
      if (this.map) {
        this.echarts.registerMap(this.map.type, this.map.json);
      }
      if (this.excuteSize) {
        this.getSize();
      }
      // 获得实例对象
      this.myChart = this.echarts.init(this.eDom);

      // 事件注册
      this.initEvent();

      // 运行配置参数
      this.setOption();
      // 开启loading界面
      if (this.loading) {
        this.myChart.showLoading();
      }
      // 开启resize事件
      if (this.autoResize) {
        this.onResize(this.resize());
        // this.resize();//TODO待定
      }
      if (this.loop) {
        this.initLoopFn();
      }
    },
    initLoopFn() {
      const timer = setInterval(() => {
        this.myChart.clear();
        this.setOption(true);
      }, this.wait);
      this.loopTimer.push(timer);
    },
    clearLoop() {
      this.loopTimer.forEach((timer) => {
        window.clearInterval(timer);
      });
      this.loopTimer = [];
    },
    startLoop() {
      const timer = setTimeout(() => {
        this.initLoopFn();
      });
      this.loopTimer.push(timer);
    },
    initEvent() {
      Object.keys(this.$listeners).forEach((eventName) => {
        this.myChart.on(eventName, this.$listeners[eventName]);
      });
    },
    setOption(notMerge = this.notMerge) {
      if (this.myChart) {
        this.myChart.setOption(this.option, notMerge);
        // 此处绑定饼图点击事件,把图例内容抛出,用于数据钻取
        this.myChart.on('click', (obj) => {
          this.$emit('click', obj);
        });
      }
    },
    getSize() {
      const { width, height } = window.getComputedStyle(this.eWrapDom);

      this.eDom.style.width = `${parseFloat(width, 10)}px`;
      this.eDom.style.height = `${parseFloat(height, 10)}px`;
    },
    resize() {
      return this.throttling === false ? this.nativeResize : this.throttlingResize;
    },
    throttlingResize() {
      // 节流

      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(
        () => {
          this.nativeResize();
        },
        this.throttling === true ? 100 : this.throttling,
      );
    },
    nativeResize() {
      // 不节流
      if (this.excuteSize) {
        this.getSize();
      }
      this.myChart.resize();
      this.$emit('resized');
    },
    onResize(handler) {
      this.ro = new ResizeObserver(handler);
      this.ro.observe(this.$refs['native-echarts-wrap']);
      // EleResize.on(this.eWrapDom, handler, context);
    },
    offResize() {
      this.ro.disconnect();
    },
  },
};
</script>

<style lang="scss" scoped>
.native-echarts-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  .native-echarts {
    width: 100%;
    height: 100%;
  }
  .nodata-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
