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
      }"
    >
      <template #columnFormatter="{row,prop}">
        <el-tag v-if="prop === 'jobno'">{{ row.jobno }}</el-tag>
        <span v-if="prop === 'personname'"><i class="el-icon el-icon-user" style="color: red"></i>{{ row.personname }}</span>
        <el-avatar fit="fill" v-if="prop === 'avatar'" shape="square" :src="row.avatar">
          <img src="@/assets/404.png" />
        </el-avatar>
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
