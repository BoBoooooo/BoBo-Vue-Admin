<template>
  <div class="dashboard-container">
    <!-- <Aplayer></Aplayer> -->
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
import Aplayer from 'vue-aplayer'

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
        music:null

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
    components:{GithubCorner,Aplayer},
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
     
      GetReport() {
        axios.get('/report/hot').then(response => {
          this.report = response.data.recent
     
        })
      },
      GetMusic(){
             axios.get('/music?id=3778678&limit=30').then(response => {
          this.music = response.data
          console.log(this.music)
     
        })
      }
    },
    created() {
      this.GetNowTime()
      this.GetReport()
      // this.GetMusic()

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
