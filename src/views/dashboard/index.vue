<template>
  <div class="dashboard-container">

    <el-card :body-style="{ padding: '0px' }">
      <div style="padding: 14px;">
        <div class="dashboard-title"> Anshare Vue Admin</div>
        <div class="bottom clearfix">
          <div class='dashboard-text'>用户:{{name}}</div>
          <div class='dashboard-text'>角色:
            <span v-for='role in roles' :key='role'>{{role}}</span>
          </div>
          <time class="time">{{ currentDate }}</time>
        </div>
      </div>
            <img src="../../assets/404_images/404.png" class="image">

    </el-card>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {parseTime} from '@/utils/index'
  export default {
    data() {
      return {
        currentDate: parseTime(new Date())
      }
    },
    name: 'dashboard',
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
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
