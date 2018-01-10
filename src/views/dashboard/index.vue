<template>
  <div class="dashboard-container">
    <img style="width:15%" src='../../assets/anshare.png'>
    <div class="dashboard-title">    Anshare Vue Admin</div>
    <div class='dashboard-text'>用户:{{name}}</div>
    <div class='dashboard-text'>角色:<span v-for='role in roles' :key='role'>{{role}}</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
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
  &-title{
    text-align: center;
    font-family: inherit;
    font-size:50px;
  }
  &-container {
        text-align: center;

    margin: 30px;
  }
  &-text {
        text-align: center;
    margin: 30px;

    font-size: 30px;
    line-height: 46px;
  }
}
</style>
