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
  padding:15px;
}


.el-table{
  height:calc(100% - 100px)!important;
  overflow: auto;
}

</style>


