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
      <template #columnFormatter="{ row, prop }">
        <el-tag v-if="prop === 'jobno'">{{ row.jobno }}</el-tag>
        <span v-if="prop === 'personname'"><i class="el-icon el-icon-user" style="color: red"></i>{{ row.personname }}</span>
        <el-image style="width: 50px; height: 50px" fit="fill" v-if="prop === 'avatar'" :src="getAvatarUrl(row)" :preview-src-list="[getAvatarUrl(row)]">
          <div slot="error" style="height: 100%">
            <div class="error"><i class="el-icon-picture-outline"></i></div>
          </div>
        </el-image>
      </template>
    </CrudTable>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'Person',
})
export default class Person extends Vue {
  getAvatarUrl(row) {
    return this.API_URL + row.avatar;
  }
}
</script>
<style lang="scss" scoped>
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 30px;
}
</style>
