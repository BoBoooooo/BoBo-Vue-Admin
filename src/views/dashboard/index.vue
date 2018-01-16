<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="6">
        <el-card :body-style="{ padding: '15px 0px',height:'250px'}">
          <i class="el-icon-edit" style="font-size:30px"></i>

          <div class="dashboard-text">人事考勤管理系统 v1.0</div>
          <div class="bottom clearfix">
            <!-- <div class='dashboard-text'>{{name}} -->
              <!-- <span v-for='role in roles' :key='role'>{{role}}</span> -->
            <!-- </div> -->

            <time class="time dashboard-text">{{ currentDate }}</time>
          </div>

        </el-card>
      </el-col>
      <el-col :span="6" :offset="2">
        <el-card :body-style="{ padding: '15px 0px',height:'250px'}">
          <i class="el-icon-location" style="font-size:30px"></i>

          <div class="dashboard-text" style="padding-top:0px">{{weather.city}}天气</div>
          <div class="dashboard-text">空气质量:{{weather.data.quality}}。</div>
          <div class="dashboard-text">气温:{{weather.data.wendu}}℃，湿度:{{weather.data.shidu}}。</div>

        </el-card>
      </el-col>
    </el-row>
    <img src="../../assets/401.gif" style="position:fixed;bottom:10px;right:10px">

  </div>
</template>

<script>
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
        weather: null
      }
    },
    name: 'dashboard',
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    },
    methods: {
      GetNowTime() {
        setInterval(() => {
          this.currentDate = parseTime(new Date())
        }, 1000)

      },
      GetWeather() {
        axios.get('/weather?city=南京').then(response => {
          this.weather = response.data
        })
      }
    },
    created() {
      this.GetNowTime()
      this.GetWeather()

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
    }
  }

</style>
