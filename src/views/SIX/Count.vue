<template>
  <div class="widget-box">

   <div>
      <el-date-picker v-model="time"
                    type="month"
                    value-format="yyyy-MM"
                    placeholder="选择查询日期">
    </el-date-picker>
    <el-button icon="el-icon-search"
               @click="Refresh"></el-button>

      <FilenameOption v-model="filename" />
      <BookTypeOption v-model="bookType" />
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="document" @click="handleDownload">
      导出报表
      </el-button>
    </div>

    <CrudTable ref="countTable"
               :customForFetchData="getCountData"
               :showPagination="false"
               tableDesignerName="count"
               tableName="SIX_Count"
               toolbarButton=""
               :tableList.sync="list"
               handleButton=""></CrudTable>
  </div>
</template>
<script>
import { parseTime } from '@/utils/index'
// options components
import FilenameOption from './components/FilenameOption'
import BookTypeOption from './components/BookTypeOption'


export default {
  name: 'Count',
  components: { FilenameOption, BookTypeOption },

  data() {
    return {
      time: '2019-04',

      list: null,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',

    };
  },
  methods: {
    handleDownload() {
      this.downloadLoading = true
      import('@/utils/Export2Excel').then((excel) => {
        const tHeader = ['姓名', '部门', '月份', '基础工资', '加班工资', '补贴']
        const filterVal = ['name', 'deptname', 'date', 'overtimepay', 'pension']
        const { list } = this
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType,
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map((j) => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        }
        return v[j]
      }))
    },
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
