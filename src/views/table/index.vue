<template>
  <div class="app-container">
       <el-input placeholder="请输入内容" v-model="criteria" style="padding-bottom:10px;">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                 <el-option label="id" value="1"></el-option>
                 <el-option label="name" value="2"></el-option>
              </el-select>
              <el-button slot="append" icon="search" v-on:click="search"></el-button>
          </el-input>       
    <el-table :data="tableData" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="Title" align="center">
        <template slot-scope="scope">
          {{scope.row.Title}}
        </template>
      </el-table-column>
      <el-table-column label="Author"  align="center">
        <template slot-scope="scope">
          <span>{{scope.row.Author}}</span>
        </template>
      </el-table-column>
       <el-table-column label="email"  align="center">
        <template slot-scope="scope">
          <span>{{scope.row.email}}</span>
        </template>
      </el-table-column>
     
    </el-table>

    <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="pagesize"
                  layout="total, sizes, prev, pager, next"
                  :total="totalCount">
    </el-pagination>
  </div>
</template>

  <script>
import axios from "axios";
export default {
  data() {
    return {
      //表格当前页数据
      tableData: [],
      //多选数组
      multipleSelection: [],
      //请求的URL
      url: "https://easy-mock.com/mock/5a2f7f536ce8af6869ec6966/bobo/getlist",
      //搜索条件
      criteria: "",
      //下拉菜单选项
      select: "",
      //默认每页数据量
      pagesize: 10,
      //默认高亮行数据id
      highlightId: -1,
      //当前页码
      currentPage: 1,
      //查询的页码
      start: 1,
      //默认数据总数
      totalCount: 1000,
      listLoading: true
    };
  },
  created() {
    this.loadData(this.criteria, this.currentPage, this.pagesize);
  },
  methods: {
    //从服务器读取数据
    loadData: function(criteria, pageNum, pageSize) {
      axios
        .post(this.url, {
          search: criteria,
          pageNum: pageNum,
          pageSize: pageSize
        })
        .then(
          response => {
            this.tableData = response.data.data.projects;
            this.listLoading = false;
            this.totalCount =response.data.number;
          },
          function() {
            console.log("failed");
          }
        );
    },

   

    //点击行响应
    handleclick: function(row, event, column) {
      this.highlightId = row.id;
    },

    //编辑
    handleEdit: function(index, row) {
      this.$prompt("请输入新名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (value == "" || value == null) return;
          axios
            .post(
              "newstu/update",
              { id: row.id, name: value },
              { emulateJSON: true }
            )
            .then(
              response => {
                this.loadData(this.criteria, this.currentPage, this.pagesize);
              },
              function() {
                console.log("failed");
              }
            );
        })
        .catch(() => {});
    },

    //单行删除
    handleDelete: function(index, row) {
      var array = [];
      array.push(row.id);
      axios
        .post("newstu/delete", { array: array }, { emulateJSON: true })
        .then(
          response => {
            this.loadData(this.criteria, this.currentPage, this.pagesize);
          },
          function() {
            console.log("failed");
          }
        );
    },

    //搜索
    search: function() {
      this.loadData(this.criteria, this.currentPage, this.pagesize);
    }




 
  }
};
</script>  
