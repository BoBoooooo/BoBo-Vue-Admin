<template>
<div class="container">
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="Session"
      label="巡视届次"
     >
    </el-table-column>
    <el-table-column
      prop="Turn"
      label="巡视轮次"
     >
    </el-table-column>
    <el-table-column
      prop="Year"
      label="巡视年度">
    </el-table-column>
     <el-table-column
      prop="IsCurrent"
      label="是否本轮">
    </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <el-button size="small" type="success" @click="Edit(scope.row)">编辑
          </el-button>
          <el-button size="small" type="danger" @click="Delete(scope.row)">删除
          </el-button>
    
        </template>
      </el-table-column>
  </el-table>


  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="巡视届次">
          <el-select class="filter-item" v-model="temp.Session" placeholder="请选择">
            <el-option v-for="item in  session" :key="item.$index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="巡视轮次">
          <el-select class="filter-item" v-model="temp.Turn" placeholder="请选择">
            <el-option v-for="item in  turn" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="巡视年度">

              <el-date-picker v-model="temp.Year" type="year" placeholder="选择日期" format="yyyy" value-format="yyyy" @change="dateformatter">
    </el-date-picker>
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
import axios from "axios";
export default {
  data() {
    return {
      ID: "",
      tableData: [],
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "创建"
      },
      temp: {
        Session: "",
        Turn: "",
        Year: ""
      },
      turn: ["第一轮", "第二轮", "第三轮", "第四轮"],
      session: ["十三届省委巡视", "十四届省委巡视", "十五届省委巡视"]
    };
  },
  methods: {
    test(){
      axios.get('/api/data').then(response=>{
          console.log(response.data);
          this.tableData = response.data;
      })
    },
    getList() {
      this.listLoading = true;
      let vm = this;
      axios.get("http://localhost:8888/GetList").then(response => {
        let a = [];
        a = response.data;
        vm.tableData = a;
        this.listLoading = false;
      });
    },

    Edit(obj) {
      console.log(obj);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.ID = obj.ID;
      this.temp = obj;
    },
    Delete(obj) {
      this.listLoading = true;
      let vm = this;
      axios
        .get("http://localhost:8888/DeleteList?ID=" + obj.ID)
        .then(response => {
          vm.getList();
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
        });
    },
    update() {
      let vm = this;
      axios({
        method: "post",
        url: "http://localhost:8888/UpdateList",
        data: {
          a: "1"
        },
        headers:{
          "Content-type":"application/json"
        }
      }).then(function(response) {
        vm.getList();
        this.$notify({
          title: "成功",
          message: "保存成功",
          type: "success",
          duration: 2000
        });
        this.dialogFormVisible = false;
        this.getList();
      });
    },
    create() {},
    dateformatter(val) {
      this.temp.Year = val;
    }
  },
  mounted() {
    this.test();
  },
  created() {
    this.dialogFormVisible = false;
  }
};
</script>

<style scoped>
.container {
  padding: 15px;
}
</style>
