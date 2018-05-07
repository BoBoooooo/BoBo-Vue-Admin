<template>
  <div class="app-container" id="role">

    <el-button @click="New()" type="primary" size="small">新增</el-button>
    <br>
    <br>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="角色名">
        <template slot-scope="scope">
          {{scope.row.RoleName}}
        </template>
      </el-table-column>
      <el-table-column label="排序码">
        <template slot-scope="scope">
          {{scope.row.Rank}}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="110px">
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

        <el-form-item label="角色名">
          <el-input class="filter-item" v-model="temp.RoleName" placeholder="请输入角色名">

          </el-input>
        </el-form-item>
        <el-form-item label="排序码">
          <el-input class="filter-item" v-model="temp.Rank" placeholder="请输入排序码">

          </el-input>
        </el-form-item>
        <el-form-item label="菜单">
             <el-tree :data="menu" auto-expand-parent show-checkbox default-expand-all node-key="name" ref="tree" highlight-current
            :props="defaultProps" check-strictly>
          </el-tree>
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
  GetRoles,
  DeleteRole,
  GetRoleDetail,
  SaveNewRole,
  UpdateRole
} from "@/api/system/role";
import { mapGetters } from "vuex";
import { asyncRouterMap } from "@/router/index";

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
        RoleName: "",
        Rank: "",
        IsDeleted: false,
        RoleAuthName: null
      },
      menu: null,
      listQuery: {
        totalCount: "",
        pageSize: "10",
        pageNumber: "1"
      },
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },

  created() {
    this.fetchData(this.listQuery);

    let arr = asyncRouterMap;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].hidden) {
        arr.splice(i--, 1);
      }
    }
    this.menu = arr;
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
      GetRoles(params).then(response => {
        this.list = response.data.rows;
        this.listQuery.totalCount = response.data.total;
        this.listLoading = false;
      });
    },
    New() {
      this.dialogFormVisible = true;
      this.temp.RoleName = "";
      this.temp.Rank = "";
      this.temp.RoleAuthName = "";

      this.dialogStatus = "create";
    },
    Delete(ID) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        DeleteRole(ID).then(response => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetchData(this.listQuery);
        });
      });
    },
    Edit(ID) {
      this.dialogStatus = "update";

      GetRoleDetail(ID).then(response => {
        this.dialogStatus = "update";
        this.temp = response.data;
        this.dialogFormVisible = true;
      });
    },

    create() {
      this.temp.RoleAuthName = this.$refs.tree.getCheckedKeys().join(",");

      SaveNewRole(this.temp).then(response => {
        this.$message({
          message: response.data.Message,
          type: "success"
        });
        this.dialogFormVisible = false;
        this.fetchData(this.listQuery);
      });
    },
    update() {
      this.temp.RoleAuthName = this.$refs.tree.getCheckedKeys().join(",");
      console.log(this.temp.RoleAuthName);
      UpdateRole(this.temp).then(response => {
        this.$message({
          message: response.data.Message,
          type: "success"
        });
        this.dialogFormVisible = false;

        this.fetchData(this.listQuery);
      });
    }
  }
};
</script>
