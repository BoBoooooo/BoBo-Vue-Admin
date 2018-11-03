<template>
  <div class="app-container" id="person">
<el-row>
 
  <el-col :span="24">
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
          <el-button @click="Detail(scope.row.id)" type="primary" size="small">详情</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination 
    @size-change="handleSizeChange"
     @current-change="handleCurrentChange" 
     :currentpage="listQuery.pageNumber" 
     :page-sizes="[10, 20, 30]"
      :page-size="listQuery.pageSize" 　
      layout="total,sizes, prev, pager, next" 
      :total="listQuery.totalCount" style="margin-top:5px">
      </el-pagination>

    <el-dialog title="查看" :visible.sync="dialogFormVisible" width="80%">
     
 <el-form class="small-space" :model="temp_obj"  label-position="right" label-width="110px">
    <el-col :span="12" v-for="(item,index) in temp" :key="index" v-if="item['COLUMN_COMMENT'].indexOf('PK')===-1">
       <el-form-item   :label="item.COLUMN_COMMENT" >
          <el-input  readonly="true" class="filter-item" style="width:80%" v-model="temp_obj[item['COLUMN_NAME'].toLowerCase()]">
           </el-input>  
        </el-form-item>

   </el-col>

    <upload-affix :Params="uploadParams" ></upload-affix>
      </el-form>
   
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
  getKey
} from "@/api/Archive/person"
import { getToken } from "@/utils/auth"
import UploadAffix from "@/components/UploadAffix"
export default {
  //
  data() {
    return {
      selected: null,
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
                IsDetail:true,

        Url: "http://localhost:8089/file/Upload"
      },
      dialogFormVisible: false,
      list: null,
      listLoading: true,
      filelist: null,
      temp: null,
      defaultProps: {
        children: "children",
        label: "text"
      }
    }
  },
  components: {
    UploadAffix
  },

  created() {
    this.fetchData(this.listQuery)
    this.getObj()
  },
  methods: {
    getObj() {
      getObj().then(res => {
        console.log(res)
        this.temp = res.data

        for (let i in this.temp) {
          this.temp_obj[this.temp[i]["COLUMN_NAME"].toLowerCase()] = ""
        }
        console.log(this.temp_obj)
      })
    },

    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.fetchData(this.listQuery)
    },
    handleCurrentChange(val) {
      this.listQuery.pageNumber = val
      this.fetchData(this.listQuery)
    },

    Refresh() {
      this.fetchData(this.listQuery)
    },
    Clear() {
      this.listQuery.SearchKey = ""
      this.listQuery.SearchValue = ""
      this.fetchData(this.listQuery)
    },
    fetchData(params) {
      this.listLoading = true
      GetUsers(params).then(response => {
        this.list = response.data.list
        this.listQuery.totalCount = response.total
        this.listLoading = false
      })
    },
    Detail(id) {
      this.uploadParams.Param.MasterID = id
      GetUsersDetail(id).then(response => {
        this.temp_obj = response.data
        this.dialogFormVisible = true
      })
    } 
  }
}
</script>
