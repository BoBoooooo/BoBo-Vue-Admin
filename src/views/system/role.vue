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
               :btnAddOnClick="btnAddOnClick"
               :btnEditOnClick="btnEditOnClick"
               fullHeight
                :visibleList="{
                 tableTitle:false,
                 btnDel:true,
               }"/>
    <!-- 角色编辑对话框 -->
    <RoleDialog ref="dialog"
                tableName="role"
                @afterSave="roleDialogOnClose" />
  </div>
</template>

<script>
import RoleDialog from './components/RoleDialog.vue';

export default {
  name: 'Role',
  components: {
    RoleDialog,
  },
  methods: {
    btnAddOnClick() {
      this.$refs.dialog.showDialog();
    },
    btnEditOnClick(row) {
      this.$refs.dialog.showDialog({ id: row.id }, 1, row);
    },
    roleDialogOnClose() {
      this.$refs.table.tableReload();
    },
  },
};
</script>
