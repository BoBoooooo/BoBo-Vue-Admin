<template>
  <div class="app-container" id="person">

    <div v-show="buttonVisible=='el-icon-arrow-up'" class="searchContainer">
    <el-row v-for="(item,index) in searchArr" :key="index" style="margin-top:2px">
        <el-col :span="6">
              <el-select style="width:100%"  v-model="item.SearchKey"  placeholder="请选择查询项" >
        <el-option v-for="(subitem,index) in filter_search(jsonData.config.columnList)" :label="subitem.label"  :value="subitem.prop" :key="index"></el-option>
      </el-select>
        </el-col>
                <el-col :span="6">

 <el-select   v-model="item.SearchType"  style="width:100%"  placeholder="请选择查询条件" >
        <el-option   v-for="(subitem,index) in SearchType" :label="subitem.label" :value="subitem.key" :key="index"></el-option>
      </el-select>
                </el-col>

        <el-col :span="10">
      <el-input  style="width:100%"    placeholder="请输入查询内容" v-model="item.SearchValue" >

      </el-input>

        </el-col>

  
  <el-col :span="2" style="text-align:center">
            <el-button style="margin:5px 0px 0px 10px;padding:10px" type="danger" size="mini" @click="removeItem" circle  icon="el-icon-minus"></el-button>

        </el-col>



    </el-row>
      <el-button style="margin:0 auto;display:block;margin-top:10px" type="primary" size="mini" @click="addItem" circle  icon="el-icon-plus"></el-button>

         </div>

<el-row style="margin-bottom:10px">
 
  <el-col :span="24">
<el-button-group style="float:right">
      <el-button @click="New()"  icon="el-icon-plus" ></el-button>

        <el-button  icon="el-icon-search" @click="Refresh"></el-button>
         <el-button icon="el-icon-refresh"  v-on:click="ClearOption"></el-button>
          
<el-button  class="buttonVisible" :icon="buttonVisible"  @click="changeVisible" >
  
  </el-button>
</el-button-group>
  </el-col>
</el-row>
    

    <el-table  :default-sort="{prop: 'name', order: 'descending'}" :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column 
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :sortable="item.sortable"
        :width="item.width"
        :min-width="item.min_width"
        :header-align="item.header_align"
        :show-overflow-tooltip="item.show_overflow_tooltip"
         v-for="(item,index) in jsonData.config.columnList" 
         :key="index" >
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
        list: [],
        config: {}
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
SearchType:[
  {
    label:"等于",
    key:"="
  },
  {
    label:"不等于",
    key:"<>"
  },
  {
    label:"大于",
    key:">"
  },
  {
    label:"大于等于",
    key:">="
  },
  {
    label:"小于",
    key:"<"
  },
  {
    label:"小于等于",
    key:"<="
  }
],
      searchArr: [
        {
        SearchKey: "",
        SearchValue: ""
      }
      ],
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
      },
      buttonVisible: "el-icon-arrow-down",
      id:""
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
      console.log(this.jsonData);
    });
  },

  methods: {
    changeVisible() {
      if (this.buttonVisible == "el-icon-arrow-down")
        this.buttonVisible = "el-icon-arrow-up";
      else this.buttonVisible = "el-icon-arrow-down";
    },
    filter_search(item){
      return item.filter(item=>item.searchable)
    },
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
      this.filelist = null;
      this.dialogFormVisible = true;
      for( let key in this.temp_obj){
        this.temp_obj[key]=""
      }
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
      GetUsersDetail(id).then(response => {
        this.temp_obj = response.data;
        this.id = id
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

 
          this.temp_obj = data;
          this.temp_obj.id = newGuid(); //赋值主键
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

          this.temp_obj = data;
                        this.temp_obj.id = this.id;

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
    },
      removeItem(item) {
      var index = this.searchArr.indexOf(item);
      if (index) {
        this.searchArr.splice(index, 1);
      }
    },
    addItem() {
      this.searchArr.push({
        SearchKey: "",
        SearchValue: "",
        SearchType: ""
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.searchContainer {
    position: absolute;
    top: 62px;
    left: 20px;
    padding: 15px;
    min-height: 100px;
    z-index: 10;
    right: 20px;
    background-color: white;
;    box-shadow: 0px 0px 10px gray;

  }
</style>
