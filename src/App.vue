<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.app-container{
  height:100%;
}


.el-table{

  height:calc(100% - 130px);
  overflow: auto;
}
</style>
