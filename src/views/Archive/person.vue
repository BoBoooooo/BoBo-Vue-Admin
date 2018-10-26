<template>
  <div class="app-container" id="person">
        <el-button @click="New()" type="primary" size="small">新增</el-button>



   <el-input @keyup.enter.native="Refresh" placeholder="请输入" v-model="listQuery.SearchValue"  class="input-with-select" style="width:90%">
            <el-select v-model="listQuery.SearchKey" slot="prepend" placeholder="请选择">
      <el-option label="姓名" value="name"></el-option>
      <el-option label="工作单位" value="workunit"></el-option>
      <el-option label="职务" value="workduty"></el-option>
            <el-option label="职级" value="worklevel"></el-option>

    </el-select>
        <el-button slot="append" icon="el-icon-search" v-on:click="Refresh"></el-button>
         <el-button slot="append" icon="el-icon-refresh" v-on:click="Clear"></el-button>

          </el-input>   
    <br>
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
      <!-- <el-table-column label="部门" align="center">
        <template slot-scope="scope">
          {{scope.row.DeptName}}
        </template>
      </el-table-column> -->
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
     :currentpage="listQuery.pageNumber" 
     :page-sizes="[10, 20, 30]"
      :pagesize="listQuery.pageSize" 　
      layout="total,sizes, prev, pager, next" 
      :total="listQuery.totalCount" style="margin-top:5px">
      </el-pagination>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="80%">
      <!-- <el-form class="small-space" :model="temp"  label-position="left" label-width="70px">
        <el-col :span="12" v-for="(value,key,index) in temp" :key="index">
        <el-form-item :label="key" >
          <el-input class="filter-item" style="width:80%" v-model="temp[key]" :value="value"  :placeholder="`请输入${key}`"></el-input>
        </el-form-item>
        </el-col>
      </el-form> -->
 <el-form class="small-space" :model="temp_obj"  label-position="right" label-width="110px">
        <el-col :span="12" v-for="(item,index) in temp" :key="index" v-if="item['COLUMN_COMMENT'].indexOf('PK')===-1">
        <el-form-item  v-if="item['COLUMN_COMMENT'].indexOf('时间')===-1"  :label="item.COLUMN_COMMENT" >
          <el-input  class="filter-item" style="width:80%" v-model="temp_obj[item['COLUMN_NAME'].toLowerCase()]"   :placeholder="`请输入${item.COLUMN_COMMENT}`"></el-input>
           
        </el-form-item>

         <el-form-item v-else  :label="item.COLUMN_COMMENT" >
             <el-date-picker     type="date"
 class="filter-item" style="width:80%" v-model="temp_obj[item['COLUMN_NAME'].toLowerCase()]"   :placeholder="`请输入${item.COLUMN_COMMENT}`"></el-date-picker >

        </el-form-item>

        </el-col>
<el-row>
    <el-upload
  class="upload-demo"
  drag
  action="http://localhost:8089/file/Upload"
  :data="formData"
  :headers="token"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
</el-upload>
<el-button @click="exportfile()"></el-button>
</el-row>
<el-row>
   <el-table :default-sort="{prop: 'name', order: 'descending'}" :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
  
      <el-table-column label="文件名" prop="filename" sortable align="center">
        <template slot-scope="scope">
          {{scope.row.filename}}
        </template>
      </el-table-column>
      <el-table-column label="上传时间" prop="timestamp" sortable align="center">
        <template slot-scope="scope">
          <span>{{timestampToTime(scope.row.timestamp)}}</span>
        </template>
      </el-table-column>
   

      <el-table-column label="操作" align="center" min-width="110px">
        <template slot-scope="scope">
          <el-button @click="exportfile(scope.row.id)" type="success" size="small">下载</el-button>

          <el-button @click="delete_file(scope.row.id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</el-row>
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
  UpdateUsers,
  Getobj
} from "@/api/Archive/person";
import { getToken } from "@/utils/auth";
import Multiselect from "vue-multiselect";
import {download,GetFileList} from '@/api/public/file'
import {timestampToTime} from '@/utils/index'
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
      temp_obj: {},
      listQuery: {
        totalCount: null,
        pageSize: "10",
        pageNumber: "1",
        SearchKey: "",
        SearchValue: ""
      },
      formData: {
        MasterID: ""
      },
      token: {
        auth: getToken()
      },
      dialogFormVisible: false,
      dialogStatus: "",
      list: null,
      listLoading: true,
      RoleID: "",
      filelist:null,
      temp: null,
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
    this.getObj();
  },
  methods: {
    getObj() {
      Getobj().then(res => {
        console.log(res);
        this.temp = res.data;

        for (let i in this.temp) {
          this.temp_obj[this.temp[i]["COLUMN_NAME"].toLowerCase()] = "";
        }
        console.log(this.temp_obj);
      });
    },
    exportfile(id){
        download(id)
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
      this.fetchData(this.listQuery);
    },
    Clear() {
      this.listQuery.SearchKey = "";
      this.listQuery.SearchValue = ""; //

      this.fetchData(this.listQuery);
    },
    fetchData(params) {
      this.listLoading = true;

      GetUsers(params).then(response => {
        this.list = response.data.list;
        this.listQuery.totalCount = response.total;
        this.listLoading = false;
      });
    },

      fetchData_File(id) {
      this.listLoading = true;

      GetFileList(id).then(response => {
        this.filelist = response.data.list;
        this.listLoading = false;
      });
    },
    New() {
      for (let i in this.temp_obj) {
        this.temp_obj[i] = "";
      }
      this.selected = null;
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
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
       Delete_File(id) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
       this.fetchData_File(id)
      });
    },
    
    Edit(id) {
      this.dialogStatus = "update";

      GetUsersDetail(id).then(response => {
        this.temp_obj = response.data;
        this.dialogFormVisible = true;
      });
    },

    create() {
      // this.temp.deptid = this.$refs.tree.getCheckedKeys().join(",");
      this.temp.gender = this.selected;
      SaveNewUsers(this.temp_obj).then(response => {
        this.dialogFormVisible = false;

        this.fetchData(this.listQuery);
      });
    },
    update() {
      UpdateUsers(this.temp_obj).then(response => {
        this.dialogFormVisible = false;

        this.fetchData(this.listQuery);
      });
    },
    timestampToTime(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y+M+D+h+m+s;
}
  
  }
};
</script>
