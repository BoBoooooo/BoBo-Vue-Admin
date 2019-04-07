<template>
  <div class="widget-box">
    <el-date-picker v-model="time"
                    type="month"
                    value-format="yyyy-MM"
                    placeholder="选择查询日期">
    </el-date-picker>
    <el-button icon="el-icon-search"
               @click="Refresh"></el-button>
    <el-button icon="el-icon-printer"
               @click="print">打印报表</el-button>
    <CrudTable ref="countTable"
               :customForFetchData="getCountData"
               :showPagination="false"
               tableDesignerName="count"
               tableName="SIX_Count"
               toolbarButton=""
               handleButton=""></CrudTable>
  </div>
</template>
<script>
export default {
  name: 'Count',
  data() {
    return {
      time: '2019-04',
    };
  },
  methods: {
    getCountData() {
      return this.crud('count', 'six_salary', {
        time: this.time,
      });
    },
    print() {},
    Refresh() {
      this.$refs.countTable.Refresh();
    },
  },
};
</script>
<style lang="scss" scoped>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
