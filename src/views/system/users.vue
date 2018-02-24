<template>
  <div class="app-container" id="users">

    <el-button @click="New()" type="primary" size="small">新增</el-button>
    <br>
    <br>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="昵称">
        <template slot-scope="scope">
          {{scope.row.RealName}}
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.UserName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" align="center">
        <template slot-scope="scope">
          {{scope.row.Password}}
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          {{scope.row.RoleName}}
        </template>
      </el-table-column>
      <el-table-column label="部门" align="center">
        <template slot-scope="scope">
          {{scope.row.DeptName}}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="Edit(scope.row.ID)" type="success" size="small">编辑</el-button>

          <el-button @click="Delete(scope.row.ID)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :currentpage="listQuery.pageNumber"
      :page-sizes="[10, 20, 30]" :pagesize="listQuery.pageSize" 　 layout="total,sizes, prev, pager, next" :total="listQuery.totalCount"
      style="margin-top:5px">
    </el-pagination>

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
          <el-tree :data="depttree" check-strictly auto-expand-parent show-checkbox default-expand-all node-key="id" ref="tree" highlight-current
            :props="defaultProps">
          </el-tree>


        </el-form-item>

        <el-form-item label="角色">
          <!-- <el-select v-model="RoleID" placeholder="请选择">
            <el-option v-for="item in options" :key="item.ID" :label="item.RoleName" :value="item.ID">
            </el-option>
          </el-select> -->
          <multiselect v-model="selected" :value="selected" :options="options" :searchable="false" :close-on-select="true" :allow-empty="false"
            label="RoleName" placeholder="请选择角色" track-by="ID" :showLabels="false">
          </multiselect>
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
import { GetDeptTree } from "@/api/system/dept";
import { GetRolesOptions } from "@/api/system/role";
import Multiselect from "vue-multiselect";

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
      },
      selected: null,
      listQuery: {
        totalCount: "",
        pageSize: "10",
        pageNumber: "1"
      }
    };
  },
  components: {
    Multiselect
  },

  created() {
    this.fetchData(this.listQuery);
    GetDeptTree().then(response => {
      this.depttree = JSON.parse(response.data);
    });
    GetRolesOptions().then(response => {
      this.options = response.data;
    });
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.fetchData(this.listQuery);
    },
    handleCurrentChange(val) {
      this.listQuery.pageNumber = val;
      this.fetchData(this.listQuery);
    },
    fetchData(params) {
      this.listLoading = true;
      GetUsers(params).then(response => {
        this.list = response.data.rows;
        this.listQuery.totalCount = response.data.total;
        this.listLoading = false;
      });
    },
    New() {
      this.selected = null;
      this.temp = {
        ID: "",
        UserName: "",
        Password: "",
        RealName: "",
        IsDeleted: false
      };
      this.dialogFormVisible = true;

      this.dialogStatus = "create";

      this.$refs.tree.setCheckedKeys([]);
    },
    Delete(ID) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        DeleteUser(ID).then(response => {
          this.fetchData(this.listQuery);
        });
      });
    },
    Edit(ID) {
      this.dialogStatus = "update";
      this.dialogFormVisible = true;

      GetUsersDetail(ID).then(response => {
        this.temp = response.data;
        this.$refs.tree.setCheckedKeys([this.temp.DeptID]);
        for (let i = 0; i < this.options.length; i++) {
          let obj = this.options[i];
          if (obj.ID == this.temp.RoleID) {
            this.selected = obj;
          }
        }
      });
    },

    create() {
      this.temp.DeptID = this.$refs.tree.getCheckedKeys().join(",");
      this.temp.RoleID = this.selected.ID;

  
      SaveNewUsers(this.temp).then(response => {
        this.dialogFormVisible = false;

        this.fetchData(this.listQuery);
      });
    },
    update() {
      this.temp.DeptID = this.$refs.tree.getCheckedKeys().join(",");

      this.temp.RoleID = this.selected.ID;

      UpdateUsers(this.temp).then(response => {
        this.dialogFormVisible = false;
              this.fetchData(this.listQuery);

      });
    }
  }
};
</script>
