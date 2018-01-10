<template>
  <div class="app-container" id="users">

    <el-button @click="New()" type="primary" size="small">新增</el-button>
    <br>
    <br>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="昵称">
        <template scope="scope">
          {{scope.row.RealName}}
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template scope="scope">
          <span>{{scope.row.UserName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" align="center">
        <template scope="scope">
          {{scope.row.Password}}
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template scope="scope">
          {{scope.row.RoleName}}
        </template>
      </el-table-column>
      <el-table-column label="部门" align="center">
        <template scope="scope">
          {{scope.row.DeptName}}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button @click="Edit(scope.row.ID)" type="success" size="small">编辑</el-button>

          <el-button @click="Delete(scope.row.ID)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px">


        <el-form-item label="昵称">
          <el-input class="filter-item" v-model="temp.RealName" placeholder="请输入昵称">

          </el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input class="filter-item" v-model="temp.UserName" placeholder="请输入用户名">

          </el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input class="filter-item" type="password" v-model="temp.Password" placeholder="请输入密码">

          </el-input>
        </el-form-item>
        <el-form-item label="排序码">
          <el-input class="filter-item" v-model="temp.Rank" placeholder="请输入排序码">

          </el-input>
        </el-form-item>

        <el-form-item label="部门">
          <el-tree :data="depttree" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
          </el-tree>


        </el-form-item>

        <el-form-item label="角色">
          <el-select v-model="RoleID" placeholder="请选择">
            <el-option v-for="item in options" :key="item.ID" :label="item.RoleName" :value="item.ID">
            </el-option>
          </el-select>
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
    GetUsers,
    DeleteUser,
    GetUsersDetail,
    SaveNewUsers,
    UpdateUsers
  } from "@/api/system/users";
  import {
    GetDeptTree
  } from "@/api/system/dept";
  import {
    GetRoles
  } from "@/api/system/role";

  export default {
    data() {
      return {
        depttree: [],
        textMap: {
          update: "编辑",
          create: "新增"
        },
        dialogFormVisible: false,
        dialogStatus: "",
        list: null,
        listLoading: true,
        RoleID: "",

        temp: {
          ID: "",
          UserName: "",
          Password: "",
          RealName: "",
          DeptID: "",
          RoleID: "",
          IsDeleted: false
        },
        options: [],
        defaultProps: {
          children: "children",
          label: "text"
        }
      };
    },

    created() {
      this.fetchData();
      GetDeptTree().then(response => {
        this.depttree = JSON.parse(response.data);
      });
      GetRoles().then(response => {
        this.options = response.data;
      });



    },
    methods: {

      fetchData() {
        this.listLoading = true;
        GetUsers().then(response => {
          this.list = response.data;
          this.listLoading = false;
        });
      },
      New() {
        this.RoleID = "";
        this.temp = {
          ID: "",
          UserName: "",
          Password: "",
          RealName: "",
          IsDeleted: false
        };
        // console.log(this.$refs.tree)//  this.$refs.tree[0].setCheckedKeys([])
        this.dialogFormVisible = true;

        this.dialogStatus = "create";
      },
      Delete(ID) {
        this.$confirm("确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          DeleteUser(ID).then(response => {
            this.$message({
              type: "success",
              message: "删除成功!"
            })

             this.fetchData();
          });
        });
      },
      Edit(ID) {
        this.dialogStatus = "update";

        GetUsersDetail(ID).then(response => {
          this.dialogStatus = "update";
          this.temp = response.data;
          this.$refs.tree.setCheckedKeys([this.temp.DeptID]);
          this.RoleID = this.temp.RoleID;
          this.dialogFormVisible = true;
           this.fetchData();
        });
      },

      create() {
        this.temp.DeptID = this.$refs.tree.getCheckedKeys().join(',');
        this.temp.RoleID = this.RoleID;
        SaveNewUsers(this.temp).then(response => {
        
          this.dialogFormVisible = false;
            this.$message({
          message: response.data.Message,
            type: "success"
          });
          this.fetchData();
        });
      },
      update() {
        UpdateUsers(this.temp).then(response => {
          this.$message({
          message: response.data.Message,
            type: "success"
          });
          this.dialogFormVisible = false;

          this.fetchData();
        });
      }
    }
  };

</script>
