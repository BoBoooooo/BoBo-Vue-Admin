<template>
  <div class="app-container" id="users">

     <el-button @click="New()" type="primary" size="small" style="margin:10px 0px">新增</el-button>


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

      <el-table-column label="操作" align="center" min-width="110px">
        <template slot-scope="scope">
          <el-button @click="Edit(scope.row.ID)" type="success" size="small">编辑</el-button>

          <el-button @click="Delete(scope.row.ID)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNumber"
      :page-sizes="[10, 20, 30]" :page-size="listQuery.pageSize" 　 layout="total,sizes, prev, pager, next" :total="listQuery.totalCount"
      style="margin-top:5px">
    </el-pagination>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%" :modal-append-to-body='false'>
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px">


        <el-form-item label="昵称">
          <el-input class="filter-item" v-model="temp.realname" placeholder="请输入昵称">

          </el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input class="filter-item" v-model="temp.username" placeholder="请输入用户名">

          </el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input class="filter-item" type="password" v-model="temp.password" placeholder="请输入密码">

          </el-input>
        </el-form-item>
        <el-form-item label="排序码">
          <el-input class="filter-item" v-model="temp.rank" placeholder="请输入排序码">

          </el-input>
        </el-form-item>

        <el-form-item label="部门">
        <el-select v-model="temp.deptid" placeholder="请选择">
            <el-option v-for="item in deptoptions" :key="item.id" :label="item.deptname" :value="item.id">
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="角色">
          <el-select v-model="temp.roleid" placeholder="请选择">
            <el-option v-for="item in roleoptions" :key="item.id" :label="item.rolename" :value="item.id">
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
  UsersList,
  DeleteUsers,
  GetUsersDetail,
  AddUsers,
  UpdateUsers
} from "@/api/system/users";
import { List } from "@/api/system/dept";
import { RoleList } from "@/api/system/role";
import { DeptList } from "@/api/system/dept";


export default {
      name:"users",

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
        id: "",
        username: "",
        password: "",
        realname: "",
        roleid: "",
        deptid: "",
        isdeleted: false
      },
      roleoptions: [],
      deptoptions: [],
      defaultProps: {
        children: "children",
        label: "text"
      },
      selected: null,
      listQuery: {
        totalCount: 0,
        pageSize: 10,
        pageNumber: 1
      }
    };
  },
 

  created() {
    this.fetchData(this.listQuery);
  
    RoleList().then(response => {
      this.roleoptions = response.data.list;
    });

     DeptList().then(response => {
      this.deptoptions = response.data.list;
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
      UsersList(params).then(response => {
        this.list = response.data.list;
        this.listQuery.totalCount = response.data.total;
        this.listLoading = false;
      });
    },
    New() {
      this.temp = {
        ID: "",
        username: "",
        password: "",
        realname: "",
        roleid:"",
        deptid:"",
      }
      this.dialogFormVisible = true

      this.dialogStatus = "create"

    },
    Delete(ID) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        DeleteUsers(ID).then(response => {
          this.fetchData(this.listQuery);
        });
      });
    },
    Edit(ID) {
      this.dialogStatus = "update";

      GetUsersDetail(ID).then(response => {
        this.temp = response.data;

              this.dialogFormVisible = true;

      });
    },

    create() {

  
      AddUsers(this.temp).then(response => {
        this.dialogFormVisible = false;

        this.fetchData(this.listQuery);
      });
    },
    update() {

      UpdateUsers(this.temp).then(response => {
        this.dialogFormVisible = false;
              this.fetchData(this.listQuery);

      });
    }
  }
};
</script>
