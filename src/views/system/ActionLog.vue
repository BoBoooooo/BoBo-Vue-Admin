<!--
 * @file: 操作日志
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019年10月15 09:24:24
 -->

<template>
  <div class="page-container">
    <CrudTable table-name="log"
               tableTitle="运行日志"
                :visibleList="{
                 tableTitle:false,
                 btnAdd:false,
               }"
               fullHeight
               showOperator
               :promiseForSelect="promiseForSelect"
                exportDownloadUrl="/log/exportNotLoginLog">
      <template slot="columnFormatter"
                slot-scope="scope">
        <el-alert v-if="scope.row.opttype==='1'"
                  title="错误"
                  type="error"
                  :closable="false"
                  show-icon />
        <el-alert v-else
                  title="成功"
                  type="success"
                  :closable="false"
                  show-icon />
      </template>
    </CrudTable>
  </div>
</template>
<script>

import { getActionLog } from '@/api/system/log';

export default {
  name: 'ActionLog',
  methods: {
    promiseForSelect(data) {
      const searchCondition = [];
      if (!this.$store.getters.isAdmin) {
        searchCondition.push({
          field: 'companyid',
          operator: 'eq',
          value: this.$store.getters.companyid,
        });
      }
      data.searchCondition = searchCondition;
      return getActionLog(data);
    },
  },
};
</script>
<style scoped>
.page-container >>> .green {
  color: #67c23a;
}

.page-container >>> .red {
  color: #f56c6c;
}

.page-container >>> .blue {
  color: #409eff;
}
</style>
