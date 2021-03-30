<!--
@file 角色权限管理
@author BoBo
@copyright BoBo
@createDate 2018年12月1日22:07:03
-->
<template>
  <div class="page-container">
    <CrudTable
      ref="table"
      tableName="role"
      tableTitle="角色列表"
      fullHeight
      :btnAddOnClick="btnAddOnClick"
      :btnEditOnClick="btnEditOnClick"
      orderCondition="timestamp desc"
      :visibleList="{
        btnDel: true,
      }"
    />
    <!-- 角色编辑对话框 -->
    <RoleDialog ref="dialog" tableName="role" @afterSave="roleDialogOnClose" />
  </div>
</template>

<script>
import { Component, Vue, Watch } from 'vue-property-decorator';
import RoleDialog from './components/RoleDialog.vue';

@Component({
  name: 'Role',
  components: {
    RoleDialog,
  },
})
export default class Role extends Vue {
  btnAddOnClick() {
    this.$refs.dialog.showDialog();
  }

  btnEditOnClick(row) {
    this.$refs.dialog.showDialog({ id: row.id }, 1, row);
  }

  roleDialogOnClose() {
    this.$refs.table.tableReload();
  }
}
</script>
