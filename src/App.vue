<!--
@file 最顶层主组件，所有子组件都在本容器内渲染
      main.js中new Vue时将本文件渲染到public/index.html模板中
      注意使用vue-cli3安装插件时备份本文件，官方提示其可能会被覆盖
@author BoBo
@copyright BoBo
@createDate 2018年11月13日11:17:17
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component({
  name: 'App',
})
export default class App extends Vue {
  @Getter config!: SystemConfig;

  x = 0;

  y = 0;

  count = 0;

  $store:any;

  async created() {
    await this.$store.dispatch('initSystemConfig');
    if (this.config.clientTimeOut && +this.config.clientTimeOut !== 0) {
      // 全局计时器判断客户端是否长时间未操作,需要可以开启
      this.initTimeOutWatcher();
    }
  }


  debounce(event, callback) {
    let timer:any = null;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback(event);
    }, 1000);
  }

  mouseEvent(event) {
    const x1 = event.clientX;
    const y1 = event.clientY;
    if (this.x !== x1 || this.y !== y1) {
      this.count = 0;
    }
    this.x = x1;
    this.y = y1;
  }

  keyDownEvent() {
    this.count = 0;
  }

  initTimeOutWatcher() {
    // 监听鼠标
    document.onmousemove = event => this.debounce(event, this.mouseEvent);
    // 监听键盘
    document.onkeydown = event => this.debounce(event, this.keyDownEvent);
    const loop = window.setInterval(() => {
      const token = sessionStorage.getItem('token');
      if (token != null && token !== 'null') {
        this.count += 1;
        if (Math.floor(this.count / 60) === +this.config.clientTimeOut) {
          this.$store.dispatch('clientTimeOut');
          window.clearInterval(loop);
        }
      }
    }, 1000);
  }


  @Watch('config', {
    deep: true,
  })
  configOnChange(val) {
    document.title = val && val.systemName;
  }
}
</script>
