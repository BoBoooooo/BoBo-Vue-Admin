<template>
  <div class="app-container" id="person">
<el-row style="margin-bottom:10px">
  <el-col :span="2">

      <el-button type="success" @click="New()"  icon="el-icon-plus" ></el-button>

  </el-col>
  <el-col :span="22">
 <el-select v-model="listQuery.SearchKey"  placeholder="请选择"  style="float:left;width:20%">
      <el-option v-for="(item,index) in jsonData.config.columnList" :label="item.label" :value="item.value" :key="index"></el-option>
    
  </el-select>
       <el-input ref="test_input" @keyup.enter.native="Refresh" placeholder="请输入" v-model="listQuery.SearchValue"    style="float:left;width:80%">
      
        <el-button slot="append" icon="el-icon-search" v-on:click="Refresh"></el-button>
         <el-button slot="append" icon="el-icon-refresh" v-on:click="ClearOption"></el-button>

          </el-input>   
  </el-col>
</el-row>
    

    <el-table :default-sort="{prop: 'name', order: 'descending'}" :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column  v-for="(item,index) in jsonData.config.columnList"  :key="index" :label="item.label" :prop="item.value" sortable align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="110px">
        <template slot-scope="scope">
           <el-button type="primary" icon="el-icon-edit" circle @click="Edit(scope.row.id)"></el-button>

            <el-button type="danger" icon="el-icon-delete" circle  @click="Delete(scope.row.id)" ></el-button>

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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="80%" >
     
    <generate-form
        :data="jsonData"
        ref="generateForm"
        :value="temp_obj"
        :clear="Clear"
        :upload_params="uploadParams">
    </generate-form>

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
  getObj
} from "@/api/Archive/person";
import { getToken } from "@/utils/auth";
import UploadAffix from "@/components/UploadAffix";
import GenerateForm from "@/components/FormDesigner/GenerateForm";
import { GetFormDetail } from "@/api/system/form";
import { newGuid } from "@/utils/index";
export default {
  name: "person_edit",
  data() {
    return {
      jsonData: {
        list:[],
        config:{}
      },
      selected: null,
      Clear: true,
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
        IsDetail: false
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
    this.getObj();
    GetFormDetail("Person").then(res => {
      this.jsonData = JSON.parse(res.data.formJson);
    });
  },

  mounted() {
    document.addEventListener("click", e => {
      // console.log(e.target);
      // console.log(this.$refs.test_input.$el);
      if (!this.$refs.test_input.$el.contains(e.target)) {
        //
      }
    });
  },
  methods: {
    newGuid,
    getObj() {
      getObj().then(res => {
        this.temp_obj = res.data;
      });
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
    ClearOption() {
      this.listQuery.SearchKey = "";
      this.listQuery.SearchValue = ""; //

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
      this.uploadParams.Param.MasterID = "";
      this.Clear = true //表单重新初始化
      this.filelist = null
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

    Edit(id) {
      (this.Clear = false), (this.dialogStatus = "update");
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
          console.log(data);
          // data 为获取的表单数据

          this.temp_obj.id = newGuid(); //赋值主键

          this.temp_obj = data;

          SaveNewUsers(this.temp_obj).then(response => {
            this.dialogFormVisible = false;
            this.fetchData(this.listQuery);
          });
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

          this.temp_obj.id = newGuid(); //赋值主键

          this.temp_obj = data;
          UpdateUsers(this.temp_obj).then(response => {
            this.dialogFormVisible = false;
            this.fetchData(this.listQuery);
          });
        })
        .catch(e => {
          // 数据校验失败

          this.$message({
            message: "请检查必填项",
            type: "warning"
          });
        });
    }
  }
};
</script>
