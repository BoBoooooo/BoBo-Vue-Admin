<template>
  <div class="app-container" id="person">
<el-row>
  <el-col :span="2">
      <el-button @click="New()" type="primary" size="small">新增</el-button>
  </el-col>
  <el-col :span="22">
 <el-select v-model="listQuery.SearchKey"  placeholder="请选择"  style="float:left;width:20%">
      <el-option label="姓名" value="name"></el-option>
      <el-option label="工作单位" value="workunit"></el-option>
      <el-option label="职务" value="workduty"></el-option>
      <el-option label="职级" value="worklevel"></el-option>
  </el-select>
       <el-input @keyup.enter.native="Refresh" placeholder="请输入" v-model="listQuery.SearchValue"    style="float:left;width:80%">
      
        <el-button slot="append" icon="el-icon-search" v-on:click="Refresh"></el-button>
         <el-button slot="append" icon="el-icon-refresh" v-on:click="Clear"></el-button>

          </el-input>   
  </el-col>
</el-row>
    
    <br>

    <el-table :default-sort="{prop: 'name', order: 'descending'}" :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
  
      <el-table-column label="姓名" prop="name" sortable align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="性别" prop="gender" sortable align="center">
        <template slot-scope="scope">
          <span>{{scope.row.gender}}</span>
        </template>
      </el-table-column>
     <el-table-column label="工作单位" prop="workunit"  sortable align="center">
        <template slot-scope="scope">
          {{scope.row.workunit}}
        </template>
      </el-table-column>
      <el-table-column label="职务"  prop="workduty"  sortable align="center">
        <template slot-scope="scope">
          {{scope.row.workduty}}
        </template>
      </el-table-column>
      <el-table-column label="职级" prop="worklevel"  sortable align="center">
        <template slot-scope="scope">
          {{scope.row.worklevel}}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="110px">
        <template slot-scope="scope">
          <el-button @click="Edit(scope.row.id)" type="success" size="small">编辑</el-button>

          <el-button @click="Delete(scope.row.id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination 
    @size-change="handleSizeChange"
     @current-change="handleCurrentChange" 
     :current-page="listQuery.pageNumber" 
     :page-sizes="[10, 20, 30]"
      :page-size="listQuery.pageSize" 　
      layout="total,sizes, prev, pager, next" 
      :total="listQuery.totalCount" style="margin-top:5px">
      </el-pagination>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="80%">
     
 <el-form class="small-space" :model="temp_obj"  label-position="right" label-width="110px">
   
<generate-form
    :data="jsonData"
    ref="generateForm"
    :value="temp_obj">
</generate-form>

    <upload-affix :Params="uploadParams" ></upload-affix>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">新 增</el-button>
        <el-button v-else type="primary" @click="update">修 改</el-button>
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
  UpdateUsers,
  Getobj
} from "@/api/Archive/person";
import { getToken } from "@/utils/auth";
import UploadAffix from "@/components/UploadAffix";
import { GenerateForm } from "form-making";
import { GetFormDetail } from "@/api/system/form";
import { newGuid } from "@/utils/index";
export default {
  //
  data() {
    return {
      jsonData: null,
      selected: null,
      textMap: {
        update: "编辑",
        create: "新增"
      },
      temp_obj: {},
      listQuery: {
        totalCount: null,
        pageSize: 10,
        pageNumber: 1,
        SearchKey: "",
        SearchValue: ""
      },
      uploadParams: {
        Param: {
          MasterID: ""
        },
        IsDetail: false,
        Url: "http://localhost:8089/file/Upload"
      },

      dialogFormVisible: false,
      dialogStatus: "",
      list: null,
      listLoading: true,
      RoleID: "",
      filelist: null,
      temp: null,
      defaultProps: {
        children: "children",
        label: "text"
      }
    };
  },
  components: {
    UploadAffix,
    GenerateForm
  },

  created() {
    this.fetchData(this.listQuery);
  },

  mounted() {
      GetFormDetail("Person").then(res => {
        this.jsonData = JSON.parse(res.data.formJson);
      })
  },
  methods: {
    newGuid,
    GetFormDetail() {
    
    },

    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.fetchData(this.listQuery);
    },
    handleCurrentChange(val) {
      this.listQuery.pageNumber = val;
      this.fetchData(this.listQuery);
    },

    Refresh() {
      this.fetchData(this.listQuery)
    },
    Clear() {
      this.listQuery.SearchKey = ""
      this.listQuery.SearchValue = ""//

      this.fetchData(this.listQuery);
    },
    fetchData(params) {
      GetUsers(params).then(response => {
        this.list = response.data.list;
        this.listQuery.totalCount = response.total;
        this.listLoading = false;
      });
    },

    New() {   
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
       this.temp_obj = {};    
      this.filelist = null;
    },
    Delete(id) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        DeleteUser(id).then(response => {
          this.fetchData(this.listQuery);
        });
      });
    },

    Edit(id) {
      this.dialogStatus = "update";
      this.temp_obj.id = id;
      GetUsersDetail(id).then(response => {
        this.temp_obj = response.data;
                this.uploadParams.Param.MasterID = id;

        this.dialogFormVisible = true;
      });
    },

    create() {
      this.$refs.generateForm
        .getData()
        .then(data => {
          console.log(data)
          // data 为获取的表单数据

          this.temp_obj.id = newGuid()//赋值主键

          this.temp_obj = data

          SaveNewUsers(this.temp_obj).then(response => {
            this.dialogFormVisible = false
            this.fetchData(this.listQuery)
          })
        })
        .catch(e => {
          // 数据校验失败

          this.$message({
            message: "请检查必填项",
            type: "warning"
          });
        });
    },
    update() {
      this.$refs.generateForm
        .getData()
        .then(data => {
          console.log(data);
          // data 为获取的表单数据

          this.temp_obj.id = newGuid() //赋值主键

          this.temp_obj = data
          UpdateUsers(this.temp_obj).then(response => {
            this.dialogFormVisible = false
            this.fetchData(this.listQuery)
          })
        })
        .catch(e => {
          // 数据校验失败

          this.$message({
            message: "请检查必填项",
            type: "warning"
          })
        })
    }
  }
};
</script>
