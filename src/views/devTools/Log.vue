<!--
 * @file: 系统日志
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019-07-09 14:30:43
 -->
<template>
  <div class="page-container">
    <CrudTable table-name="log"
               tableTitle="系统日志"
               fullHeight
                :visibleList="{
                 tableTitle:false,
               }">
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
export default {
  name: 'Log',
  data() {
    return {
    };
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
