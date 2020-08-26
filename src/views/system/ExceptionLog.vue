<!--
 * @file: 异常日志
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019年10月15 09:24:24
 -->

<template>
  <div class="page-container">
    <CrudTable table-name="log"
               tableTitle="异常日志"
                :visibleList="{
                 tableTitle:false,
                 btnAdd:false,
               }"
               fullHeight
               showOperator
               :promiseForSelect="promiseForSelect"
               exportDownloadUrl="/log/exportExceptionLog">
      <template slot="columnFormatter"
                slot-scope="scope">
        <el-alert v-if="scope.row.opttype==='1'"
                  :title="filterTitle(scope)"
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

import { getExceptionLog } from '@/api/system/log';

export default {
  name: 'ExceptionLog',
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
      return getExceptionLog(data);
    },
    filterTitle({ row }) {
      if (row.resultcontent) {
        return row.resultcontent.includes('Error') ? '服务器异常' : row.resultcontent;
      }
      return '服务器异常';
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
