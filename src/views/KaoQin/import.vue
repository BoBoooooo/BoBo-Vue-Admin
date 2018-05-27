<template>
  <div class="app-container" id="import_Atten">

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

      <el-table-column label="部门" align="center">
        <template slot-scope="scope">
          {{scope.row.DeptName}}
        </template>
      </el-table-column>

      <el-table-column label="考勤情况" align="center">
        <template slot-scope="scope">
          {{(scope.row.StartTime==null||scope.row.StartTime=="")?scope.row.Vacation_Reason:scope.row.StartTime+"~"+scope.row.EndTime}}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="Edit(scope.row.ID,scope.row.Name)" type="success" size="small">编辑</el-button>

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

        <el-form-item label="工号">
          <el-input class="filter-item" v-model="temp.No" placeholder="请输入工号">

          </el-input>
        </el-form-item>

        <el-form-item label="考勤时间">
          <el-time-select v-model="temp.StartTime" :picker-options="{
    start: '08:00',
    step: '00:05',
    end: '09:00'
  }" placeholder="上班时间">
          </el-time-select>
          <el-time-select v-model="temp.EndTime" :picker-options="{
    start: '17:00',
    step: '00:05',
    end: '18:00'
  }" placeholder="下班时间">
          </el-time-select>
        </el-form-item>
        <el-form-item label="是否请假">
          <multiselect v-model="selected" :value="selected" track-by="value" label="text" :options="options" :searchable="false" :close-on-select="true"
            :allow-empty="false" placeholder="请选择" :showLabels="false" style="z-index:3;height:20px">
          </multiselect>
        </el-form-item>
        <el-form-item label="请假事由" v-if="this.selected.value===1">
          <el-input class="filter-item" type="textarea" v-model="temp.Vacation_Reason">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="textMap[dialogStatus]=='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  DeleteAtten,
  AttenDetailByPerson,
  GetAttenListToday,
  UpdateAtten
} from "@/api/KaoQin/Attendance";
import { GetUsers } from "@/api/KaoQin/person";
import { GetDeptTree } from "@/api/system/dept";
import { parseTime } from "@/utils/index";
import Multiselect from "vue-multiselect";

export default {
  data() {
    return {
      Title: "",
      selected: {
        text: "否",
        value: 0
      },
        textMap: {
        update: "编辑",
        create: "新增"
      },
      options: [
        {
          text: "是",
          value: 1
        },
        {
          text: "否",
          value: 0
        }
      ],
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
      temp: {
        ID: "",
        No: "",
        Date: "",
        StartTime: "",
        EndTime: "",
        Vacation: "",
        Vacation_Reason: "",
        IsDeleted: false
      }
    };
  },
  components: {
    Multiselect
  },

  created() {
    this.fetchData(this.listQuery);
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
      //
      this.listLoading = true;
      GetAttenListToday(params).then(response => {
        this.list = response.data.rows;
        console.log(this.list);
        this.listQuery.totalCount = response.data.total;
        this.listLoading = false;
      });
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
    Edit(ID, Name) {
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.Title = Name;
      this.temp.Date = parseTime(new Date());
      AttenDetailByPerson(ID).then(response => {
        this.temp = response.data;
        console.log(this.temp);
        if (this.temp.Vacation === 1) {
          this.selected = this.options[0];
        } else {
          this.selected = this.options[1];
        }
        this.temp.PersonId = ID;
      });
    }, //
 create() {
      this.temp.Vacation = this.selected.value;
      this.temp.Date = parseTime(new Date());
          if(this.temp.Vacation==1){
        this.temp.StartTime="";
        this.temp.EndTime="";
      }
        if(this.temp.Vacation==0){
        this.temp.Vacation_Reason="";
      }

      UpdateAtten(this.temp).then(response => {
        this.dialogFormVisible = false;
        this.fetchData(this.listQuery);
      });
    },
    update() {
      this.temp.Vacation = this.selected.value;
      if(this.temp.Vacation==1){
        this.temp.StartTime="";
        this.temp.EndTime="";
      }
        if(this.temp.Vacation==0){
        this.temp.Vacation_Reason="";
      }
      this.temp.Date = parseTime(new Date());
      UpdateAtten(this.temp).then(response => {
        this.dialogFormVisible = false;
        this.fetchData(this.listQuery);
      });
    },
    Refresh() {
      this.fetchData(this.listQuery);
    },
    Clear() {
      this.listQuery.criteria = "";
      this.fetchData(this.listQuery);
    },
    New() {
      this.temp = {
        ID: "",
        PersonId: "",
        Date: "",
        StartTime: "",
        EndTime: "",
        Vacation: "",
        Vacation_Reason: "",
        IsDeleted: false
      };
      this.selected.value = 0;
      this.dialogFormVisible = true;

      this.dialogStatus = "create";
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
