<!--
@file 角色权限管理
@author BoBo
@copyright NanJing Anshare Tech .Com
@createDate 2018年12月1日22:07:03
-->
<template>
  <div class="page-container">
    <CrudTable ref="table"
               tableName="role"
               tableTitle="角色列表"
               fullHeight
               :visibleList="{
                 tableTitle:false,
                 btnDel:true,
               }" />
  </div>
</template>

<script>
export default {
  name: 'Role',
};
</script>
