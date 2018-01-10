<template>
  <div class="app-container" id="dept">

    <el-button @click="New()" type="primary" size="small">新增</el-button>
    <br>
    <br>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="部门名称">
        <template slot-scope="scope">
          {{scope.row.DeptName}}
        </template>
      </el-table-column>
      <el-table-column label="排序码">
        <template slot-scope="scope">
          {{scope.row.Rank}}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="Edit(scope.row.ID)" type="success" size="small">编辑</el-button>

          <el-button @click="Delete(scope.row.ID)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-tree :data="depttree"  default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
    </el-tree>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px">

        <el-form-item label="部门名称">
          <el-input class="filter-item" v-model="temp.DeptName" placeholder="请输入部门名称">

          </el-input>
        </el-form-item>
        <el-form-item label="排序码">
          <el-input class="filter-item" v-model="temp.Rank" placeholder="请输入排序码">

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
    GetDepts,
    DeleteDept,
    GetDeptDetail,
    SaveNewDept,
    UpdateDept,
    GetDeptTree
  } from "@/api/system/dept";

  export default {
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
          ID: "",
          DeptName: "",
          Rank: "",
          IsDeleted: false,
        },
        depttree: [],
        defaultProps: {
          children: "children",
          label: "text"
        }
      }
    },

    created() {
      GetDeptTree().then(response => {
        this.depttree = JSON.parse(response.data);
      });
      this.fetchData();


    },
    methods: {
      fetchData() {
        this.listLoading = true;
        GetDepts().then(response => {
          this.list = response.data;
          this.listLoading = false;
        });
      },
      New() {
        this.dialogFormVisible = true;
        this.temp.DeptName = "";
        this.temp.Rank = "";
        this.dialogStatus = "create";
      },
      Delete(ID) {
        this.$confirm("确认删除?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            DeleteDept(ID).then(response => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            });
          })

      },
      Edit(ID) {
        this.dialogStatus = "update";

        GetDeptDetail(ID).then(response => {
          this.dialogStatus = "update";
          this.temp = response.data;
          console.log(this.temp)
          this.dialogFormVisible = true;

        });

      },


      create() {
        SaveNewDept(this.temp).then(response => {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.fetchData();

        });

      },
      update() {
        UpdateDept(this.temp).then(response => {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          this.dialogFormVisible = false;

          this.fetchData();

        });

      }
    }
  };

</script>
