<!--
 * @file: 员工管理
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2020年12月18日16:54:49
-->

<template>
  <div class="page-container">
    <CrudTable
      ref="table"
      tableName="person"
      tableTitle="员工管理"
      fullHeight
      orderCondition="timestamp desc"
      :visibleList="{
        btnDel: true,
        tableTitle: true
      }"
    >
      <template #column_jobno="{row}">
        <el-tag>{{ row.jobno }}</el-tag>
      </template>
      <template #column_personname="{row}">
        <span><i class="el-icon el-icon-user" style="color: red"></i>{{ row.personname }}</span>
      </template>
    </CrudTable>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'Person',
})
export default class Person extends Vue {}
</script>
