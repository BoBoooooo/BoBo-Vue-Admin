<template>
  <div class="app-container" id="person">
        <el-button @click="New()" type="primary" size="small">新增</el-button>

   <el-input @keyup.enter.native="Refresh" placeholder="请输入姓名/工号" v-model="listQuery.criteria" style="padding-bottom:10px;width:90%">
            
              <el-button slot="append" icon="el-icon-search" v-on:click="Refresh"></el-button>
                            <el-button slot="append" icon="el-icon-refresh" v-on:click="Clear"></el-button>

          </el-input>   
    <br>
    <br>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='工号' width="95">
        <template slot-scope="scope">
          {{scope.row.No}}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          {{scope.row.Name}}
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.Gender}}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门" align="center">
        <template slot-scope="scope">
          {{scope.row.DeptName}}
        </template>
      </el-table-column>
     <el-table-column label="手机号码" align="center">
        <template slot-scope="scope">
          {{scope.row.Phone}}
        </template>
      </el-table-column>
      <!-- <el-table-column label="入职时间" align="center">
        <template slot-scope="scope">
          {{scope.row.Workduty}}
        </template>
      </el-table-column>
      <el-table-column label="联系电话" align="center">
        <template slot-scope="scope">
          {{scope.row.Phone}}
        </template>
      </el-table-column> -->

      <el-table-column label="操作" align="center" min-width="110px">
        <template slot-scope="scope">
          <el-button @click="Edit(scope.row.ID)" type="success" size="small">编辑</el-button>

          <el-button @click="Delete(scope.row.ID)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination 
    @size-change="handleSizeChange"
     @current-change="handleCurrentChange" 
     :currentpage="listQuery.pageNumber" 
     :page-sizes="[10, 20, 30]"
      :pagesize="listQuery.pageSize" 　
      layout="total,sizes, prev, pager, next" 
      :total="listQuery.totalCount" style="margin-top:5px">
      </el-pagination>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px">

        <el-form-item label="工号">
          <el-input class="filter-item" v-model="temp.No" placeholder="请输入工号">

          </el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input class="filter-item" v-model="temp.Name" placeholder="请输入姓名">

          </el-input>
        </el-form-item>
        <el-form-item label="性别">
          <multiselect v-model="selected" :value="temp.Gender" :options="options" :searchable="false" :close-on-select="true" :allow-empty="false"
            placeholder="请选择性别" :showLabels="false" style="z-index:3;height:30px">
          </multiselect>
        </el-form-item>



        <el-form-item label="部门">
          <el-tree :data="depttree" auto-expand-parent show-checkbox default-expand-all node-key="id" ref="tree" highlight-current
            :props="defaultProps">
          </el-tree>


        </el-form-item>

        <el-form-item label="联系方式">

          <el-input class="filter-item" v-model="temp.Phone" placeholder="请输入手机号码">

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
  GetUsers,
  DeleteUser,
  GetUsersDetail,
  SaveNewUsers,
  UpdateUsers
} from "@/api/KaoQin/person";
import { GetDeptTree } from "@/api/system/dept";

import Multiselect from "vue-multiselect";

export default {
  //
  data() {
    return {
      selected: null,
      options: ["男", "女"],
      depttree: [],
      textMap: {
        update: "编辑",
        create: "新增"
      },
      listQuery: {
        totalCount: null,
        pageSize: "10",
        pageNumber: "1",
        criteria: ""
      },

      dialogFormVisible: false,
      dialogStatus: "",
      list: null,
      listLoading: true,
      RoleID: "",

      temp: {
        ID: "",
        No: "",
        Name: "",
        Gender: "",
        Workduty: "",
        DeptName: "",
        DeptID: "",
        Phone: "",
        IsDeleted: false
      },
      defaultProps: {
        children: "children",
        label: "text"
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

    Refresh(){
      this.fetchData(this.listQuery);
    },
    Clear(){
      this.listQuery.criteria="";
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
      this.temp = {
        No: "",
        DeptID: "",
        Workduty: "",
        Gender: "",
        Name: "",
        Phone: "",
        IsDeleted: false
      };
      this.selected = null;
      this.dialogFormVisible = true;

      this.$refs.tree.setCheckedKeys([]);

      this.dialogStatus = "create";
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
        this.selected = this.temp.Gender;
      });
    },

    create() {
      this.temp.DeptID = this.$refs.tree.getCheckedKeys().join(",");
      this.temp.Gender = this.selected;
      SaveNewUsers(this.temp).then(response => {
        this.dialogFormVisible = false;

        this.fetchData(this.listQuery);
      });
    },
    update() {
      this.temp.Gender = this.selected;
      this.temp.DeptID = this.$refs.tree.getCheckedKeys().join(",");

      UpdateUsers(this.temp).then(response => {
        this.dialogFormVisible = false;

        this.fetchData(this.listQuery);
      });
    }
  }
};
</script>
