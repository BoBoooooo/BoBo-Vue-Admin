<template>
  <div class="app-container" id="dept">

     <el-button @click="New()" type="primary" size="small" style="margin:10px 0px">新增</el-button>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="部门名称">
        <template slot-scope="scope">
          {{scope.row.deptname}}
        </template>
      </el-table-column>
      <el-table-column label="排序码">
        <template slot-scope="scope">
          {{scope.row.rank}}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="110px">
        <template slot-scope="scope">
          <el-button @click="Edit(scope.row.id)" type="success" size="small">编辑</el-button>

          <el-button @click="Delete(scope.row.id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
 <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNumber"
      :page-sizes="[10, 20, 30]" :page-size="listQuery.pageSize" 　 layout="total,sizes, prev, pager, next" :total="listQuery.totalCount"
      style="margin-top:5px">
    </el-pagination>
    <!-- <el-tree :data="depttree"  default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
    </el-tree> -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%" :modal-append-to-body='false'>
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px">

        <el-form-item label="部门名称">
          <el-input class="filter-item" v-model="temp.deptname" placeholder="请输入部门名称">

          </el-input>
        </el-form-item>
        <el-form-item label="排序码">
          <el-input class="filter-item" v-model="temp.rank" placeholder="请输入排序码">

          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    DeptList,
    DeleteDept,
    GetDeptDetail,
    AddDept,
    UpdateDept,
    getdeptree
  } from "@/api/system/dept";

  export default {
    name:"dept",
    data() {
      return {
        textMap: {
          update: "编辑",
          create: "新增"
        },
        dialogFormVisible: false,
        dialogStatus: "",
        list: null,
        listLoading: true,
        temp: {
          id: "",
          deptname: "",
          rank: "",
          isdeleted: false,
        },
          listQuery: {
        totalCount: 0,
        pageSize: 10,
        pageNumber: 1
      },
        depttree: [],
        defaultProps: {
          children: "children",
          label: "text"
        }
      }
    },

    created() {
      // GetDeptTree().then(response => {
      //   this.depttree = JSON.parse(response.data);
      // });
    this.fetchData(this.listQuery)


    },
    methods: {

          handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.fetchData(this.listQuery)
    },
    handleCurrentChange(val) {
      this.listQuery.pageNumber = val
      this.fetchData(this.listQuery)
    },

      fetchData(params) {
        this.listLoading = true;
        DeptList(params).then(response => {
          this.list = response.data.list
          this.listQuery.totalCount = parseInt(response.data.total)
          this.listLoading = false
        });
      },
      New() {
        this.dialogFormVisible = true;
        this.temp.deptname = "";
        this.temp.rank = "";
        this.dialogStatus = "create";
      },
      Delete(id) {
        this.$confirm("确认删除?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            DeleteDept(id).then(()=>{    
                      this.fetchData()
})
          })

      },
      Edit(id) {
        this.dialogStatus = "update";

        GetDeptDetail(id).then(response => {
          this.dialogStatus = "update";
          this.temp = response.data;
          console.log(this.temp)
          this.dialogFormVisible = true;

        });

      },


      create() {
        AddDept(this.temp).then(response => {
         
          this.dialogFormVisible = false;
          this.fetchData();

        });

      },
      update() {
        UpdateDept(this.temp).then(response => {
          
          this.dialogFormVisible = false;

          this.fetchData();

        });

      }
    }
  };

</script>
