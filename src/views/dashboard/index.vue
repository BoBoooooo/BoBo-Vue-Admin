<template>
  <div class="dashboard-container">
      <github-corner></github-corner>
    <el-row>
      <el-col :span="6">
        <el-card :body-style="{ padding: '15px 0px',height:'300px'}">
                <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/100/h/100" style="border-radius:80px" >

          <div class="dashboard-text">人事考勤管理系统 v1.0</div>
          <div class="bottom clearfix">
            <!-- <div class='dashboard-text'>{{name}} -->
            <!-- <span v-for='role in roles' :key='role'>{{role}}</span> -->
            <!-- </div> -->

            <time class="time dashboard-text">{{ currentDate }}</time>
          </div>

        </el-card>
      </el-col>
      <el-col v-if="!loading" :span="6" :offset="2">
        <el-card :body-style="{ padding: '30px 0px',height:'300px',position:'relative'}">
                      <h5 style="font-size:20px">{{weather.city}}天气</h5>

          <icon-svg icon-class="sunny" style="font-size:180px;border-radius:180px;position:absolute;top:0px;left:0px"></icon-svg>
            <br>
            <h5 style="font-size:18px">空气质量:{{weather.data.quality}}.</h5>

            <h5 style="font-size:18px">气温:{{weather.data.wendu}}℃，湿度:{{weather.data.shidu}}.</h5>

         


        </el-card>
      </el-col>

   <el-col  :span="6" :offset="2">
        <el-card :body-style="{ padding: '15px 0px',height:'300px'}">
                <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/100/h/100" style="border-radius:80px" >

          <div class="dashboard-text" style="padding-top:0px">
            <span style="display:block;">Anshare Vue Admin</span>
                      <span style="display:block;">Author:BoBo</span>
                      <span style="display:block;">Follow me on GitHub</span>

          </div>


        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <h3>知乎日报</h3>
      <el-col :span="8" v-for="(item,index) in report" :key="index">
        <el-card :body-style="{ padding: '15px 0px',height:'250px'}">

          <div class="dashboard-text" style="padding-top:0px">

            <img :src="getImage(item.thumbnail)">
            <a :href="'http:\/\/daily.zhihu.com\/story\/'+item.news_id" target="_blank"><span style="display:block;font-size:14px">{{item.title}}</span></a>
          </div>


        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'

  import {
    mapGetters
  } from 'vuex'
  import {
    parseTime
  } from '@/utils/index'
  import axios from 'axios'
  export default {
    data() {
      return {
        currentDate: parseTime(new Date()),
        weather: null,
        loading: false,
        report: null,

      }
    },
    name: 'dashboard',
    computed: {
      ...mapGetters([
        'name',
        'roles',
        'AllRouters'
      ])
    },
    components:{GithubCorner},
    methods: {
      getImage(url) {
        if (url !== undefined) {
          return url.replace('https:\/\/', 'https://images.weserv.nl/?url=');
        }
      },
      GetNowTime() {
        setInterval(() => {
          this.currentDate = parseTime(new Date())
        }, 1000)
      },
      GetWeather() {
        this.loading = true
        axios.get('/weather?city=南京').then(response => {
          this.weather = response.data
          this.loading = false
        })
      },
      GetReport() {
        axios.get('/report/hot').then(response => {
          this.report = response.data.recent
     
        })
      }
    },
    created() {
      this.GetNowTime()
      this.GetWeather()
      this.GetReport()

    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
    &-title {
      text-align: center;
      font-family: inherit;
      font-size: 50px;
    }
    &-container {
      text-align: center;

      margin: 30px;
    }
    &-text {
      text-align: center;
      margin: 30px;

      font-size: 30px;
      line-height: 30px;
      span {
        display: block;
        padding-top: 10px;
      }
    }
  }

</style>
